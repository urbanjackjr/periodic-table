const global = {
    state: {
        tableMode: "grid",
        modeLoading: false,
        listAlive: false
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
        },
        turnListAlive(state) {
            state.listAlive = true;
        }
    },
    actions: {

    },
}

export default global