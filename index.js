const express = require('express');
const session = require('express-session'); 
require('dotenv').config(); 
const PORT = process.env.PORT || 5050; 
const app = express(); 

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        maxAge: 6*30*24*3600*1000,
        secure: false }
  })); 

// parse incoming form into an object
app.use(express.urlencoded({extended: true}));

app.use(require('./app/router')); 

app.listen(PORT, _ => console.log("Server running on ", PORT)); 
