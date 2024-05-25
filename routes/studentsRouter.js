// students apis with DB connection

import express from "express";
import { db } from "../db-utils/mongo-connection.js";

const studentDBRouter = express.Router();

studentDBRouter.get("/", async (req, res) => {
  try {
    const collection = db.collection("students");

    const data = await collection.find({}).toArray();

    res.send(data);
  } catch (err) {
    res
      .status(500)
      .send({ msg: "Something went wrong, Please try again later" });
  }
});

// Inserting a new student into the DB
studentDBRouter.post("/", async (req, res) => {
  const { body } = req;

  const collection = db.collection("students");

  await collection.insertOne({
    ...body,
    id: Date.now().toString(),
    teacherId: null,
  });

  res.send({ msg: "Insert Student Success" });
});

studentDBRouter.put("/:studentId", async (req, res) => {
  const { studentId } = req.params;

  const { body } = req;
  if (Object.keys(body).length > 0) {
    await db
      .collection("students")
      .updateOne({ id: studentId }, { $set: { ...body, id: studentId } });

    res.send({ msg: "Updated Student Successfully" });
  } else {
    res.status(400).send({ msg: "Please Enter a Student Data" });
  }
});

studentDBRouter.delete("/:studentId", async (req, res) => {
  const { studentId } = req.params;

  const stuObj = await db.collection("students").findOne({ id: studentId });

  if (stuObj) {
    await db.collection("students").deleteOne({ id: studentId });

    res.send({ msg: "Deleted Student Successfully" });
  } else {
    res.status(404).send({ msg: "Student Not Found" });
  }
});

export default studentDBRouter;
