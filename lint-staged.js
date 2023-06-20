module.exports = {
  ".src/*.js": ["prettier -w", "eslint src/*.js --fix"],
  "*.js": "eslint --cache --fix",
};
