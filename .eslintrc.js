module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
    node: true,
  },
  extends: ["airbnb-base", "eslint:recommended", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "jest", "prettier", "require-sort"],
  rules: {
    "require-sort/require-sort": [
      "error",
      {
        ignoreCase: false,
        ignoreDeclarationSort: false,
        ignorePropertySort: false,
        propertySyntaxSortOrder: ["none", "multiple", "single"],
      },
    ],
    semi: ["error", "always"],
    quotes: ["error", "single"],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "import/no-dynamic-require": 0,
    "global-require": 0,
    "import/prefer-default-export": 0,
    "no-underscore-dangle": 0,
    "no-await-in-loop": 0,
    "no-restricted-syntax": 0,
    "no-return-await": 0,
    "no-console": 0,
    "prettier/prettier": [
      "error",
      {
        trailingComma: "es5",
        singleQuote: true,
        printWidth: 80,
        tabWidth: 2,
        endOfLine: "lf",
        arrowParens: "always",
      },
    ],
  },
}
