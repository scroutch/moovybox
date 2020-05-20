const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const Box = require('../models/box');
const Item = require('../models/item');


const itemSchema = Joi.object({
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
            
            // get box id  from params
            const boxId = req.params.id; 
            
            const storedBox = await Box.getByPk(boxId); 
            
            if (!storedBox) {
                return res.status(404).send({
                    error : {
                        statusCode: 404,
                        message: {
                            en:"Not found - This box doesn't exists", 
                            fr:"Pas trouvé - Ce carton n'existe pas"
                        }
                    }
                });
            }
            
            // A box was found !
            
            const move = req.session.user.moves.filter(moveObj => moveObj.id == storedBox.move_id); 
            
            // If the pointed move doesn't belong to current user
            if (!move.length) {
                // prevent action and send an error
                return res.status(403).send({
                    error : {
                        statusCode: 403,
                        message: {
                            en:"Forbidden action - Pointed box doesn't belong to the current user", 
                            fr:"Action interdite - Le carton concerné n'appartient pas à l'utilisateur actuel"
                        }
                    }
                });
            }
            
            // User is authorized to perform operation on pointed box ! 
            
            // retreive Items connected to box id
            const items = await Item.getAllInBox(storedBox.id); 
            
            res.send(items); 
            
        } catch (error) {
            console.trace(error);
        }
    },
    
    createItem: async (req, res) => {
        //* Create a new item in a box in DB
        try {
            // Validate the data from the form
            const itemValidation = await itemSchema.validate(req.body); 
            
            // if an error is found,
            if (!!itemValidation.error) {
                // update status code (400 for bad request)and send the error details
                res.status(400).send(itemValidation.error); 
            }
            // Form is valid !
            
            const storedBox = await Box.getByPk(req.body.box_id); 
            
            // If no box was found 
            if (!storedBox) {
                // Abort and send error : 404 not found
                return res.status(404).send({
                    error : {
                        statusCode: 404,
                        message: {
                            en:"Not found - This box doesn't exists", 
                            fr:"Pas trouvé - Ce carton n'existe pas"
                        }
                    }
                });
            }
            
            // A box was found !
            
            // If the pointed box doesn't belong to current user
            if (req.session.user.id !== storedBox.user_id) {
                // prevent action and send an error
                return res.status(403).send({
                    error : {
                        statusCode: 403,
                        message: {
                            en:"Forbidden action - Pointed box doesn't belong to the current user", 
                            fr:"Action interdite - Le carton concerné n'appartient pas à l'utilisateur actuel"
                        }
                    }
                });
            }
            
            // User is authorized to perform operation on pointed box ! 
            
            //append user_id to form body
            req.body.user_id = req.session.user.id;
            
            // Check if the item name is available in the destination box
            const itemNameMatch = await Item.itemNameExistsInBox(req.body); 
            
            console.log("itemNameMatch :>>", itemNameMatch);
            
            //If the name already exists inbox 
            if (itemNameMatch){
                // abort and send error : 409 conflict
                return res.status(409).send({
                    error : {
                        statusCode: 409,
                        message: {
                            en:"This item already exists in the destination box.", 
                            fr:"Cet objet existe déjà dans ce carton."
                        }
                    }
                });
                
            } 
            
            // The item name is available in the destination box !
            
            // create an instance of a item
            const newItem = new Item(req.body); 
            console.log('newItem :>> ', newItem);
            
            // Save the current item object to DB
            // Item.insert()
            const storedItem = await newItem.insert(); 
            
            // Send the newly added item entry to client
            res.send(storedItem);        
            
            
        } catch (error) {
            console.trace(error);
        }
    }, 

    updateItem: async (req, res) => {
        //* Update an item in DB
        try {
            // Validate the data from the form
            const itemValidation = await itemSchema.validate(req.body); 
            
            // if an error is found,
            if (!!itemValidation.error) {
                // update status code (400 for bad request)and send the error details
                res.status(400).send(itemValidation.error); 
            }

            // Form is valid !
            
            const storedItem = await Item.getByPk(req.params.id); 
            
            // If no box was found 
            if (!storedItem) {
                // Abort and send error : 404 not found
                return res.status(404).send({
                    error : {
                        statusCode: 404,
                        message: {
                            en:"Not found - This item doesn't exists", 
                            fr:"Pas trouvé - Cet objet n'existe pas"
                        }
                    }
                });
            }
            
            // A box was found !
            
            // If the pointed box doesn't belong to current user
            if (req.session.user.id !== storedItem.user_id) {
                // prevent action and send an error
                return res.status(403).send({
                    error : {
                        statusCode: 403,
                        message: {
                            en:"Forbidden action - Pointed box doesn't belong to the current user", 
                            fr:"Action interdite - Le carton concerné n'appartient pas à l'utilisateur actuel"
                        }
                    }
                });
            }
            
            // User is authorized to perform operation on pointed box ! 

            const storedBox = await Box.getByPk(req.body.box_id); 
            
            // If no box was found 
            if (!storedBox) {
                // Abort and send error : 404 not found
                return res.status(404).send({
                    error : {
                        statusCode: 404,
                        message: {
                            en:"Not found - The pointed box doesn't exists", 
                            fr:"Pas trouvé - Le carton concerné par la requête n'existe pas"
                        }
                    }
                });
            }
            
            // A box was found !
            
            // If the pointed box doesn't belong to current user
            if (req.session.user.id !== storedBox.user_id) {
                // prevent action and send an error
                return res.status(403).send({
                    error : {
                        statusCode: 403,
                        message: {
                            en:"Forbidden action - Pointed box doesn't belong to the current user", 
                            fr:"Action interdite - Le carton concerné n'appartient pas à l'utilisateur actuel"
                        }
                    }
                });
            }
            
            // User is authorized to perform operation on pointed box ! 
            
            //append user_id to form body
            req.body.user_id = req.session.user.id;
            
            // Check if the item name is available in the destination box
            const itemNameMatch = await Item.itemNameExistsInBox(req.body); 
            
            console.log("itemNameMatch :>>", itemNameMatch);
            
            //If the name already exists inbox 
            if (itemNameMatch){
                // abort and send error : 409 conflict
                return res.status(409).send({
                    error : {
                        statusCode: 409,
                        message: {
                            en:"This item already exists in the destination box.", 
                            fr:"Cet objet existe déjà dans ce carton."
                        }
                    }
                });
                
            } 
            
            // The item name is available in the destination box !
            

            // Update storedItem values prior to update
            for (const prop in req.body) {
                storedItem[prop] = req.body[prop]; 
            }

            // create an instance of a item
            const updatedItem = await storedItem.update(); 
            console.log('updatedItem :>> ', updatedItem);

            res.send(updatedItem);         
              
        } catch (error) {
            console.trace(error);
        }
    }, 
    
    /** Markpage */
    deleteItem: async (req, res) => {
        //* Delete a item from DB matching user id
        // At this stage user IS authentified (authCheckerMW.js)
        try {
            
            // Retrieve item id from url
            const itemId = req.params.id; 
            
            const storedItem = await Item.getByPk(req.params.id); 

            // If no box was found 
            if (!storedItem) {
                // Abort and send error : 404 not found
                return res.status(404).send({
                    error : {
                        statusCode: 404,
                        message: {
                            en:"Not found - This item doesn't exists", 
                            fr:"Pas trouvé - Cet objet n'existe pas"
                        }
                    }
                });
            }
            
            // If the pointed box doesn't belong to current user
            if (req.session.user.id !== storedItem.user_id) {
                // prevent action and send an error
                return res.status(403).send({
                    error : {
                        statusCode: 403,
                        message: {
                            en:"Forbidden action - Pointed item doesn't belong to the current user", 
                            fr:"Action interdite - L'objet concerné n'appartient pas à l'utilisateur actuel"
                        }
                    }
                });
            }
            
            // User is authorized to perform operation on pointed box ! 
            

            
            // Request deletion from DB
            const success = await storedItem.delete(); 
            
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