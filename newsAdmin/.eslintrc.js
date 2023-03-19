module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "plugin:prettier/recommended"
  ],
  parserOptions: {
    parser: "@babel/eslint-parser"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/multi-word-component-names": "off",
    "eslint-disable-next-line no-undef": "off",
    "eslint-disable vue/no-v-for-template-key": "off",
    "vue/no-v-for-template-key": "off",
    "eslint-disable-next-line vue/valid-v-for": "off",
    "eslint-disable-next-line": "off",
    "eslint-disable": "off"
  }
}
