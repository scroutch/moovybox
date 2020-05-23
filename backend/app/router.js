const express = require('express');
const router = express.Router(); 

//const accessHomeMW = require('./middlewares/accessHome'); 
const authCheckerMW = require('./middlewares/authChecker'); 
const boxOptionFillMW = require('./middlewares/boxOptionFill'); 

const mainController = require('./controllers/mainController'); 
const authController = require('./controllers/authController'); 
const profileController = require('./controllers/profileController'); 
const moveController = require('./controllers/moveController');
const boxController = require('./controllers/boxController'); 
const itemController = require('./controllers/itemController'); 



//router.get('/', /*accessHomeMW,*/ mainController.homePage); 

/* Access related routes */

router.post('/signin', authController.signin);

router.post('/signup', authController.signup);

router.post('/signout', authController.signout);

router.get('/confirmation/:token', authController.confirmEmail);

router.post('/reset-token', authController.resetToken);

router.get('/profile/reset-password/:token', authController.resetPasswordRedirection); 
    
router.put('/profile/reset-password',authController.resetPassword); 


/* PROFILE RELATED ROUTES */ 

// Update pseudo
router.put('/profile/pseudo', authCheckerMW, profileController.updatePseudo); 

// Change email
router.post('/profile/email', authCheckerMW, profileController.requestEmailUpdate); 
router.get('/profile/confirm-email-update/:token',  profileController.confirmEmailUpdate);
router.get('/profile/confirm-new-email-update/:token',  profileController.updateEmail); 

// Modify password
router.post('/profile/password', authCheckerMW, profileController.updatePassword);



// delete account
router.delete('/profile', authCheckerMW, profileController.deleteAccount); 

/* Move related routes  */

router.route('/move')
    // Get all move from the current user
    .get(authCheckerMW, moveController.getUserMoves) 
    // Create a new move
    .post(authCheckerMW, moveController.createMove);

router.route('/move/:id')
    .get(authCheckerMW, boxController.getMoveBoxes)
    .put(authCheckerMW, moveController.updateMove)
    .delete(authCheckerMW, moveController.deleteMove);

/* Box related routes  */

router.route('/box')
    .get(authCheckerMW, boxController.getUserBoxes)
    .post(authCheckerMW, boxOptionFillMW, boxController.createBox); 

router.route('/box/:id')
    .get(authCheckerMW, itemController.getBoxItems)
    .put(authCheckerMW, boxOptionFillMW, boxController.updateBox)
    .delete(authCheckerMW, boxController.deleteBox);

/* Item related routes  */

router.route('/item')
    .post(authCheckerMW, itemController.createItem);


router.route('/item/:id')
    .put(authCheckerMW, itemController.updateItem) // TODO 
    .delete(authCheckerMW, itemController.deleteItem);

/* Search route*/

router.route('/search')
    //! enable "authCheckerMW" middleware after development 
    .get(authCheckerMW, itemController.searchItem);

router.get('/session', (req,res) => {return res.send(req.session.user)});

router.use('*', mainController.notFound); 

module.exports = router; 
