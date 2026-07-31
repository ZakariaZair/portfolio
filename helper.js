var controller = new AbortController();
var signal = controller.signal;
var sliderIndex = 0;
var viewportMiddleHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) / 2 ;

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
  if (y <= viewportMiddleHeight) {
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
    const titleNode = document.querySelector(".project-name span");
    titleNode.textContent = infos.name;
    const pFullDNode = document.querySelector(".project-full-description span");
    pFullDNode.textContent = infos.full_desc;

    const bodyNode = document.querySelector("body");
    bodyNode.style.overflow = "hidden";
    const popupNode = document.querySelector(".popup-holder");
    popupNode.style.display = "flex";
    popupNode.style.top = window.scrollY + "px";

    controller.abort();
    controller = new AbortController();
    signal = controller.signal;
    setAllSlider(infos);
  });
}

function setAllSlider(infos) {
  sliderIndex = 0;
  const sliderContentImgNode = document.querySelector(".content-holder img");
  const slideButtonLeftNode = document.querySelector(".slider-left");
  const slideButtonRightNode = document.querySelector(".slider-right");
  function outOfBounds() {
    sliderContentImgNode.src = "./assets/gifs/loading_gif.gif";
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
}

export function closePopup(closeInfo) {
  const popupNode = document.querySelector(closeInfo);
  popupNode.addEventListener("click", (event) => {
    if (event.target !== event.currentTarget) return;
    const bodyNode = document.querySelector("body");
    const imgNode = document.querySelector(".content-holder img");
    imgNode.src = "./assets/gifs/loading_gif.gif";
    bodyNode.style.overflow = "scroll";
    popupNode.style.display = "none";
  });
}

export function setButtonCue(buttonNode) {
  const cueNode = document.createElement("span");
  cueNode.textContent = "View Project";
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

export function disappearAfterScroll(node) {
  let y = node.getBoundingClientRect().bottom * 5;
  console.log(y);
  window.addEventListener("scroll", (event) => {
    if (window.scrollY <= y) {
      node.style.opacity = 1;
    } else {
      node.style.opacity = 0;
    }
  });
}
