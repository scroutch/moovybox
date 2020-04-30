const express = require('express');
require('dotenv').config(); 
const PORT = process.env.PORT || 5050; 
const app = express(); 

app.use(express.urlencoded({extended: true}));

app.use(require('./app/router')); 

app.listen(PORT, _ => console.log("Server running on ", PORT)); 
