module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100, // 多少个字符换行
  semi: false,
  jsxSingleQuote: true, // 在jsx中用单引号而不是双引号
  jsxBracketSameLine: false, // jsx开始标签的>强制换行
  arrowParens: 'always', // 箭头函数总是参数总是包含在()内
  endOfLine: 'lf',
  /* 下面这条规则的目的是：点击保存时，根据 eslint 规则自定修复，同时集成 prettier 到 eslint 中。
  这条规则官网上没有,可能已经[_DEPRECTAED_]，see https://github.com/prettier/prettier-vscode/issues/999，
  所以决定不用 */
  // eslintIntegration: true,
}
