const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {
    constructor() {
        this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true });
        this.dbName = DB_NAME;
    }

    connect() {
        if (!MongoLib.connection) {
            MongoLib.connection = new Promise((resolve, reject) => {
                this.client.connect(err => {
                    if (err) {
                        reject(err);
                    }
                    resolve(this.client.db(this.dbName));
                })
            })
        }
        return MongoLib.connection;
    }

    createUser(collection, data) {
        return this.connect().then(db => {
            return db.collection(collection).insertOne(data);
        }).then(result => result.insertedId);
    }

    getUser(collection, id) {
        return this.connect().then(db => {
            return db.collection(collection).findOne({ _id: ObjectId(id)});
        });
    }

    updateUser(collection, id, data) {
        return this.connect().then(db => {
            return db.collection(collection).updateOne({ _id: ObjectId(id)}, { $set: data }, { upsert: true });
        }).then(result => result.upsertedId || id);
    }

    updateByEmail(collection, obj) {
        return this.connect().then(db => {
            return db.collection(collection).updateOne({ email: obj.email}, { $set: obj }, { upsert: true });
        }).then(result => result.upsertedId);
    }

    getUserByEmail(collection, email) {
        return this.connect().then(db => {
            return db.collection(collection).findOne({ mail: email});
        });
    }

    getFavoriteDogByEmailUser(collection, email) {
        return this.connect().then(db => {
            return db.collection(collection).findOne({ email: email});
        });
    }
    
}

module.exports = MongoLib;