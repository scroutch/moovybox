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
        .min(1),
    });

const boxUpdateSchema = Joi.object({
    label: Joi.string()
        .alphanum()
        .max(150)
        .required(), 
    destination_room: Joi.string()
        .alphanum()
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
        .min(1)
    });

const boxController = {

    getUserBox: async(req,res) => {
        //* Find a send all the box from a user
        try {
            // At this stage, a middleware has checked user authorization. 
            const boxes = await Box.getAll(req); 

            res.send(boxes); 

        } catch (error) {
            console.trace(error);
        }
    },

    createBox: async (req, res) => {
        //* Create a new box in DB
        try {
            // Validate the data from the form
            const boxValidation = await newBoxSchema.validate(req.body); 

            // if no error found then create Box instance and insert data. 
            if (!boxValidation.error) {

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
        
        // Check form validity
        const boxValidation = await boxUpdateSchema.validate(req.body); 

        // if the form is valid, 
        if (!boxValidation.error) {
            // Check 
            // Retrieve the arguments

            // the false values to form if not sent 
            // (by default the client does not send unckeked box data)
            const boxAttributes = ['fragile', 'heavy', 'floor']; 

            // check in foprm data has boolean attributes 
            // if it does NOt then add them set to false
            for (attribute of boxAttributes) {
                if (!req.body.hasOwnProperty(attribute)) {
                    req.body[attribute] = false;  
                }
            }
            // move id from params
            // move infos from form body
            const boxId = req.params.id;
            
            // Execute request
            // const updatedBox = await Box.update(req, boxId); 

            // return the updated move
            // res.send((updatedBox) ? updatedBox : false); 
            res.send(req.body); 

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
                    
                    
                    // Retrieve box id from url
                    const boxId = req.params.id; 
                    
                    // Request deletion from DB with move id
                    const success = await Box.delete(boxId); 

                    // return : boolean
                    // true : deletion ok
                    // false : deletion didn't work
                    res.send(success);
                } catch (error) {
                    console.trace(error);
                }

    }

}

module.exports = boxController ;