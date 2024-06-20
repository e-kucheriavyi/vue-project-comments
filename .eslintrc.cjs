const { rule } = require('postcss')
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    // Это праввило нужно для того, чтобы не было пересечений с нативными компонентами
    // Отключать его плохая практика
    'vue/multi-word-component-names': 'off'
    // Можно, например, создать модуль UI и поместить туда компоненты для отображения чего-либо:
    // UICard, UIButton и т. д.
    // И использовать их в других компонентах: ProductCard, ProductList и т. д.
  }
}