import connection from "../connection.js";

const INDEX_NAME = "requests";

async function _create() {
    try {
        if (await connection.indices.exists({index: INDEX_NAME})) {
            console.log("Index 'requests' already exists");
        } else {
            await connection.indices.create({ index: INDEX_NAME}).then(() => {
                console.log("Index 'requests' created successfully");
            }).catch((error) => {
                console.log("Error creating index: ", error);
            });
        }       
    } catch (error) {
        console.log("Error creating index: ", error);
        
        setTimeout(() => {
            console.log("Create index retrying...");
            _create()
        }, 2000);
    }
}

_create();

export default INDEX_NAME;