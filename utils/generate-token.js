const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (data)=>{
    const secret = process.env.SECRET_KEY || "secret";
    const token = jwt.sign({_id : data},secret);
    return token

}

module.exports= generateToken;