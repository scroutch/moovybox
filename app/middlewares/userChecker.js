// this middleware serves checker for operations
// Email change
// Pseudo (name) change
// Password change

const User = require('../models/user');

const userChecker = async (req, res, next) => {
    //* Check if current user_id in session and password match these in DB 

    if (!req.session.user) {
        // if no connexion is on send error code 
        res.status(403).send({
            error : {
                statusCode: 403,
                message: {
                    en:"Unauthorized to perform this action. Sign in and retry", 
                    fr:"Autorisation refusée pour cette opération. Se connecter puis réessayer"
                }
            }
        }); 
    } else { // if a connexion is on 

        // check if password is missing or empty
        if (!req.body.password || req.body.password === '') {
            // Send an error if password is missing
            return res.status(400).send({
                error : {
                    statusCode: 400,
                    message: {
                        en:"Bad request", 
                        fr:"La rêquete n'est pas correcte"
                    }
                }
            }); 
        }
        
        // Check if user is allowed to perform change with matching user_id from session
        // hence req object is passed as argument. 
        // 'req' contains both session.user.id and body.password
        const authorized = await User.identifyUser(req); 
        // req.body.
        // Expected data (user_id, password)
        // the user is not authentified, refuse access and send error back to client
        // If user may perform change,  proceed
        console.log("authorized :>>", authorized); 
        if (authorized) {
            next(); 
        } else {
            res.status(403).send({
                error : {
                    statusCode: 403,
                    message: {
                        en:"Unauthorized to perform this action. See password", 
                        fr:"Autorisation refusée pour cette opération. Vérifier le mot de passe."
                    }
                }
            }); 
        }
        
    }

}; 

module.exports = userChecker; 