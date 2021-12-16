const math = {
    state: {
        sum: 0,
        noa: 2,
        atomicMass: 0,
        elementQuantity: [0, 1, 1, 1, 1, 1],
    },
    mutations: {
        addAnotherAtom(state) {
            state.noa<5 ? state.noa++ : state.noa;
        },
        subtractAtom(state) {
            state.noa>2 ? state.noa-- : state.noa;
        },
        round(state, payload) {
            num = Math.round(payload.num + "e" + payload.decimalPlaces);
            return Number(payload.num + "e" + -payload.decimalPlaces);
        }
    },
    getters: {
        atomicMass: (state, getters, rootState) => (n) => {
            return rootState.tabledata[rootState.chosenElementAtomIndex[n]].atomicMass.value * state.elementQuantity[n];
        },
        compoundAtomicMass: (state, getters) => {
            state.sum = 0;
            for (let i = 1; i <= state.noa; i++) {
                state.sum += getters.atomicMass(i);
            }
            return state.sum;
        },
        wi: (state, getters) => (n) => {
          return getters.atomicMass(n) / state.sum
        },
    }
}

export default math