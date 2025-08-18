import { timeWriter } from "./helper.js";
import { loadAfter } from "./helper.js";
import { initAnimationShow } from "./helper.js";
import selfData from "./assets/self_data.json" with { type: "json" };

fetch("./popup.html")
  .then((response) => response.text())
  .then((data) => {
    document.querySelector(".popup-holder").innerHTML = data;
  });

const myName = selfData.name;
const nodeName = document.querySelector(".self-name").querySelector("h1");
loadAfter(() => timeWriter(nodeName, myName, 200), 500);

const myDesc = selfData.description;
const nodeDesc = document.querySelector(".self-description").querySelector("p");
loadAfter(() => timeWriter(nodeDesc, myDesc, 25), 3000);

loadAfter(() => {
  const nodeLinks = document.querySelector(".self-links");
  for (let link of selfData.self_links) {
    let nodeHref = document.createElement("a");
    let nodeIcon = document.createElement("img");
    nodeHref.href = link.net_link;
    nodeHref.target = "_blank";
    nodeHref.rel = "nooopener noreferrer";
    nodeIcon.src = link.icon_link;
    nodeHref.append(nodeIcon);
    nodeLinks.appendChild(nodeHref);
  }
}, 3000);

const profileHolder = document.querySelector(".self-profile");
for (let i = 0; i < selfData.profile.length; i++) {
  let comment = selfData.profile[i];
  let nodeComm = document.createElement("p");
  loadAfter(() => timeWriter(nodeComm, comment, 20), 3700 + (i % 2) * 2000);
  if (i == selfData.profile.length - 1 || i == selfData.profile.length - 2)
    nodeComm.style.fontWeight = 800;
  profileHolder.appendChild(nodeComm);
}

const projectHolder = document.querySelector(".projects-holder");
for (let i = 0; i < selfData.projects.length; i++) {
  let spName = selfData.projects[i].name;
  let spDesc = selfData.projects[i].tiny_desc;
  let spIconLnk = selfData.projects[i].icon_link;

  const nodePButton = document.createElement("div");
  nodePButton.setAttribute("class", "project-button");
  const nodeIcon = document.createElement("img");
  nodeIcon.src = spIconLnk;

  const nodePDesc = document.createElement("div");
  nodePDesc.setAttribute("class", "project-description");
  const nodeName = document.createElement("p");
  nodeName.textContent = spName;
  const nodeDesc = document.createElement("p");
  nodeDesc.textContent = spDesc;
  const nodePLogos = document.createElement("div");
  nodePLogos.setAttribute("class", "project-logos");
  for (let logoLnk of selfData.projects[i].logos_links) {
    let nodeLogo = document.createElement("img");
    nodeLogo.src = logoLnk;
    nodePLogos.appendChild(nodeLogo);
  }

  const nodePContainer = document.createElement("div");
  nodePContainer.setAttribute("class", "project-container");

  nodePButton.appendChild(nodeIcon);
  nodePDesc.appendChild(nodeName);
  nodePDesc.appendChild(nodeDesc);
  nodePContainer.appendChild(nodePButton);
  nodePContainer.appendChild(nodePDesc);
  nodePContainer.appendChild(nodePLogos);
  nodePContainer.style.opacity = 0.1;
  initAnimationShow(nodePContainer);

  projectHolder.appendChild(nodePContainer);
}
