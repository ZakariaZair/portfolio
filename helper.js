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

export function loadAfter(callback, timing) {
  setTimeout(callback, timing);
}
