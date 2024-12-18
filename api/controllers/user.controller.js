import  jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import { validatePhoneNumber } from "../utils/phoneValidator.js";
import { countryCodeMapping } from "../utils/countryCodes.js";


export const test = (req, res) => {
  res.json({
    message: 'API is working'
  });
};

const transporter = nodemailer.createTransport({
  service:"gmail",
  auth:{
      user:"projecttest088@gmail.com",
      pass:"vyzl bowj hshd apbo"
  }
}) 

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, 'You can update only your account'));
    }
  
    try {
      const { mobile, country, username, password, email, profilePicture, address, interests, language,university } = req.body;
      console.log(country)
      console.log(mobile)

  
      if (password) {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{5,}$/;
        if (!passwordRegex.test(password)) {
          return next(
            errorHandler(
              400,
              'Password should be at least 5 characters long and contain at least one uppercase letter, one digit, and one symbol (!@#$%^&*()_+).'
            )
          );
        }
        req.body.password = bcryptjs.hashSync(password, 10);
      }
      if (mobile && country) {
        const countryCode = countryCodeMapping[country];
        if (!countryCode) {
            console.error(`Country "${country}" not found in mapping.`);
            return next(errorHandler(400, 'Invalid country provided'));
        }
    
        const isValidMobile = validatePhoneNumber(mobile, country);
        if (!isValidMobile) {
            return next(errorHandler(400, 'Invalid mobile number format for the given country'));
        }
    } else {
        return next(errorHandler(400, 'Both mobile and country are required for validation'));
    }
    
  
      if (username) {
        if (username.length < 7 || username.length > 20) {
          return next(
            errorHandler(400, 'Username must be between 7 and 20 characters')
          );
        }
      }
  
   
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username,
            email,
            password: req.body.password, 
            profilePicture,
            address,
            mobile,
            country,
            interests, 
            language,
            university,
            location: req.body.location,
          },
        },
        { new: true } 
      );
  
      
      const { password: _, ...rest } = updatedUser._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };
  
export const deleteUser = async(req,res,next)=>{
  if (!req.user.isAdmin && req.user.id !== req.params.id) {
    return next(errorHandler(403, 'You are not allowed to delete this user'));
  }

  try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been Deleted...")
  } catch (error) {
      next(error)
  }
}
export const signout = (req, res, next) => {
  try {
    res.clearCookie('access_token').status(200).json('User has been signed out');
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to see all users'));
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'asc' ? 1 : -1;

    const searchTerm = req.query.searchTerm || '';

    const usersQuery = User.find({

      $or: [
        { username: { $regex: searchTerm, $options: 'i' } },
        { email: { $regex: searchTerm, $options: 'i' } },
       
      ]
     
    });

    const users = await usersQuery

      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });


    const totalUsers = await User.countDocuments();
    const totalAdmins = await User.countDocuments({ isAdmin: true });
    const totalCustomers = await User.countDocuments({ isAdmin: false });

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    const lastMonthCustomers = await User.countDocuments({
      isAdmin: false ,
      createdAt: { $gte: oneMonthAgo },
    });
    const lastMonthAdmin = await User.countDocuments({
      isAdmin: true ,
      createdAt: { $gte: oneMonthAgo },
    });


    res.status(200).json({
      users: usersWithoutPassword,
      totalUsers,
      lastMonthCustomers,
      totalAdmins,
      totalCustomers,
      lastMonthAdmin,
      lastMonthUsers

    });
  } catch (error) {
    next(error);
  }
};


export const forgetpassword = async (req, res, next) => {
  const { email } = req.body;
  try {
   
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ status: 401, message: "User not found" });
    }

    
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

  
    user.verifytoken = token;
    
    await user.save();
    

   
    const mailOptions = {
      from: "sanjana.nim2001@gmail.com",
      to: email,
      subject: "Password Reset",
      text: `Use the following link to reset your password: http://localhost:5173/resetpassword/${user._id}/${token}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ status: 500, message: "Email not sent" });
      }
      
      res.status(201).json({ status: 201, message: "Email sent successfully" });
    });
  } catch (error) {
    console.error("Forget password error:", error);
    next(error);
  }
};

export const resetpassword = async (req, res, next) => {
  const { id, token } = req.params;

  try {
    const validuser = await User.findOne({_id: id, verifytoken: token});
   
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);


    if (validuser && verifyToken.id) {
      res.status(201).json({ status: 201, validuser });
    } else {
      res.status(401).json({ status: 401, message: "User does not exist" });
    }
  } catch (error) {
    console.error("Error in resetpassword controller:", error);
    res.status(500).json({ status: 500, message: "Internal server error" });
  }
};

export const updateResetPassword = async (req, res, next) => {
  const { id, token } = req.params;
  const { password } = req.body;

  try {
      const validuser = await User.findOne({ _id: id, verifytoken: token });
      const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

      if (validuser && verifyToken.id) {
          const newpassword = await bcryptjs.hash(password, 10);

          await User.findByIdAndUpdate(id, { password: newpassword });

          res.status(201).json({ status: 201, message: "Password updated successfully" });
      } else {
          res.status(401).json({ status: 401, message: "User does not exist or invalid token" });
      }
  } catch (error) {
      res.status(500).json({ status: 500, error: error.message });
  }

};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const getAdmins = async (req, res, next) => {
  try {
    
    const admins = await User.find({ isAdmin: true });
    res.status(200).json({ admins });
  } catch (error) {
    console.error("Error in getAdmins controller:", error);
    res.status(500).json({ status: 500, message: "Internal server error" });
  }
};
export const getCustomers = async (req, res, next) => {
  try {
    
    const admins = await User.find({ isAdmin: false });
    res.status(200).json({ admins });
  } catch (error) {
    console.error("Error in getAdmins controller:", error);
    res.status(500).json({ status: 500, message: "Internal server error" });
  }
};
export const assignAdmin = async (req, res, next) =>{
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }
    user.isAdmin = true;
    await user.save();
    res.status(200).json({ message: 'User assigned admin privileges successfully' });
  } catch (error) {
    next(error);
  }

};
export const resignAdmin = async (req, res, next) =>{

  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }
    user.isAdmin = false;
    await user.save();
    res.status(200).json({ message: 'User resigned admin privileges successfully' });
  } catch (error) {
    next(error);
  }
  
};


export const getUserProfilePicture = async (req, res, next) => {
  try {
    const { email, username } = req.query;

    // Check if either email or username is provided
    const user = await User.findOne({ $or: [{ email }, { username }] });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user's profile picture
    return res.status(200).json({ profilePicture: user.profilePicture });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

