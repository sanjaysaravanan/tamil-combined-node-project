import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

// import teacherRouter from "./routes/teachers.js";
import teacherRouter from "./routes/teachersRouter.js";
// import studentRouter from "./routes/students.js";
import studentDBRouter from "./routes/studentsRouter.js";
import todosRouter from "./routes/todos.js";
import connectToDb from "./db-utils/mongo-connection.js";
import mongooseConnect from "./db-utils/mongoose-connection.js";
import registerRouter from "./routes/auth/register.js";
import loginRouter from "./routes/auth/login.js";
import verifyUserRouter from "./routes/auth/verifyUser.js";

const server = express();

await connectToDb();
await mongooseConnect();

server.use(express.json());
server.use(cors());

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

const customMiddleware = (req, res, next) => {
  console.log(
    new Date().toString(),
    "Handling request for",
    req.method,
    req.originalUrl
  );

  next();
};

// usage for all apis
server.use(customMiddleware);

// middleware to authorize the apis
const authApi = (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    const data = jwt.verify(token, process.env.JWT_SECRET);

    if (data.role === "Teacher") {
      next();
    } else {
      throw new Error();
    }
  } catch (err) {
    console.log(err.message);
    // err
    res.status(403).send({ msg: "Unauthorized" });
  }
};

const authAllApi = (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    console.log(err.message);
    // err
    res.status(403).send({ msg: "Unauthorized" });
  }
};

// Adding the Router for Teacher Endpoints/APIs
server.use("/teachers", authApi, teacherRouter);
// usage for a particular router
// server.use("/teachers", customMiddleware, teacherRouter);
server.use("/students", authAllApi, studentDBRouter);
server.use("/verify-user", verifyUserRouter);
server.use("/todos", authAllApi, todosRouter);
server.use("/register", registerRouter);
server.use("/login", loginRouter);

const port = 8000;

server.listen(port, () => {
  console.log(Date().toString(), "server listening on port " + port);
});
