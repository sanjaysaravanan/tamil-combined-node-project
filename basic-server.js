import http from "http";

// Creating a basic server
const server = http.createServer((req, res) => {
  // res.end(
  //   "<b>Hello Tamiil Weekend batch!, I am a basic server using http an inbuilt NodeJs Package. I can also be used to create apis, Congrats You have styarted learning NodeJs API <b>development</b> in JS with API</b>"
  // );
  res.end(JSON.stringify({ message: "Hello World" }));
});

const port = 8000;

server.listen(port, () => {
  console.log(Date().toString(), "Server listening on", port);
});
