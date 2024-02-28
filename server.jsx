import React, { Suspense } from "react";
import { renderToPipeableStream } from "react-dom/server";
import App from "./app.jsx";
import { createReadStream } from "fs";
import { createServer } from "http";

const server = createServer(async (req, res) => {
  if (req.url !== "/") {
    try {
      const stream = createReadStream(`.${req.url}`);
      stream.pipe(res);
    } catch (e) {
      res.end();
    }

    return;
  }

  const stream = renderToPipeableStream(<App />, {
    bootstrapScripts: ["client.js"],
  });

  res.setHeader("content-type", "text/html");
  stream.pipe(res);
});

server.listen(8080);
