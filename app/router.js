const express = require('express');
const router = express.Router(); 

const mainController = require('./controllers/mainController'); 
const authController = require('./controllers/authController'); 



router.get('/', mainController.homePage); 

router.post('/signin', authController.signin);

router.use('*', mainController.notFound); 

module.exports = router; 
