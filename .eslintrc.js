module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "testing-library", "jest-dom"],
  extends: [
    "next/core-web-vitals",
    "plugin:storybook/recommended",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:testing-library/react",
    "plugin:jest-dom/recommended",
  ],
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { vars: "all", varsIgnorePattern: "^_" },
    ],
  },
}
