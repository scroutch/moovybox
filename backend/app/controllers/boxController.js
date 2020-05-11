const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const Box = require('../models/box');



const newBoxSchema = Joi.object({
    label: Joi.string()
        .pattern(new RegExp('^[^<>:%]{3,}$'))
        .max(150)
        .required(), 
    destination_room: Joi.string()
        .pattern(new RegExp('^[^<>:%]{3,}$'))
        .max(500)
        .allow(""),
    fragile: Joi.boolean()
        .truthy('on')
        .optional(),
    heavy: Joi.boolean()
        .truthy('on')
        .optional(),
    floor: Joi.boolean()
        .truthy('on')
        .optional(),
    move_id: Joi.number().integer()
        .min(1).required(),
    });

const boxUpdateSchema = Joi.object({
    label: Joi.string()
        .pattern(new RegExp('^[^<>%]{3,}$')) 
        .min(3)
        .max(150)
        .required(), 
    destination_room: Joi.string()
        .pattern(new RegExp('^[^<>%]{3,}$'))
        .max(500)
        .allow(""),
    fragile: Joi.boolean()
        .truthy('on')
        .optional(),
    heavy: Joi.boolean()
        .truthy('on')
        .optional(),
    floor: Joi.boolean()
        .truthy('on')
        .optional(),
    move_id: Joi.number().integer()
        .min(1).required()
    });  

const boxController = {


    getUserBoxes: async(req,res) => {
        //* Find and send all the boxes from a user
        try {
            // At this stage, a middleware has checked user authorization. 
            const boxes = await Box.getAll(req); 

            res.send(boxes); 

        } catch (error) {
            console.trace(error);
        }
    },

    getMoveBoxes: async(req,res) => {
        //* Find and send all the boxes from a user move
        try {
            // At this stage, a middleware has checked user's presence. 
            console.log('req.params :>> ', req.params);

            // compare requested move with saved move from user 

            const matchedMove = req.session.user.moves.filter(moveObj => moveObj.id == req.params.id); 

            if (!!matchedMove.length) {
                const boxes = await Box.getAllFromMove(req); 
    
                return res.send(boxes); 

            } else {
                return res.status(403).send({
                    error : {
                        statusCode: 403,
                        message: {
                            en:"Forbidden action", 
                            fr:"Action interdite"
                        }
                    }
                });
            }

        } catch (error) {
            console.trace(error);
        }
    },

    createBox: async (req, res) => {
        //* Create a new box in DB
        try {

            const move = req.session.user.moves.filter(moveObj => moveObj.id == req.body.move_id); 
            
            console.log('move from createBox', move); 

            if (!move.length) {
                return res.status(403).send({
                    error : {
                        statusCode: 403,
                        message: {
                            en:"Forbidden action", 
                            fr:"Action interdite"
                        }
                    }
                });
            }

            // Validate the data from the form
            const boxValidation = await newBoxSchema.validate(req.body); 

            // if no error found then create Box instance and insert data. 
            if (!boxValidation.error) {
                // 

                //Compare the label field with the DB values
                const boxLabelMatch = await Box.boxLabelExists(req); 
                console.log("boxLabelMatch :>>", boxLabelMatch);
 
                //If the label is the same of the DB value of the same user
                if (boxLabelMatch){
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

                    // create an instance of a box
                    const newBox = new Box(req.body); 
                    console.log('newMove :>> ', newBox);

                    // Save the current box object to DB
                    /// zkdjfzf Box.insert(req)
                    const storedBox = await newBox.insert(req); 

                    // Send the newly added box entry to client
                    res.send(storedBox);        
                }

            } else {
                // if an error is found, update status code (400 for bad request)and send the error details
                res.status(400).send(boxValidation.error.details); 
            }
    
        } catch (error) {
            console.trace(error);
        }
    }, 

    updateBox: async (req, res) => {
        //* Update the boxes data
        
        // Filter the user moves with the pointed move (from form)
        const move = req.session.user.moves.filter(moveObj => moveObj.id == req.body.move_id); 
        console.log('move from createBox', move); 

        // If the pointed move doesn't belong to current user
        if (!move.length) {
            // prevent action and send an error
            return res.status(403).send({
                error : {
                    statusCode: 403,
                    message: {
                        en:"Forbidden action", 
                        fr:"Action interdite"
                    }
                }
            });
        }     
        console.log('move[0].id', move[0].id); 
        console.log('req.body.move_id', req.body.move_id);
        const storedBox = await Box.getByPk(req, req.params.id); 
            
        if (move[0].id != storedBox.move_id) {
            return res.status(403).send({
                error : {
                    statusCode: 403,
                    message: {
                        en:"Forbidden action", 
                        fr:"Action interdite"
                    }
                }
            });
        }  
        
        // Check form validity
        const boxValidation = await boxUpdateSchema.validate(req.body); 

        // if the form is valid, 
        if (!boxValidation.error) {
            // Check 
            // Retrieve the arguments

            // Add the false values to form if not sent 
            // (by default the client does not send unckeked box data)

            // Potential boolean values
            const boxAttributes = ['fragile', 'heavy', 'floor']; 

            // check in form data has boolean attributes 
            // if it does NOt then add them set to false
            for (attribute of boxAttributes) {
                if (!req.body.hasOwnProperty(attribute)) {
                    req.body[attribute] = false;  
                }
            }
            // move id from params
            // move infos from form body
            const boxId = req.params.id;

            console.log("req.body",req.body);
            
            // Execute request
            const updatedBox = await Box.update(req, boxId); 

            // console.log("updateBox", updateBox); 

            // return the updated move
            res.send((!!updatedBox) ? updatedBox : false); 

        } else {
            // if the form is not valid, 
            // abort operation and send error 
            res.send(boxValidation.error); 
        }
    },

    deleteBox: async (req, res) => {
        //* Delete a box from DB matching user id
        // At this stage user IS authentified (authCheckerMW.js)
                try {
                    // det pointed box

                    // Retrieve box id from url
                    const boxId = req.params.id; 
                    

                    const storedBox = await Box.getByPk(req, boxId); 

                    // If move belongs to user continue 
                    // else send error
                    if (!storedBox) {
                        return res.status(400).send({
                            error : {
                                statusCode: 400,
                                message: {
                                    en:"Bad request - The ressources doesn't exist", 
                                    fr:"Requête erronée. - La ressouce visée n'existe pas"
                                }
                            }
                        });
                    }


                    const matchedMove = req.session.user.moves.filter(moveObj => moveObj.id == storedBox.move_id); 
                    
                    // If the box is already deleted and a request for deletion is made, 
                    // It'll simply fallback as a false from the DB

                    // If the pointed box Id isnot related to the user moves
                    if (!matchedMove.length) {
                        // Abort operation and send error to client;
                        return res.status(403).send({
                            error : {
                                statusCode: 403,
                                message: {
                                    en:"Forbidden action", 
                                    fr:"Action interdite"
                                }
                            }
                        });
                    }
                    
                    // Request deletion from DB with move id
                    const success = await Box.delete(boxId); 

                    // return : boolean
                    // true : deletion ok
                    // false : deletion didn't work
                    res.status(204); // 204 : No-content, here '.send()' is useless
                } catch (error) {
                    console.trace(error);
                }

    }

}

module.exports = boxController ;