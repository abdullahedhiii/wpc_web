const {User,Module,SubModule,Feature,Dashboard} = require('../config/sequelize');
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

    const token = jwt.sign(
      { id: userDetails.id, email: userDetails.email },
      process.env.JWT_SECRET, 
      { expiresIn: '1h' } 
    );

    res.cookie('token', token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      maxAge: 3600000,
    });

    return res.status(200).json({
      user: userDetails, 
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
    // Fetch modules with related data
    const modules = await Module.findAll({
      order: [['id', 'ASC']],
      include: [
        {
          model: Dashboard,
          as: 'dashboard',
          attributes: ['name', 'completed', 'color', 'icon', 'count', 'percentage','view_route'],
        },
        {
          model: SubModule,
          as: 'subModules',
          include: [
            {
              model: Feature,
              as: 'features',
              attributes: ['name', 'next_route','plus_icon_route','action_route', 'icon'], // Fetch necessary fields for features
            },
          ],
          attributes: ['name', 'main_route','icon'], 
        },
      ],
    });

    const formattedModules = modules.map((module) => ({
      id: module.id,
      name: module.name,
      icon_image: module.icon_image,
      next_route: module.next_route,
      dashboard: module.dashboard
        .sort((a, b) => a.id - b.id)
        .map((d) => ({
          name: d.name,
          completed: d.completed,
          color: d.color,
          icon: d.icon || '',
          count: d.count || -1, 
          percentage: d.percentage || -1,
          view_route:d.view_route
        })),
      subModules: module.subModules
        .sort((a, b) => a.id - b.id) 
        .map((subModule) => ({
          name: subModule.name,
          main_route: subModule.main_route,
          icon : subModule.icon,
          features: subModule.features
            .sort((a, b) => a.id - b.id) 
            .map((feature) => ({
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
