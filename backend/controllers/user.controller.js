const {User} = require('../config/sequelize');
const jwt = require('jsonwebtoken');
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

module.exports.Login = (req,res) => {

};
