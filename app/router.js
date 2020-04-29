// SoC : Ce fichier router ne va servir qu'à une seule chose : **définir** les routes.

// on réquire les dépendances
const express = require('express');

// on require nos controllers, pour pouvoir "lier" les routes à des méthodes
const mainController = require('./controllers/mainController');


// on instancie notre routeur
const router = express.Router();

/**
 * ROUTES
 **/
// page d'accueil
router.get('/', mainController.homePage );

// on définit le middleware 404 EN DERNIER !
router.use( mainController.notFound );


// on exporte le routeur pour le rendre diponible dans d'autres fichiers
module.exports = router;