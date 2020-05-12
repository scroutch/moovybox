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

            // get box id  from params
            const boxId = req.params.id; 

            const items = await Item.getAllInBox(req, boxId); 

            res.send(items); 

        } catch (error) {
            console.trace(error);
        }
    },

    createItem: async (req, res) => {
        //* Create a new box in DB
        try {
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
                    res.status(409).send({
                        error : {
                            statusCode: 409,
                            message: {
                                en:"This name already exists", 
                                fr:"Ce nom existe déjà"
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

                    console.log('itemId :>> ', itemId);
                    
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