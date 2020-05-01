const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const Move = require('../models/move'); 

const newMoveSchema = Joi.object({
    label: Joi.string()
        .alphanum()
        .max(150)
        .required(), 
    date: Joi.date()
        .format('YYYY-MM-DD')
        .required(), 
    address: Joi.string()
        .alphanum()
        .max(500)
        .allow("")
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
            // Validate the data form the form
            const moveValidation = await newMoveSchema.validate(req.body); 

            // if no error found then create Move instance and insert data. 
            if (!moveValidation.error) {
                // create an instance of a move
                const newMove = new Move(req.body); 

                // Save the current move object to DB
                const storedMove = await newMove.insert(req); 

                // Send the newly added move entry to client
                res.send(storedMove); 

            } else {
                // if an error is found, update status code (400 for bad request)and send the error details
                res.status(400).send(moveValidation.error.details); 
            }
    
        } catch (error) {
            console.trace(error);
        }
    }

}

module.exports = moveController ;