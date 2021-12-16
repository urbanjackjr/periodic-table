import { createStore } from "vuex";
import math from "./modules/math.module";
import themes from "./modules/themes.module";
import data from "./modules/data.module";
import ptdata from "../assets/pt.json";

const store = createStore({
    state: {
        tabledata: "",
        chooseElement: 0,
        showAllInfoIndex: -1,
        chosenElementAtomIndex: [0, 0, 0, 0, 0, 0],
        mainInfo: "atomicMass",
        max: 0,
        height: 0,
        show: false,
    },
    mutations: {
        SAVE_DATA(state, tabledata) {
            state.tabledata = tabledata;
        },
        hideInfo(state) {
            state.showAllInfoIndex = -1;
        },
        changeInfo(state, property) {
            state.mainInfo = property;
        },
        elementChoice(state, n) {
            state.chooseElement = n;
        },
        maxHeight(state) {
            state.height =
                document.getElementsByClassName("calcWithCompoundList")[0]
                    .scrollHeight + 11;
        },
        showCalc(state) {
            const promise1 = new Promise((resolve, reject) => {
                resolve((state.show = !state.show));
            });
            promise1.then((value) => {
                state.height = value
                    ? document.getElementsByClassName("calcWithCompoundList")[0].scrollHeight + 11
                    : 0;
            });
        },
        maxValue(state) {
            state.max = 0;
            for (let i = 0; i < state.tabledata.length; i++) {
                if (
                    i > 0 && 
					state.tabledata[i][state.mainInfo] && 
					typeof state.tabledata[i][state.mainInfo].value === "number"
                ) {
                    Math.abs(state.tabledata[i][state.mainInfo].value) >
                    state.max
                        ? (state.max = Math.abs(state.tabledata[i][state.mainInfo].value))
                        : state.max;
                }
            }
        },
    },
    actions: {
        loadData({ commit }) {
            commit("SAVE_DATA", ptdata);
        },
        chooseAtomFromTable({ state, dispatch }, atom) {
            !state.chooseElement
                ? atom.atomicNumber
                    ? (state.showAllInfoIndex = atom.index)
                    : ""
                : ((state.chosenElementAtomIndex[state.chooseElement] = atom.index), (state.chooseElement = 0));
        },
    },
    getters: {
        properties: (state) => (info, n) => {
            return Object.fromEntries(
                Object.entries(state.tabledata[info]).slice(n)
            );
        },
        compoundText: (state) => {
            let compoundText = "";
            for (let i = 1; i <= state.noa; i++) {
                compoundText +=
                    state.tabledata[state.chosenElementAtomIndex[i]].symbol;
            }
            return compoundText;
        },
    },
    modules: {
        math: math,
        themes: themes,
        data: data,
    },
});

export default store;
