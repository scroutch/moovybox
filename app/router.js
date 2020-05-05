const express = require('express');
const router = express.Router(); 
const accessHomeMW = require('./middlewares/accessHome'); 
const authCheckerMW = require('./middlewares/authChecker'); 
const userCheckerMW = require('./middlewares/userChecker'); 
const mainController = require('./controllers/mainController'); 
const authController = require('./controllers/authController'); 
const moveController = require('./controllers/moveController');
const boxController = require('./controllers/boxController'); 
const itemController = require('./controllers/itemController'); 



router.get('/', accessHomeMW, mainController.homePage); 

/* ACCESS */

router.post('/signin', authController.signin);

router.post('/signup', authController.signup);

router.post('/signout', authController.signout);

/* EMAIL */

// password reset email

// email confirmation email


/* PROFILE */

router.route('/profile')
    .put(authCheckerMW, userCheckerMW, authController.updateProfile); 

/* MOVES */

router.route('/move')
    .post(authCheckerMW, moveController.createMove)
    .get(authCheckerMW, moveController.getUserMoves); 

router.route('/move/:id')
    .put(authCheckerMW, moveController.updateMove)
    .delete(authCheckerMW, moveController.deleteMove);

/* BOXES */

router.route('/box')
    .post(authCheckerMW,boxController.createBox)
    .get(authCheckerMW, boxController.getUserBoxes);

router.route('/box/:id')
    .get(authCheckerMW, itemController.getBoxItems)
    .delete(authCheckerMW, boxController.deleteBox);

/* ITEMS */

router.route('/item')
    .post(authCheckerMW,itemController.createItem)

router.route('/item/:id')
    .delete(authCheckerMW, itemController.deleteItem);

router.use('*', mainController.notFound); 

module.exports = router; 
