const bcrypt = require('bcrypt');

const validatePassword = async (password,hashedPassword)=>{
    
    const result = await  bcrypt.compare(password,hashedPassword);
    return result
}

module.exports = validatePassword;