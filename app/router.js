const express = require('express');
const router = express.Router(); 

const accessHomeMW = require('./middlewares/accessHome'); 
const authCheckerMW = require('./middlewares/authChecker'); 
const userCheckerMW = require('./middlewares/userChecker'); 
const boxOptionFillMW = require('./middlewares/boxOptionFill'); 

const mainController = require('./controllers/mainController'); 
const authController = require('./controllers/authController'); 
const moveController = require('./controllers/moveController');
const boxController = require('./controllers/boxController'); 
const itemController = require('./controllers/itemController'); 



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
