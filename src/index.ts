/**
 * watchFavicon watches the page's favicons and swaps them out for a dark-mode
 * version when needed.
 */
function watchFavicon() {
  if (
    typeof window === "undefined" ||
    typeof document === "undefined" ||
    typeof window.matchMedia === "undefined" ||
    // @ts-ignore
    typeof window.msMatchMedia === "undefined"
  ) {
    return;
  }

  const q = (selector: string): HTMLLinkElement[] =>
    Array.prototype.slice.call(document.querySelectorAll(selector));

  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const favicons = q("link[rel='shortcut icon'],link[rel='icon']");
  const maskIcons = q("link[rel='mask-icon'");

  const handleMediaMatch = (e: MediaQueryListEvent) => {
    updateIcons(e.matches);
  };

  const updateIcons = (isDarkMode: boolean = false) => {
    const href = isDarkMode ? "data-dark-href" : "data-light-href";
    const color = isDarkMode ? "data-dark-color" : "data-light-color";
    favicons.forEach((el) => (el.href = el.getAttribute(href)));
    maskIcons.forEach((el) => el.setAttribute("color", el.getAttribute(color)));
  };

  // Copy the current value to a light data-* attribute.
  favicons.forEach((el) => {
    if (el.hasAttribute("data-light-href")) {
      return;
    }
    el.setAttribute("data-light-href", el.href);
  });
  maskIcons.forEach((el) => {
    if (el.hasAttribute("data-light-color")) {
      return;
    }
    el.setAttribute("data-light-color", el.getAttribute("color"));
  });

  mq.addEventListener("change", handleMediaMatch);
  updateIcons(mq.matches);

  return () => {
    mq.removeEventListener("change", handleMediaMatch);
  };
}

export default watchFavicon();
