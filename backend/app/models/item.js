const client = require('../db_client');

class Item {

    constructor(obj) {
        this.name = obj.name;
        this.box_id = obj.box_id; 
       
    }

    static async getByPk(itemId) {
        // Method to retrieve all user item and send them to client

        const query = `SELECT * FROM "item" WHERE id = $1;`; 

        const values = [itemId]; 

        const results = await client.query(query, values); 

        return results.rows[0]; 
    }

    static async getAllInBox(req, boxId) {
        // Method to retrieve all user item and send them to client

        const query = `SELECT * FROM "item" WHERE user_id = $1 AND box_id = $2;`; 

        const values = [req.session.user.id, boxId]; 

        const results = await client.query(query, values); 

        return results.rows; 
    }

    static async itemNameExists (req) {
        //* Check the existence of the entred box in the DB
        try {
            // request to find an associated user
            const query = `SELECT * FROM "item" WHERE "name" = $1 AND user_id = $2 AND box_id=$3;`; 
            const results = await client.query(query, [req.body.name, req.session.user.id, req.body.box_id]); 
            
            // Returns a boolean 
            // - true : name exists
            // - false : name does not exist
            return !!results.rowCount; 
        } catch (error) {
            return console.trace(error); 
        }
    }

    async insert(req) {
        // Insert a item in DB 
        // expected (label, date, adress and user id); 
        // user id to get from session. 
        try {
            
            const query = `INSERT INTO "item" (name, user_id, box_id) VALUES ($1, $2, $3) RETURNING *`; 
    
            const values = [ this.name, req.session.user.id, this.box_id]; 
    
            const results = await client.query(query, values); 
    
            return results.rows[0]; 
        } catch (error) {
            console.trace(error);
        }
    }

    static async delete(req, itemId) {

        try {
            // Select a item 
            const query = `DELETE FROM "item" WHERE "id"= $1 AND user_id = $2;`; 

            // Delete the item
            const result = await client.query(query, [itemId, req.session.user.id]);

            //console.log('result :>> ', result);

            // return boolean
            // true : delete ok
            // false : delete failed
            return !!result.rowCount; 
        } catch (error) {
            console.trace(error);
        }
    }
};

module.exports = Item; 