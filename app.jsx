import React from "react";
import { readFile } from "fs/promises";

async function App() {
  const contents = await readFile("./test.txt", "utf8");

  return (
    <html>
      <head></head>
      <body>
        <h1
          onClick={() => {
            console.log("test");
          }}
        >
          {contents}
        </h1>
      </body>
    </html>
  );
}

export default App;
