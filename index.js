
// info SoC (Separation Of Concerns) : ce fichier ne va servr qu'à une seule chose : créer, régler, et lancer notre application. Il ne contiendra donc aucune "logique"(pas de routes, pas de calcul... rien !)
// on commence par "require" les dépendances
const express = require('express');

// cette ligne est léquivalent de: if( process.env.PORT existes) {PORT=process.env.PORT}, else {PORT=3000}
const PORT = process.env.PORT || 3000;

// on instancie le serveur grâce à express
const app = express();

// on définit les routes, en passant le router à notre serveur
const router = require('./app/router');
app.use(router);

// on lance le serveur, en écoute sur le port défini
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});