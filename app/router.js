const express = require('express');
const router = express.Router(); 
const authCheckerMW = require('./middlewares/authChecker'); 
const userCheckerMW = require('./middlewares/userChecker'); 
const mainController = require('./controllers/mainController'); 
const authController = require('./controllers/authController'); 


router.get('/', authCheckerMW, mainController.homePage); 

router.post('/signin', authController.signin);

router.post('/signup', authController.signup);

router.post('/signout', authController.signout);

router.route('/profile')
    .put(userCheckerMW, authController.updateProfile); 

router.use('*', mainController.notFound); 

module.exports = router; 
