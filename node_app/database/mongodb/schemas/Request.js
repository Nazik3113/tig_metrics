import { Schema, model } from "mongoose";
import "../connection.js";

const RequestsSchema = new Schema({
    inserted_date: { 
        type: Date, 
        default: Date.now,
        require: true
    }
});

export default model("Requests", RequestsSchema);