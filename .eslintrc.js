module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "react-app",
    "react-app/jest",
    "plugin:security-node/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "security-node"],
  rules: {
    // desabilitar pois não estou usando TS
    "react/prop-types": "off",
  },
};
