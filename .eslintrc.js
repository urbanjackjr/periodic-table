module.exports = {
  extends: [
    'airbnb-base',
    'plugin:vue/vue3-recommended',
    'plugin:vue/base',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:vue/vue3-recommended',
  ],
  parser: 'vue-eslint-parser',
  rules: {
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'state',
        ],
      },
    ],
  },
  globals: {
    Jmol: 'readonly',
    myJmol: 'readonly',
  },
};
