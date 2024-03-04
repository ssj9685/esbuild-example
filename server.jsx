import React from "react";
import { renderToString } from "react-dom/server";
import { createServer } from "http";
import { parseJSX, renderJSXToClientJSX, stringifyJSX } from "./util.js";
import { readFile } from "fs/promises";
import App from "./app.jsx";

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? "", `http://${req.headers.host}`);

  if (url.searchParams.has("jsx")) {
    const clientJSX = await renderJSXToClientJSX(<App slug={url.pathname} />);
    const clientJSXString = JSON.stringify(clientJSX, stringifyJSX);
    res.setHeader("Content-Type", "application/json");
    res.end(clientJSXString);

    return;
  }

  if (url.pathname === "/client.js") {
    try {
      const content = await readFile("./client.js", "utf8");
      res.setHeader("Content-Type", "text/javascript");
      res.end(content);
    } catch (e) {
      res.statusCode = 500;
      res.end();
    }

    return;
  }

  const call = url.pathname === "/" ? "/test" : url.pathname;
  const response = await fetch(`http://localhost:3000${call}?jsx`);

  if (!response.ok) {
    res.statusCode = response.status;
    res.end();
    return;
  }

  const clientJSXString = await response.text();

  const clientJSX = JSON.parse(clientJSXString, parseJSX);
  let html = renderToString(clientJSX);
  html += `<script>window.__INITIAL_CLIENT_JSX_STRING__ = `;
  html += JSON.stringify(clientJSXString);
  html += `</script>`;
  html += `<script type="module" src="/client.js"></script>`;
  res.setHeader("Content-Type", "text/html");
  res.end(html);
});

server.listen(3000);
