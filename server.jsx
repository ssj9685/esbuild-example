import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import App from "./app.jsx";

const http = require("http");

const server = http.createServer(async (req, res) => {
  const stream = renderToPipeableStream(<App />, {
    bootstrapScripts: ["/main.js"],
  });

  res.setHeader("content-type", "text/html");
  stream.pipe(res);
});

server.listen(3000);
