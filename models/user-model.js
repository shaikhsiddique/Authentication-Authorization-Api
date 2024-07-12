const mongoose = require('mongoose');
const Joi = require('joi'); 

const userSchema = new mongoose.Schema({ 
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }
});

const validateUser = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .required()
            .messages({
                'any.required': 'Name is required',
                'string.base': 'Name must be a string'
            }),
        email: Joi.string()
            .email()
            .required()
            .messages({
                'any.required': 'Email is required',
                'string.email': 'Email must be a valid email address'
            }),
        password: Joi.string()
            .min(8)
            .required()
            .messages({
                'any.required': 'Password is required',
                'string.min': 'Password must be at least 8 characters long'
            })
    });

    return schema.validate(data);
};

const userModel = mongoose.model('User', userSchema); 

module.exports = { validateUser, userModel };
