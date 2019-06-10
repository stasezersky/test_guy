const { MongoClient } = require('mongodb');

// write msg to mongo at "url" to db at "dbName" to collection "collectionName"
async function writeToMongo(msg, url, dbName, collectionName) {
    let client;
    try {
        client = await MongoClient.connect(url, {useNewUrlParser: true});
        const db = await client.db(dbName);
        const response = await db.collection(collectionName).insertOne(msg);
        client.close();
        return response;
    } catch (error) {
        console.log(error);
        return;
    }
}
// generate message {cDate: ISODate, numberWhoDied: int}
function generateMessage(id){
    return {cDate: new Date(), numberWhoDied: id}
}

module.exports = { writeToMongo, generateMessage }

// writeToCollection({cDate: new Date(), numberWhoDied: 1}, url, dbName, logs_collection, daily_logs_collection)


