import {
  closePopup,
  loadHtmlFile,
  listenForPopup,
  initAnimationShow,
  setButtonCue,
  disappearAfterScroll,
} from "./helper.js";
import selfData from "./assets/self_data.json" with { type: "json" };

const englishUi = {
  home: "Home",
  viewProject: "View Project",
  footer: "*This portfolio was made for recruiters to better understand my profile*",
  switchToFrench: "Passer au français",
  switchToEnglish: "Switch to English",
  closeProject: "Close project details",
  previousSlide: "Previous project image",
  nextSlide: "Next project image",
  noPreview: "No preview available for",
  preview: "Preview",
};

let language = localStorage.getItem("portfolio-language") === "fr" ? "fr" : "en";

loadHtmlFile("./popup.html", ".popup-holder", () => {
  closePopup(".popup-holder");
});

function contentForLanguage() {
  if (language === "fr") return selfData.translations.fr;

  return {
    description: selfData.description,
    profile: selfData.profile,
    ui: englishUi,
  };
}

function projectForLanguage(project) {
  if (language !== "fr") return project;

  return { ...project, ...project.translations.fr };
}

function renderNavigation(ui) {
  const navBar = document.querySelector(".nav-bar");
  navBar.replaceChildren();

  const homeLink = document.createElement("a");
  homeLink.className = "nav-home";
  homeLink.href = "#top";
  homeLink.textContent = ui.home;

  const languageButton = document.createElement("button");
  languageButton.className = "nav-language-toggle";
  languageButton.type = "button";
  languageButton.textContent = language === "en" ? "FR" : "EN";
  languageButton.setAttribute("aria-label", language === "en" ? ui.switchToFrench : ui.switchToEnglish);
  languageButton.setAttribute("title", language === "en" ? ui.switchToFrench : ui.switchToEnglish);
  languageButton.addEventListener("click", () => {
    language = language === "en" ? "fr" : "en";
    localStorage.setItem("portfolio-language", language);
    renderPortfolio();
  });

  navBar.append(homeLink, languageButton);
}

function renderIntroduction(content) {
  document.querySelector(".self-name h1").textContent = selfData.name;
  document.querySelector(".self-description p").textContent = content.description;

  const linksHolder = document.querySelector(".self-links");
  linksHolder.replaceChildren();
  for (const link of selfData.self_links) {
    const anchor = document.createElement("a");
    const icon = document.createElement("img");
    anchor.href = link.net_link;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    icon.src = link.icon_link;
    icon.alt = "";
    anchor.append(icon);
    linksHolder.append(anchor);
  }

  const profileHolder = document.querySelector(".self-profile");
  profileHolder.replaceChildren();
  content.profile.forEach((paragraph, index) => {
    const profileParagraph = document.createElement("p");
    profileParagraph.textContent = paragraph;
    if (index < 2) profileParagraph.style.fontWeight = 850;
    profileHolder.append(profileParagraph);
  });
}

function renderProjects(ui) {
  const projectHolder = document.querySelector(".projects-holder");
  projectHolder.replaceChildren();

  for (const project of selfData.projects) {
    const localizedProject = projectForLanguage(project);

    const projectButton = document.createElement("div");
    projectButton.className = "project-button";
    listenForPopup(projectButton, localizedProject, ui);

    const projectIcon = document.createElement("img");
    projectIcon.src = project.icon_link;
    projectIcon.alt = "";
    projectButton.append(projectIcon);
    setButtonCue(projectButton, ui.viewProject);

    const title = document.createElement("div");
    title.className = "project-title";
    const name = document.createElement("p");
    name.textContent = localizedProject.name;
    const repositoryLink = document.createElement("a");
    repositoryLink.href = project.repo_link;
    repositoryLink.target = "_blank";
    repositoryLink.rel = "noopener noreferrer";
    repositoryLink.setAttribute("aria-label", `${localizedProject.name} on GitHub`);
    const repositoryIcon = document.createElement("img");
    repositoryIcon.src = project.version_control_icon;
    repositoryIcon.alt = "";
    repositoryLink.append(repositoryIcon);
    title.append(repositoryLink, name);

    const description = document.createElement("div");
    description.className = "project-description";
    const descriptionText = document.createElement("p");
    descriptionText.textContent = localizedProject.tiny_desc;
    description.append(title, descriptionText);

    const logos = document.createElement("div");
    logos.className = "project-logos";
    for (const logoLink of project.logos_links) {
      const logo = document.createElement("img");
      logo.src = logoLink;
      logo.alt = "";
      logos.append(logo);
    }

    const container = document.createElement("div");
    container.className = "project-container";
    container.style.opacity = 0.05;
    container.append(projectButton, description, logos);
    initAnimationShow(container);
    projectHolder.append(container);
  }
}

function renderFooter(ui) {
  const footer = document.querySelector("footer");
  footer.replaceChildren();
  const about = document.createElement("div");
  about.className = "about";
  const disclaimer = document.createElement("span");
  disclaimer.textContent = ui.footer;
  footer.append(about, disclaimer);
}

function renderPortfolio() {
  const content = contentForLanguage();
  document.documentElement.lang = language;
  renderNavigation(content.ui);
  renderIntroduction(content);
  renderProjects(content.ui);
  renderFooter(content.ui);
}

renderPortfolio();
disappearAfterScroll(document.querySelector(".nav-bar"));
