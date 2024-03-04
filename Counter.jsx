import React from "react";
import { useState } from "react";

// TODO: How to use hooks?
function Counter() {
  let count;
  let setCount;

  try {
    const state = useState(0);
    count = state[0];
    setCount = state[1];
    console.log("test");
  } catch (e) {}

  return <div onClick={() => setCount((prev) => prev + 1)}>{count}</div>;
}

export default Counter;
