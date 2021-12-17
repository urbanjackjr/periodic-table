const data = {
  state: {
    compound: "",
    compoundListData: "",
    singleCompoundData: "",
    loading: true,
    compoundListLoading: "",
    compoundInfoListLoading: "",
    error: "",
    listError: false,
    modelLoad: false,
    modelError: false,
    modelStyle: "spacefill 23%;wireframe 0.15;",
    modelData: "",
    fullscreen: "",
    activeMenuTab: 0,
  },
  mutations: {
    compoundRegExp(state, compound) {
      compound.innerHTML = compound.innerHTML.replace(/((?<!\+|\-|\/|(\>\d*))\d+)/g, "<sub>$1</sub>").replace(/(\-|\+)\d?/g, "<sup>$&</sup>");
    },
    changeStyle(state, style) {
      state.modelStyle = style;
      Jmol.script(myJmol, 'select *;cartoons off;' + style);
    },
    loadNewCompoundModel(state, smiles) {
      Jmol.script(myJmol, 'refresh;load ASYNC https://cactus.nci.nih.gov/chemical/structure/'+smiles+'/file');
      Jmol.script(myJmol, 'select *;cartoons off;' + state.modelStyle);
    },
    mountCompoundModel(state, id) {
      Jmol.script(myJmol, 'load https://cactus.nci.nih.gov/chemical/structure/'+state.singleCompoundData.IsomericSMILES+'/file;set antialiasDisplay true;');
      document.getElementById(id).innerHTML = Jmol.getAppletHtml(myJmol);
    },
    mountOrbitalModel(state, id) {
      document.getElementById(id).innerHTML = Jmol.getAppletHtml(myJmol);
      Jmol.script(myJmol, 'set antialiasDisplay true;axes 2;axes MOLECULAR;zoom 150')
    },
    JmolScript(state, script) {
      Jmol.script(myJmol, script);
    },
    toggleFullscreen(state) {
      state.fullscreen = !state.fullscreen;
      Jmol.script(myJmol, 'refresh;')
    },
    setCompound(state, compound) {
      state.compound = compound;
    },
    setSingleCompoundData(state, scd) {
      state.singleCompoundData = scd;
    },
    setActiveTab(state, index) {
      state.activeMenuTab = index;
    }
  },
  actions: { 
    getSingleCompoundData({ state, commit, dispatch, getters }) {
      state.loading = "Ładuję...";
      state.error = false;
      fetch("https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/fastformula/"+state.compound+"/property/MolecularWeight,MolecularFormula,IsomericSMILES/JSON")
        .then((response) => response.json())
        .then((data) => {
          state.compoundListData = data.PropertyTable.Properties;
          fetch("https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/"+getters.getFilteredCompoundData(data.PropertyTable.Properties).CID+"/property/MolecularWeight,MolecularFormula,CanonicalSMILES,IsomericSMILES,IUPACName,XLogP,ExactMass,MonoisotopicMass,TPSA,Complexity,Charge,RotatableBondCount,AtomStereoCount,BondStereoCount,CovalentUnitCount,Volume3D/JSON")
            .then((response) => response.json())
            .then((data) => {
              state.singleCompoundData = data.PropertyTable.Properties[0];
              state.loading = false;
            })
        })
        .catch(error => {
          console.log(error.message)
          if(error.message == "Failed to fetch") {
            state.error = 'Sprawdź swoje połączenie internetowe.'
          }
          else {
            state.error = 'Nie znaleziono związku w bazie. Związek najprawdopodobniej nie istnieje.';
          }
          state.loading = false;
          throw new Error(`API ${error}`);
        });
    },
    getDataFromCID({state, commit}, cid) {
      state.compoundInfoListLoading = true;
      fetch("https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/"+cid+"/property/MolecularWeight,MolecularFormula,CanonicalSMILES,IsomericSMILES,IUPACName,XLogP,ExactMass,MonoisotopicMass,TPSA,Complexity,Charge,RotatableBondCount,AtomStereoCount,BondStereoCount,CovalentUnitCount,Volume3D/JSON")
        .then((response) => response.json())
        .then((data) => {
          state.singleCompoundData = data.PropertyTable.Properties[0];
          state.compoundInfoListLoading = false;
        })
        .then(() => {
          commit("compoundRegExp", document.querySelector(".MolecularFormula .value"));
        })
    },
    get3DSimiliarCompounds({state}) {
      state.compoundListLoading = "Ładuję...";
      state.listError = false;
      fetch("https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/fastsimilarity_3d/cid/"+state.singleCompoundData.CID+"/property/MolecularWeight,MolecularFormula,CanonicalSMILES,IsomericSMILES,IUPACName,XLogP,ExactMass,MonoisotopicMass,TPSA,Complexity,Charge,RotatableBondCount,AtomStereoCount,BondStereoCount,CovalentUnitCount,Volume3D/JSON?listkey_start=0&listkey_count=100")
        .then((response) => response.json())
        .then((data) => {
          state.compoundListData = data.PropertyTable.Properties;
          state.compoundListLoading = false;
        })
        .catch(error => {
          state.compoundListLoading = false;
          state.listError = Error(`API ${error}`);
          throw new Error(`API ${error}`);
        })
    },
    getCompoundData({ state, dispatch }) {
      state.compoundListLoading = "Ładuję...";
      state.error = false;
      fetch("https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/substructure/cid/"+state.singleCompoundData.CID+"/JSON")
        .then((response) => response.json())
        .then((data) => {
          state.compoundListLoading = "Pobieram dane...";
          let url = "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/listkey/"+data.Waiting.ListKey+"/property/MolecularWeight,MolecularFormula,CanonicalSMILES,IsomericSMILES,IUPACName/JSON?listkey_start=0&listkey_count=100";
          dispatch('fetchRetry', url)
        })
        .catch(error => {
          state.compoundListLoading = false;
          state.error = Error(`API ${error}`);
          throw new Error(`API ${error}`);
        });
    },
    fetchRetry: async ({state, dispatch}, url) => {
      const res = await fetch(url);
      if (res.ok) {
        return res.json()
          .then((data) => {
            if(data.Waiting) {
              dispatch('fetchRetry', url);
            }
            else {
              state.compoundListLoading = false;
              state.compoundListData = data.PropertyTable.Properties;
            }
          });
      }
    },
    getModel({state, commit, rootState}) {
      let color = rootState.themes.theme == 'dark' ? '#000000' : '#FFFFFF';
      var Info = {
        color: color,
        height: "100%",
        width: "100%",
        console: "myJmol_infodiv",
        appletLoadingImage: "/loading.svg",
        use: "HTML5",
        j2sPath: "/jsmol/j2s",
        serverURL: "/jsmol/php/jsmol.php",
        disableJ2SLoadMonitor: true,
        zIndexBase: 102,
        language: "PL_pl",
        addSelectionOpions: false,
      };
      Jmol.getApplet("myJmol", Info);
    },
    getCompound: ({state, getters, rootState}) => {
      state.loading = true;
      state.compound = "";
      for(let i = 1; i<=rootState.math.noa; i++) {
          state.compound += rootState.tabledata[rootState.chosenElementAtomIndex[i]].symbol
          rootState.math.elementQuantity[i] > 1 ? state.compound += rootState.math.elementQuantity[i] : ""
      }
    },
    getSingleData: ({dispatch}) => {
      dispatch("getCompound");
      dispatch("getSingleCompoundData");
    },
  },
  getters: {
    getFilteredCompoundData: (state, getters, rootState) => (data) => {
      let num = Math.round(rootState.math.sum + "e" + 3);
      num = Number(num + "e" + -3);
      return data.filter(property => Math.abs(1 - property.MolecularWeight/num) < 0.01)[0];
    }
  }
}

export default data