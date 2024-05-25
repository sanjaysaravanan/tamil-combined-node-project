import { MongoClient } from "mongodb";

// Mongo Running URI
const dbCluster = "127.0.0.1:27017";

const dbName = "tamil-combined";

const localUri = `mongodb://${dbCluster}/${dbName}`;

const client = new MongoClient(localUri);

const db = client.db(dbName);

const connectToDb = async () => {
  try {
    await client.connect();
    console.log("DB Connected Successfully");
  } catch (err) {
    console.log("Error Connecting to MongoDB", err);
    process.exit(1);
  }
};

export { db };

export default connectToDb;
