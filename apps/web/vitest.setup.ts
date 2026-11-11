import '@testing-library/jest-dom/vitest';

// jsdom에는 matchMedia가 없어 react-hot-toast의 Toaster가 렌더되지 않음
if (!window.matchMedia) {
  window.matchMedia = (query: string): MediaQueryList => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}
