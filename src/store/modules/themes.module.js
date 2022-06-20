const themes = {
  state: {
    theme: 'dark',
    themeList: {
      dark: {
        icon: 'cloud-moon',
      },
      light: {
        icon: 'sun',
      },
    },
  },
  mutations: {},
  actions: {
    changeTheme({ state }) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      document.querySelector('html').setAttribute('theme', state.theme);
    },
  },
};

export default themes;
