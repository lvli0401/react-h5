module.exports = {
  //此项是用来告诉eslint找当前配置文件不能往父级查找
  root: true,
  parser: '@typescript-eslint/parser',
  //此项指定环境的全局变量
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  //此项是用来指定javaScript语言类型和风格，sourceType用来指定js导入的方式
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  // 此项是用来配置标准的js风格，就是说写代码的时候要规范的写
  extends: [
    'eslint:recommended',
    'eslint:recommended',
    // 'plugin:@typescript-eslint/eslint-recommended',
    // 'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  plugins: ['prettier', 'react', 'react-hooks'],
  // "off" -> 0 关闭规则
  // "warn" -> 1 开启警告规则 可以提交
  // "error" -> 2 开启错误规则 无法提交
  rules: {
    // 检查 Hooks 的使用规则
    'react-hooks/rules-of-hooks': 'error',
    // 检查依赖项的声明
    'react-hooks/exhaustive-deps': 'warn',
    //console
    'no-console': 'warn',
    //debugger
    'no-debugger': 'off',
    //定义未使用
    'no-unused-vars': 'warn',
    //img标签不需要有alt
    'jsx-a11y/img-has-alt': 'off',
    //缩进
    'indent': ['warn', 2],
    //不允许使用any
    // '@typescript-eslint/no-explicit-any': 'off',
    // "react/jsx-key": [true, { "checkFragmentShorthand": true }]
    // Note: you must disable the base rule as it can report incorrect errors
    'no-empty-function': 'off',
    // '@typescript-eslint/no-empty-function': 'off',
    //允许部分页面禁用ts检查
    // '@typescript-eslint/ban-ts-comment': 'off',
    // 尽量使用单引号
    'quotes': ['warn', 'single'],
    // 行尾不加分号
    'semi': [1, 'never'],
  },
}
