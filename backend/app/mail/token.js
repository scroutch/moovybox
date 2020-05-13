const jwt = require('jsonwebtoken'); 
require('dotenv').config(); 

const EMAIL_SECRET = process.env.TOKENKEY; 

const payload = {
    pseudo: 'Nico',
    email: 'nicolas.garcon@gmail.com',
    password: 'motdepasse'
}; 

const token = jwt.sign(payload, EMAIL_SECRET,{expiresIn: '1d'}); 
console.log('token :>> ', token);

const isValid = jwt.verify(token, EMAIL_SECRET); 
console.log('isValid :>> ', isValid);


// Enregistrer un user 
// Comme d'habitude + Créer un token 
//*  const token = jwt.sign({id, email}, clé de cryptage (ex: EMAIL_SECRET),{expiresIn: '1d'}); 
// Personnalise le mail (pseudo, le lien avec le token, email)
// Envoyer le mail de confirmation

// Recevoir une confirmation
// lire le req.params.token
//* const clearedToken = jwt.verify(token, EMAIL_SECRET); 
// Si pas d'erreurs : on passe le nouveau payload pour la confirmation
// La valeur confirmed en base de données passe à 'true'

// Renvoyer la confirmation de confirmation