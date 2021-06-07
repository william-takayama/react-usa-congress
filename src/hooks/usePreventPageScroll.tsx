export function usePreventPageScroll(prevent: boolean = false, from: string) {
  if (prevent) {
    document.body.dataset.preventedFrom = from;
  } else if (document.body.dataset.preventedFrom !== from) {
    return;
  } else {
    document.body.dataset.preventedFrom = "";
  }

  document.body.style.overflow = prevent ? "hidden" : "";
}
