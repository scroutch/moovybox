const client = require('../db_client');
const bcrypt = require('bcrypt');
const salt = parseInt(process.env.SALT, 10);

class User {

    constructor(obj){
        this.id = obj.id; 
        this.pseudo = obj.pseudo; 
        this.email = obj.email; 
        this.password = obj.password; 
    }

    static async emailExists (email) {
        //* Check the existence of the entred email in the DB
        try {
            // request to find an associated user
            const query = `SELECT * FROM "user" WHERE "email" = $1`; 
            const results = await client.query(query, [email]); 
            
            // Returns a boolean 
            // - true : mail exists
            // - false : mail does not exist
            return !!results.rowCount; 
        } catch (error) {
            return console.trace(error); 
        }
    }

    static async findByEmail(email) {
        try {
            // prepare de query 
            const query = `SELECT * FROM "user" WHERE email = $1`; 
            const values = [email]; 
            // make query to DB 

            const results = await client.query(query, values); 
            // check answer
                // If one found return value 
                // Esle return error "ressource not found" 401

               // console.log(results); 
            return results.rows[0]; 
            
        } catch (error) {
            console.trace(error);
        }
    }

    async insert() {
        //* Save user in DB 
        try {
            // request to find an associated user
            const query = `INSERT INTO "user" (pseudo, email, password) VALUES ($1, $2, $3) RETURNING *`; 
            // Hashes the password to insert in DB
            const hashedPassword = await bcrypt.hash(this.password, salt); 
            // value table setting
            const values = [this.pseudo, this.email, hashedPassword]; 

            const results = await client.query(query, values); 
            console.log("insert results",results);
            // Returns a boolean 
            // - true : mail exists
            // - false : mail does not exist
            return results.rows[0]; 
        } catch (error) {
            return console.trace(error); 
        }
    }
}; 

module.exports = User; 