import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { validatePhoneNumber } from "../utils/phoneValidator.js";

export const signup = async (req, res, next) => {
  const {
    username,
    email,
    password,
    phone,
    address,
    country,
    language,
  } = req.body;

  try {
    // Input Validation
    if (!username || !email || !password || !phone || !country) {
      return next(errorHandler(400, "All required fields must be filled"));
    }

    // Validate phone number format
    if (!validatePhoneNumber(phone,country)) {
      return next(errorHandler(400, "Invalid phone number format"));
    }

    // Hash Password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phoneNumber: phone,
      address,
      country,
      preferredLanguage: language,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully!",
    });
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate fields
      return res.status(400).json({
        success: false,
        message: `Duplicate field: ${Object.keys(error.keyValue).join(", ")}`,
      });
    }
    next(error);
  }
};




export const signin = async(req,res,next)=>{
    const {email,password} = req.body;
    if(!email || !password || email==="" || password===""){
      next(errorHandler(400,"All fields are required"));
    }
    try{
      const validUser = await User.findOne({email});
      if(!validUser) return next(errorHandler(404,'User not found!'));
      const validPassword = bcryptjs.compareSync(password,validUser.password);
      if(!validPassword) return next(errorHandler(400,'Invalid Credentials!'));
      const token = jwt.sign({id:validUser._id , isAdmin:validUser.isAdmin},process.env.JWT_SECRET);
      const{password:hashedPassword, ...rest} = validUser._doc;
      const expiryDate = new Date(Date.now()+3600000);
      res.cookie('acess_token',token,{httpOnly:true,expires:expiryDate}).status(200).json(rest);
    }catch(error){
      next(error);
    }
  }

  export const google = async (req,res,next) => {
    try{
      const user = await User.findOne({email:req.body.email});
      if (user){
        const token = jwt.sign({id:user._id , isAdmin:user.isAdmin},process.env.JWT_SECRET);
        const{password:hashedPassword, ...rest} = user._doc;
        
        res.cookie('acess_token',token,{httpOnly:true}).status(200).json(rest);
      }else{
          const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
          const hashedPassword = bcryptjs.hashSync(generatedPassword,10);
          const newUser = new User({username:req.body.name.split("").join("").toLowerCase()+Math.random().toString(36).slice(-8), 
          email:req.body.email, password: hashedPassword, profilePicture:req.body.photo });
  
          await newUser.save();
           const token = jwt.sign({id:newUser._id , isAdmin:newUser.isAdmin},process.env.JWT_SECRET);
           const{password:hashedPassword2, ...rest} = newUser._doc;
           const expiryDate = new Date(Date.now()+3600000);
           res.cookie('acess_token',token,{httpOnly:true,expires:expiryDate}).status(200).json(rest);
      }
    }catch(error){
      next(error);
    }
  } 
  
