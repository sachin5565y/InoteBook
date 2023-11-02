const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs');
var jwt=require('jsonwebtoken');
var fetchuser=require('../middleware/fetchuser');
const JWT_SECRET='sachinisgoodboys@2314'
//Route1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  let success=false;
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success,errors: errors.array() });
  }
  // Check whether the user with this email exists already
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({success,error: "Sorry a user with this email already exists" })
    }

    const salt=await bcrypt.genSalt(10);
    secPass= await bcrypt.hash(req.body.password,salt);
    // Create a new user
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    })
    const data={
      user:{
        id:user.id
      }
    }
    const authtoken=jwt.sign(data,JWT_SECRET);
    success=true;
    res.json({success,authtoken})
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server Error occured");
  }
})

// Route2: Create a usiing using :POST "/api/auth/login". No login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password can not be blanked').exists(),

], async (req, res) => {
  let success=false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {email,password}=req.body;
  try{
    let user= await User.findOne({email});
    success=false;
    if(!user){
      return res.status(400).json({error:"Plasese try to login correct credential"})
    }
    const passwordCompare=await bcrypt.compare(password,user.password);
    if(!passwordCompare){
      success=false;
      return res.status(400).json({success,error:"Plasese try to login correct credential"})
    }
    const data={
      user:{
        id:user.id
      }
    }
    const authtoken=jwt.sign(data,JWT_SECRET);
    success=true;
    res.json({success,authtoken})
  }catch(error){
    console.error(error.message);
    res.status(500).send("Internal server Error occured");
  }
});

// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser',fetchuser, async (req, res) => { 

try {
  userId="todo";
  const user=await User.findById(userId).select("-password");
  res.send(user)
} catch (error) {
  console.error(error.message);
    res.status(500).send("Internal server Error occured");
}
})


// ROUTE 4: Admin Route to Get All Users (Requires admin privileges)
router.get('/admin/users', fetchuser, async (req, res) => {
  try {
    // Check if the user making the request has admin privileges
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Permission denied' });
    }

    // Query the database to retrieve all users (excluding password field)
    const users = await User.find().select('-password');
    
    // Send the list of users as a response
    res.json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error occurred');
  }
});


module.exports = router