import { MongoClient } from "mongodb";

// Mongo Running URI
// const dbCluster = "127.0.0.1:27017";
const dbCluster = "cluster0.ruapl1v.mongodb.net";
const dbName = "tamil-combined";
const dbUserName = "sanjaysaravanan1997";
const dbPassword = "8JMtgqJdaf7R0WLm";

const localUri = `mongodb://${dbCluster}/${dbName}`;

const cloudUri = `mongodb+srv://${dbUserName}:${dbPassword}@${dbCluster}/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

// const client = new MongoClient(localUri);
const client = new MongoClient(cloudUri);

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
