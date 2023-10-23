/** @type {import('ts-jest').JestConfigWithTsJest} */

const config = {
  preset: "ts-jest",
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", //import statements
    "\\.(css|scss)$": "identity-obj-proxy", //mocking CSS Files
  },
  modulePaths: ["<rootDir>/src"],
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    // process `*.tsx` files with `ts-jest`
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
};

export default config;
