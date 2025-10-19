import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  rules: {
    "vue/first-attribute-linebreak": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "no-useless-escape": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "vue/require-default-prop": "off",
    "@typescript-eslint/no-unsafe-function-type": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/unified-signatures": "off",
    "vue/multi-word-component-names": "off",
    "vue/html-self-closing": "off",
    "no-empty": "off"
  }
});
