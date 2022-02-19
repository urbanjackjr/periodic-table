const global = {
    state: {
        tableMode: "grid",
        modeLoading: false,
        searchQuery: ''
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
        searchQueryUpdate(state, query) {
            state.searchQuery = query;
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