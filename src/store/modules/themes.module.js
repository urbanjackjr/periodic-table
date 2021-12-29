const themes = {
	state: {
		theme: "dark",
		themeList: {
			dark: {
				icon: "cloud-moon",
			},
			light: {
				icon: "sun",
			},
		},
	},
	mutations: {},
	actions: {
		changeTheme({ commit, state }) {
			state.theme == "dark"
				? (state.theme = "light")
				: (state.theme = "dark");
			document.querySelector("html").setAttribute("theme", state.theme);
		},
	},
};

export default themes;
