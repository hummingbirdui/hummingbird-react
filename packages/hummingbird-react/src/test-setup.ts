import '@testing-library/jest-dom/vitest';

// jsdom doesn't implement `matchMedia`; Vaul (the Drawer's engine) calls it on
// open. Provide a minimal stub so interactive components relying on it render.
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = (query: string): MediaQueryList =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList;
}

// jsdom doesn't implement the Pointer Capture API; Vaul's drag handlers call it
// on pointer down. Stub the trio so pointer interactions don't throw.
if (typeof Element !== 'undefined' && !Element.prototype.setPointerCapture) {
  Element.prototype.setPointerCapture = () => {};
  Element.prototype.releasePointerCapture = () => {};
  Element.prototype.hasPointerCapture = () => false;
}
