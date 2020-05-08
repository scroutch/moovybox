const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const Box = require('../models/box');
const Item = require('../models/item');



const newItemSchema = Joi.object({
    name: Joi.string()
        .pattern(new RegExp('^[^<>%]{3,}$')) 
        .min(3)
        .max(150)
        .required(),
    box_id: Joi.number().integer()
        .min(1), 
   });

const itemController = {

    getBoxItems: async (req,res) => {
        //* Find a send all the item from a user
        try {
            // At this stage, a middleware has checked user authorization. 

            // Get box id  from params
            const boxId = req.params.id; 

            // Retrieve the box from DB populated with items
            const items = await Item.getAllInBox(req, boxId); 

            let matchedOwnerMove; 

            res.send(items);

        } catch (error) {
            console.trace(error);
        }
    },

    createItem: async (req, res) => {
        //* Create a new box in DB
        try {

            // Make sure the destination box belongs to a move owned by the current user
            // Get the destination box that matches current user id
            const destinationBox = await Box.getByPk(req, req.body.box_id); 

            // If a destinationBox (same id and owned by the current user) dosen't 
            if (!destinationBox) {
                // abort operation and send a error to client
                return res.status(400).send({ // Bad request : client should send different data 
                    error : {
                        statusCode: 400,
                        message: {
                            en:"This box doesn't exists or doesn't belong to the current user", 
                            fr:"Ce carton n'existe pas ou n'appartient pas à l'utilisateur actuel"
                        }
                    }
                });
            }

            // get from users move any who matche the requested destination box
            const match = req.session.user.moves.filter(moveObj => moveObj.id == destinationBox.move_id); 

            // If none matches 
            if (!match.length) {
                // abort operation and send a error to client
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
            const itemValidation = await newItemSchema.validate(req.body); 

            // if no error found then create item instance and insert data. 
            if (!itemValidation.error) {

                //Compare the name field with the DB values
                const itemNameMatch = await Item.itemNameExists(req); 
                console.log("itemNameMatch :>>", itemNameMatch);
 
                //If the name is the same of the DB value of the same user
                if (itemNameMatch){
                    // send a error to client
                    res.status(409).send({//409 : Conflict
                        error : {
                            statusCode: 409,
                            message: {
                                en:"This name already exists in this box", 
                                fr:"Ce nom existe déjà dans cette boîte"
                            }
                        }
                    });
                                
                } else {
                    // Else, we move on with the request

                    // create an instance of a item
                    const newItem = new Item(req.body); 
                    console.log('newItem :>> ', newItem);

                    // Save the current item object to DB
                    /// zkdjfzf Item.insert(req)
                    const storedItem = await newItem.insert(req); 

                    // Send the newly added item entry to client
                    res.send(storedItem);        
                }

            } else {
                // if an error is found, update status code (400 for bad request)and send the error details
                res.status(400).send(itemValidation.error.details); 
            }
    
        } catch (error) {
            console.trace(error);
        }
    }, 

    deleteItem: async (req, res) => {
        //* Delete a item from DB matching user id
        // At this stage user IS authentified (authCheckerMW.js)
                try {
                    // Retrieve item id from url
                    const itemId = req.params.id; 

                    // Retrieve the item pointed for deletion
                    const storedItem = await Item.getByPk(itemId); 

                    // Retrieve the box container of storedItem obj

                    console.log("req.session.user.id",req.session.user.id); 
                    console.log("deleteItem storedItem",storedItem); 
                    console.log("deleteItem storedItem.box_id",storedItem.box_id); 

                    const storedBox = await Box.getByPk(req, storedItem.box_id); 
                    
                    console.log("deleteItem storedItem",storedItem); 
                    console.log("deleteItem storedBox", storedBox); 

                    //If no matching box was found
                    if (!storedBox) {
                         // abort operation and send a error to client
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

                    // If a matching box is found for the pointed item 
                    // Check if the move_id from the box is related to one of the user move 
                    const matchedMove = req.session.user.moves.filter(moveObj => moveObj.id == storedBox.move_id); 
                    

                    // If the box doesn't belong to any of the user moves
                    if (!matchedMove.length) {
                        // abort operation and send a error to client
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
                    
                    // Request deletion from DB with item id
                    const success = await Item.delete(req, itemId); 

                    // return : boolean
                    // true : deletion ok
                    // false : deletion didn't work
                    res.send(success);
                } catch (error) {
                    console.trace(error);
                }

    }

}

module.exports = itemController;