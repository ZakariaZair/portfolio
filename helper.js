export function hotReload(timing) {
  setTimeout(() => {
    window.location.reload();
  }, timing);
}

export function loadHtmlFile(doc, classname) {
  fetch(doc)
    .then((response) => response.text())
    .then((data) => {
      document.querySelector(classname).innerHTML = data;
    });
}

export function timeWriter(selected, text, timing) {
  for (let i = 0; i < text.length; i++) {
    setTimeout(
      () => {
        selected.textContent += text[i];
      },
      timing * (i + 1),
    );
  }
}

export function initAnimationShow(node) {
  window.addEventListener("scroll", () => {
    scrollToShow(node);
  });
  node.addEventListener("mouseover", () => {
    hoverToShow(node);
  });
}

function scrollToShow(node) {
  if (node.style.opacity >= 1) return;
  let y = node.getBoundingClientRect().top;
  if (window.scrollY >= y) {
    node.style.opacity = 1;
    node.style.transform = "translate(0, 20px)";
    node.style.transform = "translate(0, -20px)";
  }
}

function hoverToShow(node) {
  if (node.style.opacity >= 1) return;
  node.style.opacity = 1;
  node.style.transform = "translate(0, 20px)";
  node.style.transform = "translate(0, -20px)";
}

export function listenForPopup(buttonNode, infos) {
  buttonNode.addEventListener("click", () => {
    const pName = infos.name;
    const pDesc = infos.full_desc;

    const bodyNode = document.querySelector("body");
    bodyNode.style.overflow = "hidden";

    const popupNode = document.querySelector(".popup-holder");
    popupNode.style.display = "flex";
    popupNode.style.top = window.scrollY + "px";
    const titleNode = document.querySelector(".project-name span");
    titleNode.textContent = pName;
  });
}

export function openPopup() {}

export function closePopup() {}

export function loadAfter(callback, timing) {
  setTimeout(callback, timing);
}
