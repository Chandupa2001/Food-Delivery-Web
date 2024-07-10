import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bycrypt from 'bcrypt';
import validator from 'validator';

// login user
const loginUser = async (req,res) => {
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if (!user) {
            res.json({success: false, message: "Invalid email or password"});
        }
        
        const isMatch = await bycrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({success: false, message: "Invalid email or password"})
        }

        const token = createToken(user._id);
        res.json({success: true, token});

    } catch (error) {
        console.error(error);
        res.json({success: false, message: "Error"});
    }
}

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// register user
const registerUser = async (req,res) => {
    const {name,password,email} = req.body;
    try {
        // checking is user already exists
        const exists = await userModel.findOne({email});
        if (exists) {
            return res.json({success:false, message: "User already exists"})
        }

        //validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({success:false, message: "Please enter a valid email address"})
        }

        if (password.length < 8 ) {
            return res.json({success: false, message: "Please enter a strong password"})
        }

        // hashing user password
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password,salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })

        const user = await newUser.save();
        const token = createToken(user._id)
        res.json({success: true, token});

    } catch (error) {
        console.error(error)
        res.json({success: false, message: "Error"})
    }
}

export { loginUser, registerUser }