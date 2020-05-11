const express = require('express');
const session = require('express-session'); 
require('dotenv').config(); 
const multer = require('multer');
const cors = require('cors');
const PORT = process.env.PORT || 5050; 
const app = express(); 

const corsOpts = {
  origin: ['http://localhost', 'http://18.206.96.118'],
  prefligthContinue: true,
  credentials: true, 
  optionsSuccessStatus: 204,
  allowedHeaders : ['Content-Type', 'Authorization', 'Set-Cookie', 'Cookie']
}; 

//app.options('*', cors(corsOpts)); 


//app.use(cors(['localhost', '18.206.96.118'])); 
app.use(cors(corsOpts)); 
// app.options('*', cors({credentials: true})); 

// Bodyparser for form-data encoded body form
app.use(multer().none()); 

// Bodyparser for  encoded body form
app.use(express.urlencoded({extended: true}));

// Bodyparser for json type data
app.use(express.json()); 

//app.use(cors(corsOpts)); 

app.use(session({
  secret: 'booxxy onthe move', // 'keyboard cat' as a default secret would become easy to hack. 
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 6*30*24*3600*1000,
    httpOnly: true,
    secure: false, // false : http and https / true : only https 
    domain: 'http://localhost'
  }
})); 


app.use(require('./app/router')); 

app.listen(PORT, _ => console.log("Server running on ", PORT)); 

