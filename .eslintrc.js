module.exports = {
  extends: [
    "plugin:vue/essential", // 使用 essential 規範
    "eslint:recommended", // 使用 ESLint 推薦規範
    "@vue/prettier", //使用 prettier
  ],
  parserOptions: {
    ecmaVersion: 7,
    sourceType: "module",
  },
};
