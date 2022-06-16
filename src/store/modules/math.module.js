const math = {
  state: {
    sum: 0,
    noa: 2,
    atomicMass: 0,
    elementQuantity: [0, 1, 1, 1, 1, 1],
  },
  mutations: {
    addAnotherAtom(state) {
      if (state.noa < 5) {
        state.noa += 1;
      }
    },
    subtractAtom(state) {
      if (state.noa > 2) {
        state.noa -= 1;
      }
    },
    round(state, payload) {
      return Number(`${payload.num}e${-payload.decimalPlaces}`);
    },
  },
  getters: {
    atomicMass: (state, getters, rootState) => (n) => rootState.tabledata[
      rootState.chosenElementAtomIndex[n]
    ].atomicMass.value * state.elementQuantity[n],
    compoundAtomicMass: (state, getters) => {
      state.sum = 0;
      for (let i = 1; i <= state.noa; i += 1) {
        state.sum += getters.atomicMass(i);
      }
      return state.sum;
    },
    wi: (state, getters) => (n) => getters.atomicMass(n) / state.sum,
  },
};

export default math;
