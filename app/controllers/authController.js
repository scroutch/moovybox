const Joi = require('@hapi/joi');
const User = require('../models/user'); 

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
                        // Returning the user as as object

                        delete storedUser.password
                        res.send(storedUser);
                    }

            }

            
        } catch (error) {
            console.trace(error); 
        }
    }

}

module.exports = authControlleur ;