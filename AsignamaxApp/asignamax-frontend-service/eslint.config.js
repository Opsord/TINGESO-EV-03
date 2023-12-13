module.exports = {
  extends: "eslint:recommended",
  rules: {
    // enable additional rules
    indent: ["warn", 4],
    "linebreak-style": ["warn", "unix"],
    quotes: ["warn", "double"],
    semi: ["wwarn", "always"],

    // override configuration set by extending "eslint:recommended"
    "no-empty": "warn",
    "no-cond-assign": ["warn", "always"],

    // disable rules from base configurations
    "for-direction": "off",
  },
};
