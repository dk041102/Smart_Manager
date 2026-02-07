const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Register User
exports.register = async (req,res) => {
    console.log("REGESTER API HIT");
    try{
        const {name,email,password} = req.body;

        //check existing user
        let user = await User.findOne({email});
        if(user) return res.status(400).json({ msg: "User already exists" });
        const salt = await bcrypt.genSalt(10);
        //hash Password
        const hashedPassword = await bcrypt.hash(password,salt);
        user = await User.create({
            name,
            email,
            password : hashedPassword
        });
        res.json({ msg: "User registered successfully" });
    }catch(err){
        res.status(500).json({ error : err.message });
    }
};

//Login User
exports.login = async (req,res) => {
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({ msg: "Invalid credentials" });

        //compare passworrd
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({ msg : "Invalid creqentials" });

        //create token
        const token = jwt.sign(
                {id : user._id},
                process.env.JWT_SECRET,
                {expiresIn : "1d"}
        );
            res.json({
                token,
                user : { id : user._id, name : user.name, email : user.email }
            });
    }catch(err){
        res.status(500).json({error : err.message});
    }
};
