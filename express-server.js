import express from "express";

// import teacherRouter from "./routes/teachers.js";
import teacherRouter from "./routes/teachersRouter.js";
// import studentRouter from "./routes/students.js";
import studentDBRouter from "./routes/studentsRouter.js";
import todosRouter from "./routes/todos.js";
import connectToDb from "./db-utils/mongo-connection.js";
import mongooseConnect from "./db-utils/mongoose-connection.js";

const server = express();

await connectToDb();
await mongooseConnect();

server.use(express.json());

server.post("/files", () => {
  // logic to create a file as per the question
  res.send({});
});

server.get("/files", () => {
  // logic to get all the files in a directory
  res.send({});
});

server.get("/", (req, res) => {
  // res.send("<h1>Welcome Tamil Combined Batches!</h1>");
  res.send({ message: "Hello world" });
});

server.post("/", (req, res) => {
  const { body } = req;

  console.log("Request Body", body);

  res.send({ message: "Post Method Called" });
});

server.put("/", (req, res) => {
  const { body } = req;

  console.log("Request Body", body);

  res.send({ message: "Put Method Called" });
});

server.delete("/", (req, res) => {
  const { body } = req;

  console.log("Request Body", body);

  res.send({ message: "Delete Method Called" });
});

// Adding the Router for Teacher Endpoints/APIs
server.use("/teachers", teacherRouter);
server.use("/students", studentDBRouter);
server.use("/todos", todosRouter);

const port = 8000;

server.listen(port, () => {
  console.log(Date().toString(), "server listening on port " + port);
});
