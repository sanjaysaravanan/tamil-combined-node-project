import express from "express";

import { teachers } from "./local-variable.js";

const teacherRouter = express.Router();

// /teachers get all the teachers
teacherRouter.get("/", (req, res) => {
  res.send(teachers);
});

teacherRouter.post("/", (req, res) => {
  const { body } = req;

  teachers.push({
    id: Date.now().toString(),
    ...body,
  });

  res.send({ msg: "Teacher Created Successfully" });
});

teacherRouter.put("/:teacherId", (req, res) => {
  const { teacherId } = req.params;
  const { body } = req;

  const index = teachers.findIndex((t) => t.id === teacherId);

  teachers[index] = {
    ...body,
    id: teacherId,
  };

  res.send({ msg: "Teacher Updated Successfully" });
});

teacherRouter.delete("/:teacherId", (req, res) => {
  const { teacherId } = req.params;

  teachers = teachers.filter((teacher) => teacher.id !== teacherId);

  res.send({ msg: "Teacher Deleted Successfully" });
});

export default teacherRouter;
