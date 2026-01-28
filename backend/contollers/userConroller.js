import userModel from "../modals/userModal.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import validator from "validator";
//LOGIN FUNC
const loginUser = async(req, res)=>{
    const {email, password} = req.body
    try {
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success:false, message:"User doesn't exists"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.json({success:false, message:"Invalid credentials"})
        }
        const token = createToken({id:user._id});
        res.json({success:true, token})
    }
    catch (error) {
        console.log(error)
        res.json({success:false, message:"Login failed"})
    }
}

//CREATE TOKEN 
const createToken = (id) =>{
    return jwt.sign(id, process.env.JWT_SECRET)   
}

//REGISTER FUNC
const registerUser = async(req, res)=>{
    const {username, password, email} = req.body;
    try{
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success:false, message:"User already exists"})
        }
        //VALIDATION
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Invalid email"})
        }
        if(password.length < 8){
            return res.json({success:false, message:"Password must be at least 8 characters"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new userModel({
            username: username,
            email: email,
            password: hashedPassword
        })
        const user = await newUser.save();
        
        const token = createToken({id: user._id})
        res.json({success:true, token})
       
    }
    catch (error) {
        console.log(error)
        res.json({success:false, message:"Registration failed"})

    }
}

//GET ALL USERS
const getUsers = async(req, res)=>{
    try {
        const users = await userModel.find({}).select('-password');
        res.json({success:true, users})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Failed to get users"})
    }
}

export {loginUser, registerUser, getUsers}