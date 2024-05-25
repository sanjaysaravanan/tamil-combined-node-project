import mongoose from "mongoose";

const dbName = "tamil-combined";
const dbCluster = "localhost:27017";

const localUri = `mongodb://${dbCluster}/${dbName}`;

const mongooseConnect = async () => {
  try {
    await mongoose.connect(localUri);
    console.log("Mongoose Connection established");
  } catch (e) {
    console.log("Mongoose Connection error: " + e.message);
    process.exit(1);
  }
};

export default mongooseConnect;
