const bcrypt = require('bcrypt');

const salt = 10;

bcrypt.hash("gedeon", salt, function(err, hash) {
    // Store hash in your password DB.

    console.log("hash", hash); 
    console.log(hash.length); 
    bcrypt.compare("gedeon", hash, function(err, result) {
        // result == true
        console.log("compare", result); 
    });
});
