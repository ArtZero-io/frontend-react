module.exports = {
  extends: ["prettier"],
  parser: "@babel/eslint-parser",
  plugins: ["react-hooks", "prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
    requireConfigFile: false,
    babelOptions: {
      presets: ["@babel/preset-react"],
    },
  },
};
