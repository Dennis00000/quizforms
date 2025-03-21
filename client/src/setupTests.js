// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom"

// Mock the matchMedia function for tests
window.matchMedia =
  window.matchMedia ||
  (() => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }))

// Mock localStorage
const localStorageMock = (() => {
  let store = {}
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString()
    },
    removeItem: (key) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
})

// Mock IntersectionObserver
class IntersectionObserverMock {
  constructor(callback) {
    this.callback = callback
  }

  observe() {
    return null
  }

  unobserve() {
    return null
  }

  disconnect() {
    return null
  }
}

window.IntersectionObserver = IntersectionObserverMock

// Suppress console errors during tests
const originalConsoleError = console.error
console.error = (...args) => {
  if (
    typeof args[0] === "string" &&
    (args[0].includes("Warning: An update to") || args[0].includes("Warning: validateDOMNesting"))
  ) {
    return
  }
  originalConsoleError(...args)
}

// Suppress console warnings during tests
const originalConsoleWarn = console.warn
console.warn = (...args) => {
  if (typeof args[0] === "string" && args[0].includes("Warning:")) {
    return
  }
  originalConsoleWarn(...args)
}

