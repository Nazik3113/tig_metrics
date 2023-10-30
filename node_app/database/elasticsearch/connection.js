import { Client } from "@elastic/elasticsearch";

function _connect() {
    try {
        const client = new Client({
            node: 'http://elasticsearch:9200',
            auth: {
                username: '123456',
                password: '123456'
            },
            tls: {
                rejectUnauthorized: false
            }
        });       

        client.ping()
            .then(() => {
                console.log("Elasticsearch connection successful.");
            }).catch((error) => {
                console.log("Error connecting to Elasticsearch: ", error);
            });

        return client;
    } catch (error) {
        console.log("Error connecting to Elasticsearch: ", error);
        return _connect();
    }
}

export default _connect();