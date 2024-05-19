import express from "express";

const server = express();

server.get("/", (req, res) => {
  // res.send("<h1>Welcome Tamil Combined Batches!</h1>");
  res.send({ message: "Hello world" });
});

const port = 8000;

server.listen(port, () => {
  console.log(Date().toString(), "server listening on port " + port);
});
