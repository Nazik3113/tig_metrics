import express from "express";
import RequestModel from "./database/mongodb/schemas/Request.js";
import Connection from "./database/elasticsearch/connection.js";
import RequestIndex from "./database/elasticsearch/indexes/Request.js"
import StatsD from "hot-shots";
import os from "os";

const StatsDClient = new StatsD({
    port: 8125,
    host: "telegraf",
    prefix: "hsa103_node",
    globalTags: { env: process.env.NODE_ENV },
    errorHandler: (error) => {
        console.error(`StatsD error: ${error}.`);
    },
});
  
const app = express(); 
const PORT = 8076; 

setInterval(() => {
    StatsDClient.increment("free_memory", os.freemem());
    StatsDClient.increment("total_memory", os.totalmem());
}, 1000);

app.get("/", (req, res) => {
    StatsDClient.increment("requests");
    
    const requestModel = new RequestModel({
       inserted_date: Date.now() 
    });
    requestModel.save();

    Connection.index({
        index: RequestIndex,
        document: {
            inserted_date: Date.now()
        }
    });
    
    res.status(200);
    res.send({status: 1})
});
  
app.listen(PORT, (error) =>{ 
    if(!error) 
        console.log(`Server is Successfully Running, and App is listening on port ${PORT}`) 
    else 
        console.log("Error occurred, server can't start", error); 
    }
); 