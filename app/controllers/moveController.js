const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const Move = require('../models/move'); 

const moveSchema = Joi.object({
    label: Joi.string()
        .pattern(new RegExp('^[^<>:%]{3,}$'))
        .max(150)
        .required(), 
    date: Joi.date()
        .format('YYYY-MM-DD')
        .required(), 
    address: Joi.string()
        .pattern(new RegExp('^[^<>:%]{3,}$'))
        .max(500)''
});

const moveController = {

    getUserMoves: async(req,res) => {
        //* Find a send all the moves from a user
        try {
            // At this stage, a middleware has checked user authorization. 
            const moves = await Move.getAll(req); 

            res.send(moves); 

        } catch (error) {
            console.trace(error);
        }
    },

    createMove: async (req, res) => {
        //* Create a new move in DB
        try {
            // Validate the data from the form
            const moveValidation = await moveSchema.validate(req.body); 

           

            // if no error found then create Move instance and insert data. 
            if (!moveValidation.error) {

                //Compare the label field with the DB values
                const labelMatch = await Move.labelExists(req); 
                console.log("labelMatch :>>", labelMatch);
 
                //If the label is the same of the DB value of the same user
                if (labelMatch){
                    // send a error to client
                    res.status(409).send({
                        error : {
                            statusCode: 409,
                            message: {
                                en:"This label already exists", 
                                fr:"Ce label existe déjà"
                            }
                        }
                    });
                                
                } else {
                    // Else, we move on with the request

                    // create an instance of a move
                    const newMove = new Move(req.body); 
                    console.log('newMove :>> ', newMove);

                    // Save the current move object to DB
                    /// zkdjfzf Move.insert(req)
                    const storedMove = await newMove.insert(req); 

                    // Send the newly added move entry to client
                    res.send(storedMove);        
                }

            } else {
                // if an error is found, update status code (400 for bad request)and send the error details
                res.status(400).send(moveValidation.error.details); 
            }
    
        } catch (error) {
            console.trace(error);
        }
    }, 

    updateMove: async (req, res) => {
        //* Update the moves parameters
        
        // Check form validity
        const moveValidation = await moveSchema.validate(req.body); 

        // if the form is valid, 
        if (!moveValidation.error) {
            // Check 
            // Retrieve the arguments
            // move id from params
            // move infos from form body
            const moveId = req.params.id;

        } else {
            res.send(); 
        }

        // if the form is not valid, 
            // abort operation and send error 


        // return the updated move
        res.send('This is update move'); 

    },

    deleteMove: async (req, res) => {
        //* Delete a move from DB matching user id
        // At this stage user IS authentified (authCheckerMW.js)
                try {
                    
                    
                    // Retrieve move id from url
                    const moveId = req.params.id; 
                    
                    // Request deletion from DB with move id
                    const success = await Move.delete(moveId); 

                    // return : boolean
                    // true : deletion ok
                    // false : deletion didn't work
                    res.send(success);
                } catch (error) {
                    console.trace(error);
                }

    }

}

module.exports = moveController ;