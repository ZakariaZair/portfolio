var controller = new AbortController();
var signal = controller.signal;
var sliderIndex = 0;

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

    controller.abort();
    controller = new AbortController();
    signal = controller.signal;
    setSlider(infos);

    const titleNode = document.querySelector(".project-name span");
    titleNode.textContent = pName;
  });
}

function setSlider(infos) {
  sliderIndex = 0;
  const sliderContentImgNode = document.querySelector(".content-holder img");
  const slideButtonLeftNode = document.querySelector(".slider-left");
  const slideButtonRightNode = document.querySelector(".slider-right");
  function outOfBounds() {
    slideButtonLeftNode.style.opacity = 1;
    slideButtonRightNode.style.opacity = 1;
    if (sliderIndex <= 0) slideButtonLeftNode.style.opacity = 0.2;
    if (
      !infos.slide_show_links ||
      sliderIndex >= infos.slide_show_links.length - 1
    )
      slideButtonRightNode.style.opacity = 0.2;
  }
  outOfBounds();
  sliderContentImgNode.src = infos.slide_show_links[sliderIndex];
  slideButtonLeftNode.addEventListener(
    "click",
    () => {
      if (sliderIndex <= 0) return;
      sliderIndex -= 1;
      outOfBounds();
      sliderContentImgNode.src = infos.slide_show_links[sliderIndex];
    },
    { signal },
  );
  slideButtonRightNode.addEventListener(
    "click",
    () => {
      if (sliderIndex >= infos.slide_show_links.length - 1) return;
      sliderIndex += 1;
      outOfBounds();
      sliderContentImgNode.src = infos.slide_show_links[sliderIndex];
    },
    { signal },
  );
  for (let slideLnk of infos.slide_show_links) {
  }
}

export function closePopup(closeInfo) {
  const popupNode = document.querySelector(closeInfo);
  popupNode.addEventListener("click", (event) => {
    if (event.target !== event.currentTarget) return;
    const bodyNode = document.querySelector("body");
    bodyNode.style.overflow = "scroll";
    popupNode.style.display = "none";
  });
}

export function setButtonCue(buttonNode) {
  const cueNode = document.createElement("span");
  cueNode.textContent = "Click here to view";
  buttonNode.appendChild(cueNode);
  const removeCue = () => {
    cueNode.style.opacity = 0;
    setTimeout(() => {
      cueNode.remove();
    }, 1000);
  };
  buttonNode.addEventListener("mouseover", removeCue);
}

export function loadAfter(callback, timing) {
  setTimeout(callback, timing);
}
