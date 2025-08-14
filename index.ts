import { timeWriter, reloadDev } from "helper.ts";

reloadDev(5000);

let myName = "Zakaria Zair";
let titleName = document.querySelector(".self-name").querySelector("h1");

timeWriter(titleName, myName, 100);
