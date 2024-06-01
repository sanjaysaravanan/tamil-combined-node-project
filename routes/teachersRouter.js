import express from "express";

import { teacherModel } from "../db-utils/models.js";

const teachersRouter = express.Router();

teachersRouter.get("/", async (req, res) => {
  try {
    const teachers = await teacherModel.find({});

    res.send(teachers);
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).send({ msg: "Something went wrong" });
  }
});

teachersRouter.post("/", async (req, res) => {
  const { body } = req;
  try {
    // Validates a payload for the teacher model
    const newTeacher = await new teacherModel({
      ...body,
      id: Date.now().toString(),
    });

    await newTeacher.save(); // validates and inserts the record

    res.send({ msg: "Teacher saved successfully" });
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).send({ msg: "Something went wrong" });
  }
});

const manualValidate = async (teacherObj) => {
  try {
    await new teacherModel(teacherObj).validate();
    return true;
  } catch (err) {
    return false;
  }
};

teachersRouter.put("/:teacherId", async (req, res) => {
  const { body } = req;
  const { teacherId } = req.params;
  try {
    const teacherObj = {
      ...body,
      id: teacherId,
    };

    // Validates a payload for the teacher model
    const isValid = await manualValidate(teacherObj); // validate manually

    if (isValid) {
      await teacherModel.updateOne({ id: teacherId }, { $set: teacherObj });

      res.send({ msg: "Teacher saved successfully" });
    } else {
      res.status(400).send({ msg: "Please Check the Teacher Details" });
    }
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).send({ msg: "Something went wrong" });
  }
});

teachersRouter.delete("/:teacherId", async (req, res) => {
  const { teacherId } = req.params;
  try {
    console.log("Line 60");
    await teacherModel.deleteOne({ id: teacherId });
    res.send({ msg: "Teacher deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Something went wrong" });
  }
});

export default teachersRouter;
