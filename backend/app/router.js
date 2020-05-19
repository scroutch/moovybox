const express = require('express');
const router = express.Router(); 

const accessHomeMW = require('./middlewares/accessHome'); 
const authCheckerMW = require('./middlewares/authChecker'); 
const boxOptionFillMW = require('./middlewares/boxOptionFill'); 

const mainController = require('./controllers/mainController'); 
const authController = require('./controllers/authController'); 
const profileController = require('./controllers/profileController'); 
const moveController = require('./controllers/moveController');
const boxController = require('./controllers/boxController'); 
const itemController = require('./controllers/itemController'); 



router.get('/', /*accessHomeMW,*/ mainController.homePage); 

/* Access related routes */

router.post('/signin', authController.signin);

router.post('/signup', authController.signup);

router.post('/signout', authController.signout);

router.get('/confirmation/:token', authController.confirmEmail);

router.post('/reset-token', authController.resetToken);



/* PROFILE RELATED ROUTES */ 

// Upadate pseudo
router.put('/profile/pseudo', authCheckerMW, profileController.updatePseudo); 

// Change email
router.post('/profile/email', authCheckerMW, profileController.requestEmailUpdate); 
router.get('/profile/confirm-email-update/:token',  profileController.confirmEmailUpdate);
router.get('/profile/confirm-new-email-update/:token',  profileController.updateEmail); 

// Modify password
router.post('/profile/password', authCheckerMW, profileController.updatePassword);
router.route('/profile/reset-password')
    .get(authController.resetPasswordRedirection)
    .put(authController.resetPassword); 


// delete account
router.delete('/profile', authCheckerMW, profileController.deleteAccount); 

/* Box related routes  */

router.route('/move')
    .post(authCheckerMW, moveController.createMove)
    .get(authCheckerMW, moveController.getUserMoves); 

router.route('/move/:id')
    .get(authCheckerMW, boxController.getMoveBoxes)
    .put(authCheckerMW, moveController.updateMove)
    .delete(authCheckerMW, moveController.deleteMove);
    
router.route('/box')
    .post(authCheckerMW, boxOptionFillMW, boxController.createBox)
    .get(authCheckerMW, boxController.getUserBoxes);

router.route('/box/:id')
    .put(authCheckerMW, boxOptionFillMW, boxController.updateBox)
    .get(authCheckerMW, itemController.getBoxItems)
    .delete(authCheckerMW, boxController.deleteBox);

router.route('/item')
    .post(authCheckerMW,itemController.createItem)


router.route('/item/:id')
    .delete(authCheckerMW, itemController.deleteItem);

router.use('*', mainController.notFound); 

module.exports = router; 
