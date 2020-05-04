const express = require('express');
const router = express.Router(); 
const accessHomeMW = require('./middlewares/accessHome'); 
const authCheckerMW = require('./middlewares/authChecker'); 
const userCheckerMW = require('./middlewares/userChecker'); 
const mainController = require('./controllers/mainController'); 
const authController = require('./controllers/authController'); 
const moveController = require('./controllers/moveController'); 


router.get('/', accessHomeMW, mainController.homePage); 

/* Access related routes */

router.post('/signin', authController.signin);

router.post('/signup', authController.signup);

router.post('/signout', authController.signout);

router.route('/profile')
    .put(authCheckerMW, userCheckerMW, authController.updateProfile); 

/* Move related routes  */

router.route('/move')
    .post(authCheckerMW, moveController.createMove)
    .get(authCheckerMW, moveController.getUserMoves); 

router.route('/move/:id')
    .put(authCheckerMW, moveController.updateMove)
    .delete(authCheckerMW, moveController.deleteMove); 

router.use('*', mainController.notFound); 

module.exports = router; 
