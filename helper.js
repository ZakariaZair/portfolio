export function hotReload(timing) {
  setTimeout(() => {
    window.location.reload();
  }, timing);
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

export function initScrollShow(node) {
  window.addEventListener("scroll", () => {
    scrollToShow(node);
  });
}

function scrollToShow(node) {
  if (node.style.visibility != "hidden") return;
  let y = node.getBoundingClientRect().top;
  if (window.scrollY >= y) {
    node.style.visibility = "";
    node.style.opacity = 1;
    node.style.transform = "translate(0, 20px)";
    node.style.transform = "translate(0, -20px)";
  }
}

export function loadAfter(callback, timing) {
  setTimeout(callback, timing);
}
