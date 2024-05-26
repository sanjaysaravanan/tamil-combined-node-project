import mongoose from "mongoose";

const dbCluster = process.env.DB_CLUSTER || "localhost:27017";
const dbName = process.env.DB_NAME || "";
const dbUserName = process.env.DB_USER || "";
const dbPassword = process.env.DB_PASSWORD || "";

const localUri = `mongodb://${dbCluster}/${dbName}`;

const cloudUri = `mongodb+srv://${dbUserName}:${dbPassword}@${dbCluster}/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

const mongooseConnect = async () => {
  try {
    // await mongoose.connect(localUri);
    await mongoose.connect(cloudUri);
    console.log("Mongoose Connection established");
  } catch (e) {
    console.log("Mongoose Connection error: " + e.message);
    process.exit(1);
  }
};

export default mongooseConnect;
