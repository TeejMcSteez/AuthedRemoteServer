const { MongoClient } = require('mongodb');
const fs = require('fs');
const bcrypt = require('bcrypt');
require('dotenv').config();

/*
URI and Configuration example . . .
const uri = `mongodb://${MONGODB_HOST}:27017/?authMechanism=MONGODB-X509`; //27017 is the default port for mongodb
const options = {
    tls: true,
    tlsCertificateKeyFile: CLIENT_KEY_PATH,
    tlsCAFile: CA_PATH
};
*/ 

const COLLECTION = process.env.USER_DATABASE;

class AuthService {
    constructor(uri, options = {}) {
        this.uri = uri;
        this.options = options;
        this.client = null;
        this.db = null;
    }

    async connect() {
        if (this.client) return;

        try {
            this.client = new MongoClient(this.uri, this.options);
            await this.client.connect();
            console.log('Connected to MongoDB via TLS');
            this.db = this.client.db('AuthDatabase');
        } catch (error) {
            console.error(`Failed to connect to MongoDB with error: ${error}`);
            throw error;
        }
    }

    async validateUser(USERNAME, password) {
        if (!this.db) {
            throw new Error('Database not initialized. Call connect() first');
        }
        const trimmedUsername = USERNAME.trim();
        try {
            console.log('Searching for user . . .');
            const user = await this.db.collection(COLLECTION).findOne({username: trimmedUsername});
            console.log(`Returned: ${user.username}`);
            if (!user) {
                return {valid: false, reason: 'User does not exist'};
            }
            const isValid = bcrypt.compare(password, user.pwd);
            console.log(`Bcrypt verification: ${(await isValid).valueOf()}`);

            if (!isValid) {
                return {valid: false, reason: 'Invalid password.'};
            }

            return {valid: true, user};
        } catch (error) {
            console.error(`Error validating user: ${error.message}`);
            throw error;
        }
    }
    
    async close() {
        if (this.client) {
            await this.client.close();
            console.log("Connection Closed");
            this.client = null;
            this.db = null;
        }
    }
}

module.exports = AuthService;