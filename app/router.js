const express = require('express');
const router = express.Router(); 

const mainController = require('./controllers/mainController'); 

router.get('/', mainController.homePage); 

router.use('*', mainController.notFound); 

module.exports = router; 