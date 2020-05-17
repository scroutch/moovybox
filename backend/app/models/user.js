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

    static async confirmUser(userId) {
        try {
            // 
            const query = `UPDATE "user" SET "confirmed"='true' WHERE "id"=$1 RETURNING *;`; 

            const result = await client.query(query, [userId]); 

            return result.rows[0]; 
            
        } catch (error) {
            return console.trace(error); 
        }
    }

    static async findByPk(req) {
        try {
            // prepare de query 
            const query = `SELECT * FROM "user" WHERE "id" = $1`; 
            const values = [req.session.user.id]; 
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

    static async identifyUser(req) {
        //* Check if the provided password matches the one in DB
        //* user id in current session
        try {
            // request to find an associated user
            const query = `SELECT * FROM "user" WHERE "id" = $1`; 
            const results = await client.query(query, [req.session.user.id]); 
            const user = results.rows[0]; 

            const passwordMatch = await bcrypt.compare(req.body.password, user.password); 
            // Returns a boolean 
            // - true : user id and password match
            // - false : user id and password don't match
            return !! passwordMatch; 
        } catch (error) {
            return console.trace(error); 
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

    static async saveEmail(obj) {
        //* Save user in DB 
        try {
            // request to find an associated user
            const query = `UPDATE "user" SET "email" = $1 WHERE "id" = $2;`; 
            // value table setting
            const values = [obj.new_email, obj.id]; 

            const results = await client.query(query, values); 
            console.log("update email results",results.rows[0]);
            // Returns a boolean 
            // - true : mail changed
            // - false : mail did not change
            return !!results.rowCount; 
        } catch (error) {
            return console.trace(error); 
        }
    }

    static async updatePseudo(req) {
        try {
            // request to find an associated user
            const query = `UPDATE "user" SET "pseudo" = $1 WHERE "id" = $2 RETURNING *`; 
            // value table setting
            const values = [req.body.pseudo, req.session.user.id]; 
            // launch query
            const results = await client.query(query, values); 
            console.log("update results", results.rows[0]);
            
            // Returns the user object
            return results.rows[0]; 
        } catch (error) {
            console.trace(error); 
        }
    }
}; 

module.exports = User; 