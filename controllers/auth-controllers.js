const { validateUser, userModel } = require('../models/user-model');
const hashPassword = require('../utils/hash-password');
const generateToken = require('../utils/generate-token');
const validatePassword = require('../utils/validate-password');
module.exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const {err} = validateUser({ name, email, password });

        if (err) {
            return res.status(400).send(err.message);
        }

        let user = await  userModel.findOne({ email });

        if (user) {
            return res.status(400).send("This email is already registered");
        }

        const hashedPassword = await hashPassword(password); // Ensure hashPassword returns a promise
        user = new userModel({ name, email, password: hashedPassword });

        await user.save();

        const token = generateToken(user._id); // Use user ID or another unique identifier
        res.cookie("token", token, { httpOnly: true, secure: true });

        res.status(201).send({
            user: {
                name: user.name,
                email: user.email,
                _id: user._id
            },
            message: "User registered successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports.loginUser = async (req,res)=>{

    const {email, password} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
       return  res.status(400).send("Something went wrong");
    }
    const result = validatePassword(password,user.password);

    if(! result){
        return  res.status(401).send("Invalid password");
    }
    const token = generateToken(user._id);
    res.cookie("token", token, { httpOnly: true, secure: true });
    res.status(201).send("Login successfull");

    
    
}
module.exports.logoutUser = (req,res)=>{
    res.cookie("token", null, { httpOnly: true, secure: true });
    res.status(201).send("Logout successfull")
}
module.exports.getUserProfile = (req,res)=>{
    const user = req.user;
    res.status(201).send(user);
    
}