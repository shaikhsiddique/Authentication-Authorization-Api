const express = require('express');
const app = express();
const env = require('dotenv');
const cookieParser = require('cookie-parser');
const dbconnection = require('./config/db');
const authRoute = require('./routes/auth-routes');

env.config();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
dbconnection();

app.use('/api/auth',authRoute)

app.listen(process.env.PORT || 3000);