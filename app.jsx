import React from "react";
import { readFile } from "fs/promises";
import Counter from "./Counter";

async function App({ slug }) {
  if (!slug.includes("test")) {
    return null;
  }

  const contents = await readFile(`.${slug}.txt`, "utf8");
  const handleTest = () => console.log("test");
  const path = slug === "/test" ? "./test2" : "./test";
  const page = slug === "/test" ? "second page" : "first page";

  return (
    <html>
      <head></head>
      <body>
        <h1 onClick={handleTest}>
          <a href={path}>go to {page}</a>
          <br />
          {contents}
          {/* <Counter /> */}
        </h1>
      </body>
    </html>
  );
}

export default App;
