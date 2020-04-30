const Joi = require('@hapi/joi');


const signinSchema = Joi.object().keys({

    email: Joi.string().email().required(),
    password: Joi.string()
        .pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'))
        .required()
    });

const authControlleur = {


    signin: (req, res) => {

        try {
            const signinFormValid = signinSchema.validate(req.body);
            console.log(signinFormValid);
        }
        catch (err) { }

        res.send("c'est l'auth signin !"); 
    }
// I want to connect my DB to my authcontroller
// 
}


module.exports = authControlleur ;