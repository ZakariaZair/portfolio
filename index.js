import {
  closePopup,
  loadHtmlFile,
  timeWriter,
  loadAfter,
  listenForPopup,
  initAnimationShow,
  setButtonCue,
  disappearAfterScroll,
} from "./helper.js";
import selfData from "./assets/self_data.json" with { type: "json" };

loadHtmlFile("./popup.html", ".popup-holder");
closePopup(".popup-holder");

const myName = selfData.name;
const nodeName = document.querySelector(".self-name").querySelector("h1");
loadAfter(() => timeWriter(nodeName, myName, 200), 200);

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
}, 5000);

const profileHolder = document.querySelector(".self-profile");
for (let i = 0; i < selfData.profile.length; i++) {
  let comment = selfData.profile[i];
  let nodeComm = document.createElement("p");
  loadAfter(() => timeWriter(nodeComm, comment, 20), 5000 + i * 1100);
  if (i < 2) nodeComm.style.fontWeight = 850;
  profileHolder.appendChild(nodeComm);
}

const projectHolder = document.querySelector(".projects-holder");
for (let i = 0; i < selfData.projects.length; i++) {
  let spName = selfData.projects[i].name;
  let spDesc = selfData.projects[i].tiny_desc;
  let spIconLnk = selfData.projects[i].icon_link;
  let spRepoLnk = selfData.projects[i].repo_link;
  let spGithubIconLnk = selfData.projects[i].version_control_icon;

  const nodePButton = document.createElement("div");
  nodePButton.setAttribute("class", "project-button");
  listenForPopup(nodePButton, selfData.projects[i]);
  const nodeIcon = document.createElement("img");
  nodeIcon.src = spIconLnk;
  setButtonCue(nodePButton);

  const nodePTitle = document.createElement("div");
  nodePTitle.setAttribute("class", "project-title");
  const nodeName = document.createElement("p");
  nodeName.textContent = spName;
  const nodeRepoLnk = document.createElement("a")
  nodeRepoLnk.href = spRepoLnk;
  nodeRepoLnk.target = "_blank";
  nodeRepoLnk.rel = "nooopener noreferrer";
  const nodeGithubIconImg = document.createElement("img")
  nodeGithubIconImg.src = spGithubIconLnk;

  const nodePDesc = document.createElement("div");
  nodePDesc.setAttribute("class", "project-description");
  const nodeDesc = document.createElement("p");
  nodeDesc.textContent = spDesc;

  const nodePLogos = document.createElement("div");
  nodePLogos.setAttribute("class", "project-logos");
  for (let logoLnk of selfData.projects[i].logos_links) {
    let nodeLogo = document.createElement("img");
    nodeLogo.src = logoLnk;
    i % 2 == 0
      ? nodePLogos.appendChild(nodeLogo)
      : nodePLogos.prepend(nodeLogo);
  }

  const nodePContainer = document.createElement("div");
  nodePContainer.setAttribute("class", "project-container");

  nodePButton.appendChild(nodeIcon);
  nodePTitle.appendChild(nodeRepoLnk);
  nodeRepoLnk.appendChild(nodeGithubIconImg);
  nodePTitle.appendChild(nodeName);
  nodePDesc.appendChild(nodePTitle);
  nodePDesc.appendChild(nodeDesc);
  nodePContainer.appendChild(nodePButton);
  nodePContainer.appendChild(nodePDesc);
  nodePContainer.appendChild(nodePLogos);
  nodePContainer.style.opacity = 0.05;
  initAnimationShow(nodePContainer);

  projectHolder.appendChild(nodePContainer);
}

const navBar = document.querySelector(".nav-bar");
const nodeNHome = document.createElement("a");
nodeNHome.setAttribute("href", "/");
nodeNHome.textContent = "Home";
navBar.appendChild(nodeNHome);
disappearAfterScroll(navBar);
