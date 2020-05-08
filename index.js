const express = require('express');
const session = require('express-session'); 
require('dotenv').config(); 
const multer = require('multer');
const cors = require('cors');
const PORT = process.env.PORT || 5050; 
const app = express(); 

app.use(cors()); 

// app.use(cors(['localhost', '18.206.96.118'])); 
// app.options('*', cors({credentials: true})); 

// Bodyparser for form-data encoded body form
app.use(multer().none()); 

// Bodyparser for  encoded body form
app.use(express.urlencoded({extended: true}));

// Bodyparser for json type data
app.use(express.json()); 


app.use(session({
    secret: 'b00xymov3', // 'keyboard cat' as a default secret would become easy to hack. 
    resave: false,
    saveUninitialized: true,
    cookie: { 
        maxAge: 6*30*24*3600*1000,
        secure: false // false : http and https / true : only https 
    }
  })); 

app.use(require('./app/router')); 

app.listen(PORT, _ => console.log("Server running on ", PORT)); 
