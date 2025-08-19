import bcrypt from 'bcrypt'
import User from '../models/user.model.js';
import {errorHandler} from '../utils/error.js'
import jwt from 'jsonwebtoken'
import Employee from '../models/employee.model.js';


const signUp = async (req,res,next) =>{
    try {
        const {username, email, phonenumber, address, password} = req.body;
        const exist = await User.findOne({email})
        if (exist) {
            return next(errorHandler(404, 'Email already exist first login'));
        }
        if (!username || !email || !password) {
            return next(errorHandler(404, 'All field are required'));
        }
        const hashedPassword = await bcrypt.hash(password , 10)

        const newUser = new User({
            username,
            email,
            phonenumber,
            address,
            password:hashedPassword,
            address
        })
        await newUser.save()
        res.status(201).json({message:'User created successfully!',newUser , success:true});

    } catch (error) {
        next(error)
    }
}

const signIn = async (req,res,next) => {
    try {
        const {email , password} = req.body;

        if (!email || !password) {
            return next(errorHandler(404, 'Password and Email required'));
        }

        const exist = await User.findOne({email})

        if (!exist) {
            return next(errorHandler(404, 'User not found!'));
        }

        const validatePassword = await bcrypt.compareSync(password , exist.password)

        if (!validatePassword) {
            return next(errorHandler(401,'Invalid credentials'))
        }

        const token = await jwt.sign({id:exist._id},process.env.JWT_SECRET)

        const userData = await User.findOne(exist._id).select('-password')

        res.cookie('access_token',token,{httpOnly:true}).status(200).json({success:true,userData})
    } catch (error) {
        next(error)
    }
}

const signinEmp = async (req,res,next) =>{
    try {
        const {email , NIC} = req.body;
        const exist = await Employee.findOne({email})
        if (!exist) {
            return next(errorHandler(404,'User not found'))
        }

        // Check if the NIC matches
        if (NIC !== exist.NIC.toString()) {
            return next(errorHandler(401,'Invalid Credentials'))
        }

        const token = jwt.sign({id:exist._id},process.env.JWT_SECRET)

        const userData = await Employee.findOne(exist._id).select('-password')

        res.cookie('access_token',token,{httpOnly:true}).status(200).json({success:true,userData})
    } catch (error) {
        next(error)
    }
}

const signOutEmp = async (req,res,next) =>{
    try {
        res.clearCookie('access_token');
        res.status(200).json({success:true,message:'Employee has been logged out'})
    } catch (error) {
       next(error) 
    }
}

const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json({success:true,rest});
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
        const generatedphonenumber = Math.floor(1000000000 + Math.random() * 
        9000000000).toString().substring(0, 10);

      const generatedaddress =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        phonenumber: generatedphonenumber,
        address: generatedaddress,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

const signOut = async (req,res,next) =>{
    try {
        res.clearCookie('access_token')
        res.status(200).json({success:true,message:'User has been logged Out'})
    } catch (error) {
        next(error)
    }
}

export {signUp,signIn,signinEmp,signOutEmp ,google , signOut}