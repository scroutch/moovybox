const Move = require('./app/models/move'); 


const myMove = new Move({label: 'houlala'}); 

console.log('myMove :>> ', myMove);


/*const bcrypt = require('bcrypt');
require('dotenv').config(); 

const salt = parseInt(process.env.SALT, 10);
(async () => {
    const hash = await bcrypt.hash("gedeon", salt); 
    console.log('hash :>> ', hash);
})(); 

/*, function(err, hash) {
    // Store hash in your password DB.

    console.log("hash", hash); 
    console.log(hash.length); 
    bcrypt.compare("gedeon", hash, function(err, result) {
        // result == true
        console.log("compare", result); 
    });
});
*/

