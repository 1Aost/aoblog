module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
  },
  "extends": ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "no-console": "error",
    "no-unused-vars": "off",
  }
}