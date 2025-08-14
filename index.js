import { timeWriter } from "./helper.js";

let myName = "Zakaria Za";
let nodeName = document.querySelector(".self-name").querySelector("h1");
timeWriter(nodeName, myName, 100);

let myDesc = "I am a Software Engineer specialized in AI and Data Science.";
let nodeDesc = document.querySelector(".self-description").querySelector("p");
timeWriter(nodeDesc, myDesc, 50);
