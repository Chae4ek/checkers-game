export default {
  testEnvironment: "jsdom",
  transform: { "\\.(ts|tsx)$": "ts-jest" },
  moduleNameMapper: {
    "\\.(svg|png|jpg)$": "jest-transform-stub",
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
