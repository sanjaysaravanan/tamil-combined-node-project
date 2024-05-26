import mongoose from "mongoose";

/* mongodb+srv://sanjaysaravanan1997:8JMtgqJdaf7R0WLm@cluster0.ruapl1v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0 */

const dbName = "tamil-combined";
// const dbCluster = "127.0.0.1:27017";
const dbCluster = "cluster0.ruapl1v.mongodb.net";
const dbUserName = "sanjaysaravanan1997";
const dbPassword = "8JMtgqJdaf7R0WLm";

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
