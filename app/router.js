const express = require('express');
const router = express.Router(); 
const accessHomeMW = require('./middlewares/accessHome'); 
const authCheckerMW = require('./middlewares/authChecker'); 
const userCheckerMW = require('./middlewares/userChecker'); 
const mainController = require('./controllers/mainController'); 
const authController = require('./controllers/authController'); 
const moveController = require('./controllers/moveController');
const boxController = require('./controllers/boxController'); 



router.get('/', accessHomeMW, mainController.homePage); 

/* Access related routes */

router.post('/signin', authController.signin);

router.post('/signup', authController.signup);

router.post('/signout', authController.signout);

router.route('/profile')
    .put(authCheckerMW, userCheckerMW, authController.updateProfile); 

/* Box related routes  */

router.route('/move')
    .post(authCheckerMW, moveController.createMove)
    .get(authCheckerMW, moveController.getUserMoves); 

router.route('/move/:id')
    .delete(authCheckerMW, moveController.deleteMove);
    
router.route('/box')
    .post(authCheckerMW,boxController.createBox)
    .get(authCheckerMW, boxController.getUserBox);


router.route('/box/:id')
    .delete(authCheckerMW, boxController.deleteBox);

router.use('*', mainController.notFound); 

module.exports = router; 
