module.exports = {
  plugins: ["prettier"],
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: { "no-unused-vars": "off" },
};
