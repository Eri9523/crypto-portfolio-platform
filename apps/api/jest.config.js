const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.ts"],
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
  globals: {
    "ts-jest": {
      tsconfig: "apps/api/tsconfig.json"
    }
  }
};