export default function reloadDev(timing: number) {
  setTimeout(() => {
    location.reload();
  }, timing);
}

export function timeWriter(selected: any, text: string, timing: number) {
  for (let i = 0; i < text.length; i++) {
    setTimeout(
      () => {
        selected.textContent += text[i];
      },
      timing * (i + 1),
    );
  }
}
