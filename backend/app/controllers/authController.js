const Joi = require('@hapi/joi');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const Move = require('../models/move'); 
const jwt = require('jsonwebtoken'); 
const sendConfirmationEmail = require('../mail/sendConfirmation'); 
require('dotenv').config(); 

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

const emailSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
});

const authControlleur = {
    signup: async (req, res) => {
        try {
            // check for entries
            console.log("req.body", req.body); 
            console.log("req.query", req.query); 
    
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

                        // Send email confirmation to the user email
                        const confirmationEmailData = {}; 

                        // - Retrieve user email
                        confirmationEmailData.userId = storedUser.id; 
                        confirmationEmailData.userPseudo = storedUser.pseudo; 
                        confirmationEmailData.userEmail = storedUser.email; 

                        // - Create token with user id and email
                        confirmationEmailData.userToken = jwt.sign(storedUser, process.env.TOKENKEY, {expiresIn: '1d'}); 
                        // - Use the email function ({userPseudo, userEmail, UserToken})

                        sendConfirmationEmail(confirmationEmailData); 

                        res.status(201).send(storedUser); // Status 201 : resosurces created
                    }
            }            
        } catch (error) {
            console.trace(error); 
        }
    },

    confirmEmail: async (req, res) => {
        try {
            // verifiy token 
            const user = jwt.verify(req.params.token, process.env.TOKENKEY); 

            if (!!user.id) {
                // Update user state in DB : confirm : false-> true
                const updatedUser = await User.confirmUser(user.id); 

                if (!!updatedUser) {
                    // Redirection towards front app signin page 
                    res.redirect('http://localhost:8080/signIn'); 
                } else {
                    // Redirection towards front app 404
                    res.redirect(404, 'http://localhost:8080/404'); 
                }
            }

        } catch (error) {
            console.trace(error); 
        }

    }, 

    resetToken : async (req, res) => {
        //* A already registred user is not confirmed and his token is outdated
        //Renw token and

        try {

            const validEmail = emailSchema.validate(req.body); 

            if(!!validEmail.error) {
                return res.status(400).send({ // server code 400 : bad request
                    error : {
                        statusCode: 400,
                        message: {
                            en:"The email format is not correct.", 
                            fr:"Le format d'email n'est pas correct."
                        }
                    }
                });
            }

            // Retreive user by email 
            const storedUser = await User.findByEmail(req.body.email); 

            if (!storedUser) {
               // If no user is found send 404 (not found) error
                return res.status(401).send({
                    error : {
                        statusCode: 401,
                        message: {
                            en:"Email not found", 
                            fr:"Email non trouvé"
                        }
                    }
                }); 
            }


            if (storedUser.confirmed) {
                // If user exists and account is activated, send error
                return res.status(409).send({ // server code 409 : conflict
                    error : {
                        statusCode: 409,
                        message: {
                            en:"Account already confirmed", 
                            fr:"Ce compte est déjà confirmé"
                        }
                    }
                });
            }

            // If user exists and has an unactivated account 
            // -> send New confirmation email

            // Removing unecessary password for token creation
            delete storedUser.password; 

            // Send email confirmation to the user email
            const confirmationEmailData = {}; 

            // - Retrieve user email
            confirmationEmailData.userId = storedUser.id; 
            confirmationEmailData.userPseudo = storedUser.pseudo; 
            confirmationEmailData.userEmail = storedUser.email; 

            // - Create token with user id, pseudo and email
            confirmationEmailData.userToken = jwt.sign(storedUser, process.env.TOKENKEY, {expiresIn: '1d'}); 
            // - Use the email function ({userPseudo, userEmail, UserToken})

            sendConfirmationEmail(confirmationEmailData); 

            res.status(200).send({ // server code 200 : success
                en: "Success - The new confirmation link has been sent.", 
                fr: "Réussie - Le nouveau lien de confirmation a été envoyé."
            });

            
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
                res.status(400).send(signinFormValid.error); 
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
                    // bcrypt.compare(<user password>, <DB hashed password>); 
                    const passwordMatch = await bcrypt.compare(req.body.password, storedUser.password); 
                    
                    console.log('passwordMatch :>> ', passwordMatch);
                    
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
                        //   If there is a match
                        // Check if user is confirmed
                        if (!storedUser.confirmed) {
                            return res.status(403).send({
                                error : {
                                    statusCode: 403,
                                    message: {
                                        en:"Account is not activated - check email to activate account", 
                                        fr:"Le compte n'est pas activé - Vérifier le mail pour activation de compte"
                                    }
                                }
                            }); 
                        }

                        delete storedUser.password; 
                        return res.send(storedUser); 
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
        delete req.session.user;
        res.redirect('/');   
    }, 

    updateProfile : (req, res) => {
        //* Updating user profile (pseudo, email)
        // Checkout if both 
        res.send('this is update profile.'); 
    }, 

    resetPassword : (req, res) => {
        //* Reseting the password User password
        // Checkout if both 
    }
}

module.exports = authControlleur ;