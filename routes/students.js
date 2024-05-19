import express from "express";

import { students } from "./local-variable.js";

const studentRouter = express.Router();

// get all students
studentRouter.get("/", (req, res) => {
  res.send({ students });
  // res.send(students);
});

// Create a new student
studentRouter.post("/", (req, res) => {
  const { body } = req;

  students.push({ id: Date.now().toString(), ...body });

  res.send({ msg: "Created student Successfully" });
});

// Updating a Student
// We need the id of the student to be updated
studentRouter.put("/:studentId", (req, res) => {
  const { studentId } = req.params;

  const { body } = req;
  if (Object.keys(body).length > 0) {
    const index = students.findIndex((stu) => stu.id === studentId);

    students[index] = { ...body, id: studentId };

    res.send({ msg: "Updated Student Successfully" });
  } else {
    res.status(400).send({ msg: "Please Enter a Student Data" });
  }
});

studentRouter.delete("/:studentId", (req, res) => {
  const { studentId } = req.params;

  if (students.filter((stu) => stu.id === studentId).length > 0) {
    students = students.filter((stu) => stu.id !== studentId);

    res.send({ msg: "Student Deleted successfully" });
  } else {
    res.status(404).send({ msg: "Student Not Found" });
  }
});

export default studentRouter;
