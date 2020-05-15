const Joi = require('@hapi/joi');
const User = require('../models/user');

const pseudoSchema = Joi.object({
    pseudo: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
})


const profileController = {

    updateProfile : (req, res) => { // Might ot keep it that way 
        //* Updating user profile (pseudo, email)
        // Checkout if both 
        res.send('this is update profile.'); 
    }, 

    updatePseudo: async (req, res) => {
        //* Updating user pseudo {pseudo}

        try {
            // At this stage a user login state is tested
            const pseudoValidation = await pseudoSchema.validate(req.body);
            console.log('req.body', req.body);
            console.log('pseudoValidation', pseudoValidation);
            // If payload is not proper send error; 
            if (!!pseudoValidation.error) {
                return res.status(400).send(pseudoValidation.error); 
            }
            // pass req obj to model function for pseudo update
            const updateUser = await User.updatePseudo(req); 
            // Send update value in session 
            req.session.user.pseudo = updateUser.pseudo; 
            // remove password from object to send as response
            delete updateUser.password; 
            // send it back to front
            res.send(updateUser); 
        } catch (error) {
            console.trace(error); 
        }
    }, 

}

module.exports = profileController ;