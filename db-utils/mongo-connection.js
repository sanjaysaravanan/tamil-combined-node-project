import { MongoClient } from "mongodb";

import dotenv from "dotenv";

dotenv.config();

// Mongo Running URI
const dbCluster = process.env.DB_CLUSTER || "localhost:27017";
const dbName = process.env.DB_NAME || "";
const dbUserName = process.env.DB_USER || "";
const dbPassword = process.env.DB_PASSWORD || "";

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
