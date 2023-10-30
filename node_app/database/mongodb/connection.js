import mongoose from "mongoose";

const DB_URL = "mongodb://hsa103:password@mongo:27017";

class Connection {
    constructor() {
        this._connect();
    }

    _connect() {
        mongoose.connect(DB_URL)
        .then(() => {
            console.log("MongoDB connection successful.");
        })
        .catch((error) => {
            console.log("Error connecting to MongoDB: ", error);
        });
    }
};

export default new Connection();