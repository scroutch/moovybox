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

    static async getById(req) {
        // Method to retrieve a box if it matches with current user id and send them to client

        const query = `SELECT * FROM "box" WHERE user_id = $1 AND "id" = $2;`; 

        const values = [req.session.user.id, req.body.box_id]; 

        const results = await client.query(query, values); 

        return results.rows[0]; 
    }

    static async getByIdWithContent(req) {
        // Method to retrieve a box if it matches with current user id and send them to client

        const query = `SELECT * FROM "box" 
        JOIN "item" ON "item".box_id = box.id 
        WHERE box.user_id = $1 AND box."id" = $2;`; 

        const values = [req.session.user.id, req.body.box_id]; 

        const results = await client.query(query, values); 

        return results.rows[0]; 
    }

    static async getAll(req) {
        // Method to retrieve all user box and send them to client

        const query = `SELECT * FROM "box" WHERE user_id = $1;`; 

        const values = [req.session.user.id]; 

        const results = await client.query(query, values); 

        return results.rows; 
    }

    static async getAllFromMove(req) {
        // Method to retrieve all user boxes from one specific move and send them to client

        const query = `SELECT * FROM "box" WHERE user_id = $1 AND move_id = $2;`; 

        const values = [req.session.user.id, req.params.id]; 

        const results = await client.query(query, values); 

        return results.rows; 
    }

    static async boxLabelExists (req) {
        //* Check the existence of the entred box in the DB
        try {
            // request to find an associated user
            const query = `SELECT * FROM "box" WHERE "label" = $1 AND move_id = $2 AND user_id = $3 `; 
            const results = await client.query(query, [req.body.label, , req.body.move_id, req.session.user.id]); 
            
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

    static async update(req, boxId) {
        
        try {
            // Prepare the query
            const query = `UPDATE "box" SET ("label", "destination_room", "fragile", "heavy", "floor") = ($1, $2, $3::boolean, $4::boolean, $5::boolean) WHERE "id" = $6 AND "user_id" = $7 RETURNING *;`;
            
            // Set the involved data
            const data = req.body; 
            const values = [data.label, data.destination_room, data.fragile.toString(), data.heavy.toString(), data.floor.toString(), boxId, req.session.user.id]; 
            
            // Query update to DB 
            const result = await client.query(query, values); 

            console.log("Box.update result", result); 
        
            //return the updated move
            return result.rows[0]; 
        } catch (error) {
            console.trace(error);
        }
    }

    static async delete(boxId) {

        try {
            // Select a box 
            const query = `DELETE FROM "box" WHERE "id"= $1 AND user_id = $2;`; 

            // Delete the box
            const result = await client.query(query, [boxId, req.session.user.id]);

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