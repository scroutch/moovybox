const express = require('express');
const router = express.Router(); 
const authCheckerMW = require('./middlewares/authChecker'); 
const mainController = require('./controllers/mainController'); 
const authController = require('./controllers/authController'); 
const moveController = require('./controllers/moveController'); 


router.get('/', authCheckerMW, mainController.homePage); 

/* Access related routes */

router.post('/signin', authController.signin);

router.post('/signup', authController.signup);

router.post('/signout', authController.signout);

/* Move related routes  */
router.route('/move')
    .post(moveController.createMove); 

router.use('*', mainController.notFound); 

module.exports = router; 
