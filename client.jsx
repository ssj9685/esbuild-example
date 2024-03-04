import { hydrateRoot } from "react-dom/client";
import { parseJSX } from "./util.js";

hydrateRoot(
  document,
  JSON.parse(window.__INITIAL_CLIENT_JSX_STRING__, parseJSX)
);
