module.exports = {
    // "env": {
    //     "browser": true,
    //     "es2021": true
    // },
    "extends": [
        // "eslint:recommended",
        "plugin:react/recommended",
        // "plugin:@typescript-eslint/recommended",
        // "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:jest/recommended",
        "plugin:jest/style",
        'plugin:testing-library/react',
        "next",
        "next/core-web-vitals"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "./tsconfig.json",
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    // "plugins": [
    //     "react",
    //     "@typescript-eslint"
    // ],
    "rules": {
    }
}
