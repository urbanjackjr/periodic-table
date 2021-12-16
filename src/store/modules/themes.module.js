const themes = {
    state: {
        theme: "dark",
        themeList: {
            dark:  {
                icon: 'cloud-moon',
            }, 
            light: {
                icon: 'sun',
            }
        },
        loading: false,
    },
    mutations: {
        INSERT_CSS_TO_ROOT(state, data) {
            document.getElementById("root").innerHTML = data;
        },
    },
    actions: {
        changeTheme({ commit, state }) {
            state.theme == 'dark' ? state.theme = 'light' : state.theme = 'dark'
        },
    },
}

export default themes