import userModel from "../modals/userModal.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import validator from "validator";
//LOGIN FUNC
const loginUser = async(req, res)=>{
    console.log("LOGIN BODY:", req.body);
    const { identifier, password } = req.body;

    try {
        console.log('Login attempt:', { identifier, password: '***' });
        /*const normalizedEmail = email?.trim().toLowerCase();
        const normalizedUsername = username?.trim();
        
        if (!normalizedEmail && !normalizedUsername) {
            return res.json({success:false, message:"Username or email is required"})
        }
        
        let user;
        if (normalizedUsername) {
            user = await userModel.findOne({ username: { $regex: `^${normalizedUsername}$`, $options: 'i' } });
            console.log('Queried by username:', normalizedUsername, '| Found:', !!user);
        }
        
        if (!user && normalizedEmail) {
            user = await userModel.findOne({ email: { $regex: `^${normalizedEmail}$`, $options: 'i' } });
            console.log('Queried by email:', normalizedEmail, '| Found:', !!user);
        }*/
            
        if (!identifier || !password) {
        return res.status(400).json({
            success: false,
            message: "Username and password are required"
        });
        }
        const user = await userModel.findOne({
        $or: [
            { email: identifier.toLowerCase() },
            { username: { $regex: `^${identifier}$`, $options: 'i' } }
 
        ]
        });
         console.log("USER FOUND:", user ? user.email : null);
        
        if(!user){
            console.log('User not found');
            return res.status(404).json({
                success: false,
                message: "User doesn't exist"
                });

        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.json({success:false, message:"Invalid credentials"})
        }

        const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
        );
        
        res.json({success:true, token})
    }
    catch (error) {
        console.log(error)
        res.json({success:false, message:"Login failed"})
    }
}

//CREATE TOKEN 
const createToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: '7d' })
}

//REGISTER FUNC
const registerUser = async(req, res)=>{
    const { username, email, password } = req.body;
    const emailNormalized = email?.trim().toLowerCase();

    try{
        console.log('Register attempt:', { username, email, passwordLength: password?.length });
        
        if (!username || !email || !password) {
            return res.status(400).json({success:false, message:"Username, email, and password are required"})
        }
        
        const exists = await userModel.findOne({ $or: [{email: emailNormalized}, {username}] });

        if(exists){
            console.log('User already exists:', email);
            return res.json({success:false, message:"User already exists"})
        }
        //VALIDATION
        if(!validator.isEmail(email)){
            console.log('Invalid email:', email);
            return res.json({success:false, message:"Invalid email"})
        }
        if(password.length < 8){
            console.log('Password too short');
            return res.json({success:false, message:"Password must be at least 8 characters"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new userModel({
            username: username,
            email: emailNormalized,
            password: hashedPassword
        })
        const user = await newUser.save();
        console.log('User saved successfully:', { id: user._id, username: user.username, email: user.email });
        
        const token = createToken(user._id)
        res.json({success:true, token})
       
    }
    catch (error) {
        console.log('Registration error:', error)
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