export const initThemeComparison = (doc: Document, win: Window) => {
  const container = doc.querySelector<HTMLElement>("[data-theming-container]");

  const darkComponentContainer = doc.querySelector<HTMLElement>(
    "[data-dark-components]",
  );

  const slider = doc.querySelector<HTMLElement>("[data-resize-slider]");

  if (!container || !darkComponentContainer || !slider) {
    return;
  }

  const syncTheme = () => {
    const theme = doc.documentElement.getAttribute("data-theme");

    if (theme) {
      darkComponentContainer.setAttribute("data-theme", theme);
    }
  };

  const observer = new MutationObserver(syncTheme);

  observer.observe(doc.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  syncTheme();

  let isDragging = false;

  const startDrag = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    isDragging = true;
  };

  const stopDrag = () => {
    isDragging = false;
  };

  const onDrag = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;

    const rect = container.getBoundingClientRect();

    let x =
      "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;

    x = Math.max(18, Math.min(rect.width - 25, x));

    darkComponentContainer.style.clipPath = `inset(0 0 0 ${x}px)`;
    slider.style.left = `${x}px`;
  };

  slider.addEventListener("mousedown", startDrag);
  slider.addEventListener("touchstart", startDrag);

  win.addEventListener("mouseup", stopDrag);
  win.addEventListener("touchend", stopDrag);

  win.addEventListener("mousemove", onDrag);
  win.addEventListener("touchmove", onDrag, {
    passive: false,
  });

  return () => {
    observer.disconnect();

    slider.removeEventListener("mousedown", startDrag);
    slider.removeEventListener("touchstart", startDrag);

    win.removeEventListener("mouseup", stopDrag);
    win.removeEventListener("touchend", stopDrag);

    win.removeEventListener("mousemove", onDrag);
    win.removeEventListener("touchmove", onDrag);
  };
};
