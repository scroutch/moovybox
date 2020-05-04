const client = require('../db_client');

class Move {

    constructor(obj) {
        this.label = obj.label; 
        this.date = obj.date; 
        this.address = obj.address; 
    }

    static async getAll(req) {
        // Method to retrieve all user moves and send them to client

        const query = `SELECT * FROM "move" WHERE user_id = $1;`; 

        const values = [req.session.user.id]; 

        const results = await client.query(query, values); 

        return results.rows; 
    }

    static async labelExists (req) {
        //* Check the existence of the entred email in the DB
        try {
            // request to find an associated user
            const query = `SELECT * FROM "move" WHERE "label" = $1 AND user_id = $2`; 
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
        // Insert a move in DB 
        // expected (label, date, adress and user id); 
        // user id to get from session. 
        try {
            
            const query = `INSERT INTO "move" (label, date, address, user_id) VALUES ($1, $2, $3, $4) RETURNING *`; 
    
            const values = [this.label, this.date, this.address, req.session.user.id]; 
    
            const results = await client.query(query, values); 
    
            return results.rows[0]; 
        } catch (error) {
            console.trace(error);
        }
    }

    static async update(req, moveId) {
        
        try {
            // Prepare the query
            const query = `UPDATE "move" SET ("label", "date", "address") = ($1, $2, $3) WHERE "id" = $4 AND "user_id" = $5 RETURNING * ;`;
            
            // Set the involved data
            const data = req.body; 
            const values = [data.label, data.date, data.address, moveId, req.session.user.id]; 
            
            // Query update to DB 
            const result = await client.query(query, values); 
        
            //return the updated move
            return result.rows[0]; 
        } catch (error) {
            console.trace(error);
        }
    }

    static async delete(req, moveId) {

        try {
            // Select a move 
            const query = `DELETE FROM "move" WHERE "id"= $1 AND user_id = $2;`; 

            // Delete the move
            const result = await client.query(query, [moveId, req.session.user.id]);

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

module.exports = Move; 