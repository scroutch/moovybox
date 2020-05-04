const client = require('../db_client');

class Box {

    constructor(obj) {
        this.label = obj.label; 
        this.destination_room = obj.destination_room;
        this.fragile = obj.fragile;
        this.heavy = obj.heavy;
        this.floor = obj.floor;
        this.move_id = obj.move_id;  
    }

    static async getAll(req) {
        // Method to retrieve all user box and send them to client

        const query = `SELECT * FROM "box" WHERE user_id = $1;`; 

        const values = [req.session.user.id]; 

        const results = await client.query(query, values); 

        return results.rows; 
    }

    static async boxLabelExists (req) {
        //* Check the existence of the entred box in the DB
        try {
            // request to find an associated user
            const query = `SELECT * FROM "box" WHERE "label" = $1 AND user_id = $2`; 
            const results = await client.query(query, [req.body.label, req.session.user.id]); 
            
            // Returns a boolean 
            // - true : label exists
            // - false : label does not exist
            return !!results.rowCount; 
        } catch (error) {
            return console.trace(error); 
        }
    }

    async insert(req) {
        // Insert a box in DB 
        // expected (label, date, adress and user id); 
        // user id to get from session. 
        try {
            
            const query = `INSERT INTO "box" (label, destination_room, fragile, heavy, floor, user_id, move_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`; 
    
            const values = [ this.label, this.destination_room, this.fragile, this.heavy, this.floor, req.session.user.id, this.move_id]; 
    
            const results = await client.query(query, values); 
    
            return results.rows[0]; 
        } catch (error) {
            console.trace(error);
        }
    }

    static async delete(boxId) {

        try {
            // Select a box 
            const query = `DELETE FROM "box" WHERE "id"= $1;`; 

            // Delete the box
            const result = await client.query(query, [boxId]);

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

module.exports = Box; 