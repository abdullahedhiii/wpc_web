const {User,Admin,Module,SubModule,Feature,Dashboard, Organisation, Employee, PersonalDetail, ServiceDetail, ContactInfo, UserRole, Sponsor} = require('../config/sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config(); 

module.exports.Register = async (req, res) => {
  try {


    const { companyName,firstName, lastName, email, contactNumber,password } = req.body;

    const existingUser = await Admin.findOne({ where: { email,phone_number : contactNumber } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const newUser = await Admin.create({
        company_name: companyName,
        first_name: firstName,
        last_name: lastName,
        email,
        phone_number: contactNumber,
        password,
      });

    return res.status(201).json({
      message: 'User registered successfully.',
    });
  } catch (error) {
     if (err instanceof Sequelize.UniqueConstraintError) {
      return res.status(400).json({ 
        message: "The entered email or phone number has been registered already" 
      });
    }
    return res.status(500).json({ error: 'An error occurred. Please try again later.' });
  }
};

module.exports.Login = async (req, res) => {
  console.log('Login endpoint hit', req.body);
  try {
    const { email, password } = req.body;
    let existingUser ,isAdmin;
    existingUser = await Admin.findOne({ where: { email }, raw: true });
    if (existingUser) isAdmin = true;
    else{
      existingUser = await User.findOne({ where: { email }, raw: true });
      if(existingUser) isAdmin = false;
    }
    
    if(!existingUser){
      console.log('Error: email error');
      return res.status(400).json({ error: 'Email not found, try again' });
    }

    const isPasswordValid = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordValid) {
      console.log('Error: incorrect password');
      return res.status(400).json({ error: 'Incorrect password, try again' });
    }

    const { password: _, ...userDetails } = existingUser;
    let org,employee;
    if(isAdmin) org = await Organisation.findOne({where : {admin_id : userDetails.id}})
    else{
       employee = await Employee.findOne({where : {employee_code : existingUser.employee_code},
            include : [
              {
                 model : Organisation,
                 as : 'organisation',
                 attributes : ['Company_name',"id"]
              },
              {
                model : PersonalDetail,
                as : 'personaldetail',
                attributes : ['fname','mname','lname','contact_1']
              },
              {
                model : ServiceDetail,
                as : 'servicedetail',
                attributes : ['profile_pic','type']
              },

            ]
      })
    }
    const token = jwt.sign(
      { id: userDetails.id, email: userDetails.email },
      process.env.JWT_SECRET, 
      { expiresIn: '1h' } 
    );
    
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });
    
    
    const response  = isAdmin ? {...userDetails, profile_image : org?.Company_Logo || null,isAdmin} :
    {
           company_name : employee.organisation.Company_name,
           company_id : employee.organisation.id,
           email : userDetails.email,
           phone_number : employee.personaldetail.contact_1,
           first_name : [employee.personaldetail.fname,employee.personaldetail.mname].filter(Boolean).join(' '),
           id : userDetails.id,
           last_name : employee.personaldetail.lname || '',
           profile_image : employee.servicedetail.profile_pic || null,
           isAdmin,
           employee_code : employee.employee_code,
           type : employee.servicedetail.type,
    };
    return res.status(200).json({
      user: response, 
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports.logout = async (req, res) => {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: true,  
      sameSite: "None",  
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ error: "An error occurred while logging out" });
  }
};

module.exports.getSponsors = async (req, res) => {
  console.log('get sponsors hit');
  try {
    const sponsors = await Sponsor.findAll();

    let newCount = 0;
    let updatedCount = 0;

    const formattedData = sponsors.map((sponsor) => {
      if (sponsor.newSponsor) newCount++; // Count new sponsors
      if (sponsor.status === 'updated') updatedCount++; // Count updated sponsors

      return {
        id: sponsor.id,
        company: sponsor.organisationName,
        location: [sponsor.townCity, sponsor.country].filter(Boolean).join(' '),
        licenseTier: sponsor.licenseTier,
        status: sponsor.status,
      };
    });

    return res.status(200).json({
      sponsors: formattedData,
      newCount,
      updatedCount
    });
  } catch (err) {
    return res.status(500).json({ error: "An error occurred while fetching sponsors", err });
  }
};


module.exports.getModules = async (req, res) => {
  console.log("Modules endpoint hit");
  const { isAdmin } = req.query;
  const userId = req.params.id;

  try {
    const modules = await Module.findAll({
      order: [["id", "ASC"]],
      include: [
        {
          model: Dashboard,
          as: "dashboard",
          attributes: [
            "id",
            "name",
            "completed",
            "color",
            "icon",
            "count",
            "percentage",
            "view_route",
          ],
          separate: true,
          order: [["id", "ASC"]],
        },
        {
          model: SubModule,
          as: "subModules",
          include: [
            {
              model: Feature,
              as: "features",
              attributes: [
                "id",
                "name",
                "next_route",
                "plus_icon_route",
                "action_route",
                "download_api_route",
                "icon",
              ],
              separate: true,
              order: [["id", "ASC"]],
            },
          ],
          attributes: ["id", "name", "main_route", "icon","download_api_route"],
          separate: true,
          order: [["id", "ASC"]],
        },
      ],
    });

    if (isAdmin === 'true') {
      console.log('returningg ', isAdmin);
      
      return res.status(200).json(
        modules.filter((m) => ![16].includes(m.id)).map((module) => ({
          id: module.id,
          name: module.name,
          icon_image: module.icon_image,
          next_route: module.next_route,
          button_title: module.button_title,
          dashboard: module.dashboard.map((d) => ({
            name: d.name,
            completed: d.completed,
            color: d.color,
            icon: d.icon || "",
            count: d.count || -1,
            percentage: d.percentage || -1,
            view_route: d.view_route,
            id: d.id,
          })),
          subModules: module.subModules.map((subModule) => ({
            id: subModule.id,
            name: subModule.name,
            main_route: subModule.main_route,
            icon: subModule.icon,
            download_api_route: subModule.download_api_route,
            features: subModule.features
              .filter((feature) => ![56, 58, 59, 60,55].includes(feature.id)) 
              .map((feature) => ({
                name: feature.name,
                next_route: feature.next_route,
                icon: feature.icon || "",
                plus_icon_route: feature.plus_icon_route,
                action_route: feature.action_route,
                id: feature.id,
                download_api_route: feature.download_api_route,
              })),
          })),
        }))
      );
    }
    
    const userRoles = await UserRole.findAll({
      where: { user_id: userId },
      attributes: ["sub_module_id", "feature_id", "right"],
    });
    
    const userFeatureAccess = new Map();
    const userSubModuleAccess = new Set();
    
    userRoles.forEach(({ sub_module_id, feature_id, right }) => {
      const featureId = String(feature_id); 
    
      if (!userFeatureAccess.has(featureId)) {
        userFeatureAccess.set(featureId, { can_add: false, can_edit: false });
      }
    
      if (right === "add") userFeatureAccess.get(featureId).can_add = true;
      if (right === "edit") userFeatureAccess.get(featureId).can_edit = true;
    
      userSubModuleAccess.add(sub_module_id);
    });
    
    const formattedModules = modules.map((module) => {
      let moduleHasAccess = false;
    
      const subModules = module.subModules.map((subModule) => {
        let subModuleHasAccess = false;
    
        const features = subModule.features.map((feature) => {
          const featureId = String(feature.id); 
          let featureAccess = userFeatureAccess.get(featureId) || { can_add: false, can_edit: false };
          let can_access = !!userFeatureAccess.has(featureId);
    
          if (module.name === "Employee Corner") {
            moduleHasAccess = true;
            subModuleHasAccess = true;
            can_access = true;
            featureAccess = { ...featureAccess, can_add: true }; 
          }
    
          return { ...feature.get(), ...featureAccess, can_access };
        });
    
        if (module.name === "Employee Corner") {
          subModuleHasAccess = true;
        } else if (!subModuleHasAccess) {
          subModuleHasAccess = userSubModuleAccess.has(subModule.id);
        }
    
        if (subModuleHasAccess) moduleHasAccess = true;
    
        return { ...subModule.get(), features, can_access: subModuleHasAccess };
      });
    
      return { ...module.get(), subModules, can_access: moduleHasAccess };
    });
    
    
    res.status(200).json(formattedModules);
    
  } catch (error) {
    console.error("Error fetching modules:", error);
    res.status(500).json({ error: "Internal Server Error", err: error });
  }
};

module.exports.retrieveCookie = async (req, res) => {
  const token = req.cookies.access_token; 
  try {
    if (!token) {
      return res.status(200).json({ found:false,message: 'No cookie found to retrieve -new session' });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err || !decoded.id) {
        return res.status(200).json({found:false, message: 'Token expired or invalid - new session' }); 
      }

      try {
        let existingUser ,isAdmin;
        existingUser = await Admin.findOne({ where: { email : decoded.email }, raw: true });
        if (existingUser) isAdmin = true;
        else{
          existingUser = await User.findOne({ where: {email: decoded.email }, raw: true });
          if(existingUser) isAdmin = false;
        }
        const { password: _, ...userDetails } = existingUser;

        let org,employee;
        if(isAdmin) org = await Organisation.findOne({where : {admin_id : userDetails.id}})
        else{
           employee = await Employee.findOne({where : {employee_code : existingUser.employee_code},
                include : [
                  {
                     model : Organisation,
                     as : 'organisation',
                     attributes : ['Company_name',"id"]
                  },
                  {
                    model : PersonalDetail,
                    as : 'personaldetail',
                    attributes : ['fname','mname','lname','contact_1']
                  },
                  {
                    model : ServiceDetail,
                    as : 'servicedetail',
                    attributes : ['profile_pic','type']
                  },
    
                ]
          })
        }
        const response  = isAdmin ? {...userDetails, profile_image : org?.Company_Logo || null,isAdmin} :
        {
               company_name : employee.organisation.Company_name,
               company_id : employee.organisation.id,
               email : userDetails.email,
               phone_number : employee.personaldetail.contact_1,
               first_name : [employee.personaldetail.fname,employee.personaldetail.mname].filter(Boolean).join(' '),
               id : userDetails.id,
               last_name : employee.personaldetail.lname || '',
               profile_image : employee.servicedetail.profile_pic || null,
               isAdmin,
               employee_code : employee.employee_code,
               type : employee.servicedetail.type,
        };
        return res.status(200).json({found:true,user : response});
      } catch (err) {
        console.error('Database error:', err);
        return res.status(500).json({ message: 'Internal server error' }); 
      }
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ message: 'Internal server error' }); 
  }
};

module.exports.getUserOrganisation = async(req,res) => {
    try{
        const user = await User.findOne({where : {id : req.params.id}});
        const org_id = user.organisation_id;
        const organisation = await Organisation.findOne(
          {
            where : {id : org_id},
          });
      
    const responseData = {
      id: organisation.id,
      "Sl. No.": 1,
      "Organisation Name": organisation.Company_name,
      "Organisation Address":
        organisation.Address_Line1 +
        "," +
        organisation.Address_Line2 +
        "," +
        organisation.Address_Line3 +
        "," +
        organisation.Address_City_County +
        "," +
        organisation.Address_Postcode +
        "," +
        organisation.Address_Country,
      Website: organisation.Company_Website,
      "Email ID": organisation.Company_OrganisationEmail,
      "Phone No.": organisation.Company_Contact,
      Action: "Edit",
      year_created: new Date(organisation.createdAt).getFullYear()

    };
    return res.status(200).json(responseData);
    }
    catch(err){
      console.error('Unexpected error:', err);
      return res.status(500).json({ message: 'Internal server error' }); 
    }
}
