const global = {
    state: {
        tableMode: "grid",
        modeLoading: false,
    },
    mutations: {
        changeTableMode(state, mode) {
            state.tableMode = mode;
        },
        startModeLoading(state) {
            state.modeLoading = true;
        },
        stopModeLoading(state) {
            state.modeLoading = false;
        }
    },
    actions: {

    },
}

export default global