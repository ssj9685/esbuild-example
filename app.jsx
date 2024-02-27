import React from "react";

function App() {
  return (
    <html>
      <head></head>
      <body>
        <h1
          onClick={() => {
            console.log("test");
          }}
        >
          Hello, world!
        </h1>
      </body>
    </html>
  );
}

export default App;
