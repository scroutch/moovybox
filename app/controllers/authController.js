const authControlleur = {
    signup: (req, res) => {
        // check for entries

        console.log(req); 

        // check de validity of the sent data

        // Check if the incoming email isn't already present in DB
            // if present : send an error (look for server code) "email already existing in DB"
            // absent : create and send the new entry data back
            // open a session and add user id in session
            // 
        res.send("c'est l'auth  signup !"); 
    }

}

module.exports = authControlleur ;