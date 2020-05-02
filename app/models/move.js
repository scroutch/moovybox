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
};

module.exports = Move; 