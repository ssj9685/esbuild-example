import r from"react";import{renderToPipeableStream as o}from"react-dom/server";import p from"./app.jsx";const m=require("http"),s=m.createServer(async(i,t)=>{const e=o(r.createElement(p,null),{bootstrapScripts:["/main.js"]});t.setHeader("content-type","text/html"),e.pipe(t)});s.listen(3e3);