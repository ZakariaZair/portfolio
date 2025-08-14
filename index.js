import { hotReload } from "./helper.js";
import { timeWriter } from "./helper.js";
import { loadAfter } from "./helper.js";
import selfData from "./assets/self_data.json" with { type: "json" };

hotReload(15000);

const myName = selfData.name;
const nodeName = document.querySelector(".self-name").querySelector("h1");
loadAfter(() => timeWriter(nodeName, myName, 200), 1000);

const myDesc = selfData.description;
const nodeDesc = document.querySelector(".self-description").querySelector("p");
loadAfter(() => timeWriter(nodeDesc, myDesc, 25), 4000);

const pHolder = document.querySelector(".projects-holder");
for (let i = 0; i < selfData.projects.length; i++) {
  let spName = selfData.projects[i].name;
  let spDesc = selfData.projects[i].tiny_desc;

  const nodePName = document.createElement("div");
  nodePName.setAttribute("class", "project-name");
  const nodeName = document.createElement("p");
  nodeName.textContent = spName;

  const nodePButton = document.createElement("div");
  nodePButton.setAttribute("class", "project-button");
  const nodeIcon = document.createElement("img");

  const nodePDesc = document.createElement("div");
  nodePDesc.setAttribute("class", "project-description");
  const nodeDesc = document.createElement("p");
  nodeDesc.textContent = spDesc;

  const nodePContainer = document.createElement("div");
  nodePContainer.setAttribute("class", "project-container");

  nodePName.appendChild(nodeName);
  nodePButton.appendChild(nodeIcon);
  nodePDesc.appendChild(nodeDesc);
  nodePContainer.appendChild(nodePName);
  nodePContainer.appendChild(nodePButton);
  nodePContainer.appendChild(nodePDesc);
  pHolder.appendChild(nodePContainer);
}
