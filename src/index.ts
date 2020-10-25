/**
 * watchFavicon watches the page's favicons and swaps them out for a dark-mode
 * version when needed.
 */
function watchFavicon(): () => void {
  if (
    typeof window === "undefined" ||
    typeof window.matchMedia === "undefined" ||
    // @ts-ignore
    typeof window.msMatchMedia === "undefined"
  ) {
    return () => {};
  }

  const q = (selector: string): HTMLLinkElement[] =>
    Array.prototype.slice.call(document.querySelectorAll(selector));

  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const favicons = q("link[rel*='icon']");
  const maskIcons = q("link[rel='mask-icon'");

  const handleMediaMatch = (e: MediaQueryListEvent) => {
    updateIcons(e.matches);
  };

  const updateIcons = (isDarkMode: boolean = false) => {
    const str = isDarkMode ? "dark" : "light";
    favicons.forEach(
      (el) => (el.href = el.getAttribute("data-" + str + "-href"))
    );
    maskIcons.forEach((el) =>
      el.setAttribute("color", el.getAttribute("data-" + str + "-color"))
    );
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
