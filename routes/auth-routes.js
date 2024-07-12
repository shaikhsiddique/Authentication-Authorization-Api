const express = require('express');
const route = express.Router();
const { registerUser , loginUser , logoutUser , getUserProfile} = require('../controllers/auth-controllers');
const isLoggedIn = require('../middleware/isLoggedIn');
route.post('/register',(req,res)=>{
    registerUser(req,res);
});
route.post('/login',(req,res)=>{
    loginUser(req,res);

})
route.get('/logout',(req,res)=>{
    logoutUser(req,res);
})
route.get('/profile',isLoggedIn,(req,res)=>{
    getUserProfile(req,res);
})

module.exports= route;