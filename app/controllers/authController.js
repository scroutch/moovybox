const Joi = require('@hapi/joi');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const signinSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
        .pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'))
        .required()
});

const signupSchema = Joi.object({
    pseudo: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
        .email()
        .required(), 
    password: Joi.string()
        .pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'))
        .required(),
        // ^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$
    repeat_password: Joi.ref('password'),
}); 

const authControlleur = {
    signup: async (req, res) => {
        try {
            // check for entries
            // console.log(req.body); 
    
            // check de validity of the sent data
            const authValidation =  await signupSchema.validate(req.body);
    
            // check if the incoming data is valid -> no error
            if (!!authValidation.error) {
                // if an error occurs send a bad request code (400) to front
                res.status(400).send(authValidation.error); 
            } else {
                console.log('in else');
                // Check if the incoming email isn't already present in DB
                const emailExists = await User.emailExists(req.body.email); 

                    if (emailExists) {
                        // if present : send an error (look for server code) "email already existing in DB" status (409) Conflict
                        res.status(409).send({
                            error : {
                                statusCode: 409,
                                message: {
                                    en:"This email already exists", 
                                    fr:"Ce mail existe déjà"
                                }
                            }
                        }); 
                    } else {
                        // Creating the object user
                        const newUser = new User(req.body); 
                        // Save new user in DB 
                        const storedUser = await newUser.insert(); 
                        console.log('storedUser :>> ', storedUser);
                        // Returning the user as an object
                        delete storedUser.password; 
                        res.status(201).send(storedUser); // Status 201 : resosurces created
                    }
            }            
        } catch (error) {
            console.trace(error); 
        }
    },
  
    signin: async (req, res) => {

        try {
            const signinFormValid = signinSchema.validate(req.body);
            console.log("signinFormValid :>> ", signinFormValid);
            //console.log("!!signinFormValid.error :>> ", !!signinFormValid.error);

            if (!!signinFormValid.error){
                res.status(401).send(signinFormValid.error); 
            } else {
                // * Get user from email and match passwords 

                // I query to get user from DB with email address 
                const storedUser = await User.findByEmail(req.body.email); 
                console.log('storedUser :>> ', storedUser);
                //console.log("req.body.password :>> ", req.body.password);
                //console.log("storedUser.password :>> ", storedUser.password);
                // If the user exists  
                if (!!storedUser) {

                    // I compare the hash from the DB with the received password (bcrypt)
                    const passwordMatch = await bcrypt.compare(req.body.password, storedUser.password); 
                    
                    if (!passwordMatch) {
                        //  If no match send error (wrong password)
                        res.status(401).send({
                            error : {
                                statusCode: 401,
                                message: {
                                    en:"Wrong password", 
                                    fr:"Mot de passe incorrect"
                                }
                            }
                        }); 
                    } else {
                        //   If there is a match add user id to session, 
                        // AND get his moves and send the results back 
                        req.session.user_id = storedUser.id; 
                        console.log('req.session :>> ', req.session);

                        delete storedUser.password; 
                        res.send(storedUser); 
                    }
                } else {
                    res.status(401).send({
                        error : {
                            statusCode: 401,
                            message: {
                                en:"Email not found", 
                                fr:"Email non trouvé"
                            }
                        }
                    }); 
                }
            }
        }
        catch (err) {
            console.trace(err);
        }

    }, 

    signout: (req, res) => {
        delete req.session.user_id;
        res.redirect('/');   
    }
}

module.exports = authControlleur ;