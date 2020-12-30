// HTML如果要忽略使用 <!-- eslint-disable-next-line -->
module.exports = {
  extends: ["alloy", "alloy/vue", "@vue/typescript"],

  globals: {
    Vue: false
  },

  rules: {
    "vue/component-tags-order": [
      2,
      {
        order: ["template", "script", "style"]
      }
    ],
    "vue/no-deprecated-slot-attribute": 0,
    "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }],
    "max-params": [0,5]
  },

  parserOptions: {
    parser: "@typescript-eslint/parser"
  }
};
