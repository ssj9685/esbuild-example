import { hydrateRoot } from "react-dom/client";
import { parseJSX } from "./util.js";

hydrateRoot(
  document,
  JSON.parse(window.__INITIAL_CLIENT_JSX_STRING__, parseJSX)
);

let currentPathname = window.location.pathname;

async function navigate(pathname) {
  currentPathname = pathname;
  const clientJSX = await fetchClientJSX(pathname);
  if (pathname === currentPathname) {
    root.render(clientJSX);
  }
}

async function fetchClientJSX(pathname) {
  const response = await fetch(pathname + "?jsx");
  const clientJSXString = await response.text();
  const clientJSX = JSON.parse(clientJSXString, parseJSX);
  return clientJSX;
}
