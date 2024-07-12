const jwt = require('jsonwebtoken');
const {userModel} = require('../models/user-model');
const isLoggedIn = async (req,res,next)=>{
    if(req.cookies.token){

        try {
            const data  =  jwt.verify(req.cookies.token,process.env.SECRET_KEY);
            const user = await userModel.findById(data).select("-password");
            if(!user){
            return res.status(401).send({message:'Unauthorized'});
            }
            req.user = user
            next();
        } catch (error) {
            return res.status(401).send({message:'Something went wrong'});
        }
        
    }
   else{
    res.status(401).send({message:'Unauthorized'});
   }
}

module.exports = isLoggedIn;