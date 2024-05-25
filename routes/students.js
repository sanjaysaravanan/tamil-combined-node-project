// Simple API with local memory

import express from "express";

import { students, teachers } from "./local-variable.js";

const studentRouter = express.Router();

// get all students
studentRouter.get("/", (req, res) => {
  const { teacherId } = req.query;

  if (teacherId) {
    res.send({
      students: students.filter((stu) => stu.teacherId === teacherId),
    });
  }

  res.send({ students });
  // res.send(students);
});

// Create a new student
studentRouter.post("/", (req, res) => {
  const { body } = req;

  students.push({ id: Date.now().toString(), teacherId: null, ...body });

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

// Assign a teacher to a student
studentRouter.patch("/assign-teacher/:studentId", (req, res) => {
  const { body } = req;

  const { teacherId } = body;
  const { studentId } = req.params;

  const stuObj = students.find((student) => student.id === studentId);
  const teacherObj = students.find((teacher) => teacher.id === teacherId);

  if (stuObj && teacherObj) {
    const index = students.findIndex((student) => student.id === studentId);
    const teacherIndex = teachers.findIndex(
      (teacher) => teacher.id === teacherId
    );

    students[index].teacherId = teacherId;
    teachers[teacherIndex].students = [
      ...teachers[teacherIndex].students,
      studentId,
    ];

    res.send({ msg: "Teacher Assignment Success!" });
  } else {
    res.status(400).send({ msg: "Please check student and teacher ids" });
  }
});

export default studentRouter;
