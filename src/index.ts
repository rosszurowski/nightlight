/**
 * watchFavicon watches the page's favicons and swaps them out for a dark-mode
 * version when needed.
 */
function watchFavicon(): () => void {
  if (
    typeof window === "undefined" ||
    typeof window.matchMedia === "undefined"
  ) {
    return () => {};
  }

  const q = (selector: string): HTMLLinkElement | null =>
    document.querySelector(selector);

  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const fv = q("link[rel='shortcut icon']") || q("link[rel='icon']");
  const mi = q("link[rel='mask-icon']");

  const handleMediaMatch = (e: MediaQueryListEvent) => {
    updateIcons(e.matches);
  };

  const updateIcons = (isDarkMode: boolean = false) => {
    const str = isDarkMode ? "data-dark-" : "data-light-";
    fv.href = fv.getAttribute(str + "href");
    mi.setAttribute("color", mi.getAttribute(str + "color"));
  };

  // Copy the current value to a light data-* attribute.
  if (!fv.hasAttribute("data-light-href")) {
    fv.setAttribute("data-light-href", fv.href);
  }
  if (!mi.hasAttribute("data-light-color")) {
    mi.setAttribute("data-light-color", mi.getAttribute("color"));
  }

  mq.addEventListener("change", handleMediaMatch);
  updateIcons(mq.matches);

  return () => {
    mq.removeEventListener("change", handleMediaMatch);
  };
}

export default watchFavicon();
