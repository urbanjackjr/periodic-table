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
        turnOffList(state) {
            state.listAlive = false;
        },
        turnOnList(state) {
            state.listAlive = true;
        }
    },
    actions: {

    },
    getters: {
        isListAlive(state) {
            return state.listAlive;
        },
        getTableMode(state) {
            return state.tableMode;
        }
    }
}

export default global