const express = require('express');
const session = require('express-session'); 
require('dotenv').config(); 
const multer = require('multer');
const cors = require('cors');
const PORT = process.env.PORT || 5050; 
const app = express(); 

app.use(cors()); 
app.options('*', cors({credentials: true})); 

// Bodyparser for form-data encoded body form
app.use(multer().none()); 

// Bodyparser for  encoded body form
app.use(express.urlencoded({extended: true}));


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        maxAge: 6*30*24*3600*1000,
        secure: false }
  })); 

app.use(require('./app/router')); 

app.listen(PORT, _ => console.log("Server running on ", PORT)); 
