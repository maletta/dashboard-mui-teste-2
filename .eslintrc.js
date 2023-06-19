module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
    "plugin:@typescript-eslint/eslint-recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    // "prettier"
  ],
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
      arrowFunctions: true,
    },
  },
  plugins: ["react", "@typescript-eslint", "prettier", "simple-import-sort"],
  settings: {
    react: {
      version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        paths: ["./src"],
      },
    },
  },
  "overrides": [
    // override "simple-import-sort" config
    {
      "files": ["*.js", "*.jsx", "*.ts", "*.tsx"],
      "rules": {
        "simple-import-sort/imports": [
          "error",
          {
            "groups": [
              ["^react", "^@?\\w"], // Packages `react` related packages come first.
              ["^(@|components|containers|utils)(/.*|$)"],// Internal packages.
              // ["^(@mui)(/.*|$)"],// Internal packages.
              ["^\\u0000"],// Side effect imports.
              ["^\\.\\.(?!/?$)", "^\\.\\./?$"],// Parent imports. Put `..` last.
              ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],// Other relative imports. Put same-folder imports and `.` last.
              ["^.+\\.?(css)$"]// Style imports.
            ]
          }
        ]
      }
    }
  ],
  rules: {
    // Existing rules
    "comma-dangle": "off", // https://eslint.org/docs/rules/comma-dangle
    "function-paren-newline": "off", // https://eslint.org/docs/rules/function-paren-newline
    "global-require": "off", // https://eslint.org/docs/rules/global-require
    "import/no-dynamic-require": "off", // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-dynamic-require.md
    "no-inner-declarations": "off", // https://eslint.org/docs/rules/no-inner-declarations
    // New rules
    "class-methods-use-this": "off",
    "import/extensions": "off",
    "import/prefer-default-export": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-var-requires": "off",
    "no-empty-interface": "off", // desabilitar erro de interface vazia
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",

  },
};