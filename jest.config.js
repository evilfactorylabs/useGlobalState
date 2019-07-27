// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    bail:true,
  automock: true,
  browser: true,
  clearMocks: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "/node_modules/"
  ],
  testEnvironment: "jest-environment-jsdom",
    "transform": {
  "^.+\\.[t|j]sx?$": "babel-jest"
},
  testMatch: [
    "**/__tests__/**/*.js?(x)",
    "**/?(*.)+(spec|test).js?(x)"
  ],
  testPathIgnorePatterns: [
    "/node_modules/"
  ],
  transformIgnorePatterns: [
    "/node_modules/"
  ],
  verbose: true,
};
