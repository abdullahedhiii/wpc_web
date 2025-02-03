const {User,Module,SubModule,Feature,Dashboard, Organisation} = require('../config/sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config(); 

module.exports.Register = async (req, res) => {
  try {
    console.log('Register endpoint hit');
    console.log(req.body);

    const { companyName,firstName, lastName, email, contactNumber,password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const newUser = await User.create({
        company_name: companyName,
        first_name: firstName,
        last_name: lastName,
        email,
        phone_number: contactNumber,
        password,
      });

    const token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.cookie('sessionToken', token, {
      httpOnly: true,  
      secure: false,  
      maxAge: 24 * 60 * 60 * 1000,  
    });
    return res.status(201).json({
      message: 'User registered successfully.',
      token,
      user: {
        id: newUser.id,
      },
    });
  } catch (error) {
    console.error('Error in Register:', error);
    return res.status(500).json({ error: 'An error occurred. Please try again later.' });
  }
};

module.exports.Login = async (req, res) => {
  console.log('Login endpoint hit', req.body);
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ where: { email }, raw: true });
    if (!existingUser) {
      console.log('Error: email not found');
      return res.status(400).json({ error: 'No user with this email found' });
    }

    const isPasswordValid = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordValid) {
      console.log('Error: incorrect password');
      return res.status(400).json({ error: 'Incorrect password, try again' });
    }

    const { password: _, ...userDetails } = existingUser;
    
    const org = await Organisation.findOne({where : {admin_id : userDetails.id}})
    console.log(org, '??',org.Company_Logo);
    const token = jwt.sign(
      { id: userDetails.id, email: userDetails.email },
      process.env.JWT_SECRET, 
      { expiresIn: '1h' } 
    );
    
    res.cookie('access_token', token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      maxAge: 3600000,
    });

    return res.status(200).json({
      user: {...userDetails, profile_image : org?.Company_Logo || null,}, 
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports.getModules = async (req, res) => {
  console.log('modules endpoint hittt');
  try {
    const modules = await Module.findAll({
      order: [['id', 'ASC']], 
      include: [
        {
          model: Dashboard,
          as: 'dashboard',
          attributes: ['id','name', 'completed', 'color', 'icon', 'count', 'percentage','view_route'],
          separate:true,
          order: [['id', 'ASC']], 
        },
        {
          model: SubModule,
          as: 'subModules',
          include: [
            {
              model: Feature,
              as: 'features',
              attributes: ['id','name', 'next_route','plus_icon_route','action_route', 'icon'], 
              separate:true,
              order: [['id', 'ASC']], 
            },
          ],
          attributes: ['id','name', 'main_route','icon'], 
          separate:true,
          order: [['id', 'ASC']], 
        },
      ],
    });

    const formattedModules = modules.map((module) => ({
      id: module.id,
      name: module.name,
      icon_image: module.icon_image,
      next_route: module.next_route,
      button_title : module.button_title,
      dashboard: module.dashboard.map((d) => ({
        name: d.name,
        completed: d.completed,
        color: d.color,
        icon: d.icon || '',
        count: d.count || -1,
        percentage: d.percentage || -1,
        view_route: d.view_route,
      })),
      subModules: module.subModules.map((subModule) => ({
        name: subModule.name,
        main_route: subModule.main_route,
        icon: subModule.icon,
        features: subModule.features.map((feature) => ({
          name: feature.name,
          next_route: feature.next_route,
          icon: feature.icon || '',
          plus_icon_route: feature.plus_icon_route,
          action_route: feature.action_route,
        })),
      })),
    }));
    

    res.status(200).json(formattedModules);
  } catch (error) {
    console.error('Error fetching modules:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.retrieveCookie = async (req, res) => {
  const token = req.cookies.access_token; 
  try {
    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err || !decoded.id) {
        return res.status(403).json({ message: 'Token expired or invalid' }); 
      }

      try {
        const user = await User.findOne({
          where: { id: decoded.id, email: decoded.email },raw: true 
        });
        
        if (!user) {
          return res.status(404).json({ message: 'User not found' }); 
        }
        const { password: _, ...userDetails } = user;
        console.log('responsing with user ',userDetails);
        return res.status(200).json(userDetails);
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
