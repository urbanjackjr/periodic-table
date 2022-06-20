const data = {
  state: {
    compound: '',
    compoundListData: '',
    singleCompoundData: '',
    loading: true,
    compoundListLoading: '',
    compoundInfoListLoading: '',
    error: '',
    listError: false,
    modelLoad: false,
    modelError: false,
    modelStyle: 'spacefill 23%;wireframe 0.15;',
    modelData: '',
    modelShowOptions: false,
    fullscreen: '',
    activeMenuTab: 0,
  },
  mutations: {
    compoundRegExp(state, compound) {
      const compoundElement = compound;
      compoundElement.innerHTML = compound.innerHTML.replace(/((?<!\+|-|\/|(>\d*))\d+)/g, '<sub>$1</sub>').replace(/(-|\+)\d?/g, '<sup>$&</sup>');
    },
    changeStyle(state, style) {
      state.modelStyle = style;
      Jmol.script(myJmol, `select *;cartoons off;${style}`);
    },
    loadNewCompoundModel(state, smiles) {
      Jmol.script(myJmol, `refresh;load ASYNC https://cactus.nci.nih.gov/chemical/structure/${smiles}/file`);
      Jmol.script(myJmol, `select *;cartoons off;${state.modelStyle}`);
    },
    mountCompoundModel(state) {
      state.modelShowOptions = true;
      this.commit('showViewer');
      Jmol.script(myJmol, `load ASYNC https://cactus.nci.nih.gov/chemical/structure/${state.singleCompoundData.IsomericSMILES}/file;set antialiasDisplay true;refresh;`);
    },
    mountOrbitalModel(state) {
      state.modelShowOptions = false;
      this.commit('showViewer');
      Jmol.script(myJmol, 'refresh;set antialiasDisplay true;axes 2;axes MOLECULAR;zoom 0;');
    },
    JmolScript(state, script) {
      Jmol.script(myJmol, script);
    },
    toggleFullscreen(state) {
      state.fullscreen = !state.fullscreen;
      Jmol.script(myJmol, 'refresh;');
    },
    setCompound(state, compound) {
      state.compound = compound;
    },
    setSingleCompoundData(state, scd) {
      state.singleCompoundData = scd;
    },
    setActiveTab(state, index) {
      state.activeMenuTab = index;
    },
    hideViewer(state) {
      document.querySelector('.app').append(document.querySelector('.viewerWrapper'));
      Jmol.script(myJmol, 'delete;');
      document.querySelector('.viewerWrapper').style.display = 'none';
      state.fullscreen = false;
    },
    showViewer() {
      document.querySelector('.viewerWrapper').style.display = 'block';
      document.querySelector('.elementInfo-wrapper .modelViewer').append(document.querySelector('.viewerWrapper'));
    },
  },
  actions: {
    getSingleCompoundData({
      state, getters,
    }) {
      state.loading = 'Ładuję...';
      state.error = false;
      fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/fastformula/${state.compound}/property/MolecularWeight,MolecularFormula,IsomericSMILES/JSON`)
        .then((response) => response.json())
        .then((body) => {
          state.compoundListData = body.PropertyTable.Properties;
          fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${getters.getFilteredCompoundData(body.PropertyTable.Properties).CID}/property/MolecularWeight,MolecularFormula,CanonicalSMILES,IsomericSMILES,IUPACName,XLogP,ExactMass,MonoisotopicMass,TPSA,Complexity,Charge,RotatableBondCount,AtomStereoCount,BondStereoCount,CovalentUnitCount,Volume3D/JSON`)
            .then((response) => response.json())
            .then((bodyInner) => {
              [state.singleCompoundData] = bodyInner.PropertyTable.Properties;
              state.loading = false;
            });
        })
        .catch((error) => {
          if (error.message === 'Failed to fetch') {
            state.error = 'Sprawdź swoje połączenie internetowe.';
          } else {
            state.error = 'Nie znaleziono związku w bazie. Związek najprawdopodobniej nie istnieje.';
          }
          state.loading = false;
          throw new Error(`API ${error}`);
        });
    },
    getDataFromCID({ state, commit }, cid) {
      state.compoundInfoListLoading = true;
      fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/property/MolecularWeight,MolecularFormula,CanonicalSMILES,IsomericSMILES,IUPACName,XLogP,ExactMass,MonoisotopicMass,TPSA,Complexity,Charge,RotatableBondCount,AtomStereoCount,BondStereoCount,CovalentUnitCount,Volume3D/JSON`)
        .then((response) => response.json())
        .then((body) => {
          [state.singleCompoundData] = body.PropertyTable.Properties;
          state.compoundInfoListLoading = false;
        })
        .then(() => {
          commit('compoundRegExp', document.querySelector('.MolecularFormula .value'));
        });
    },
    get3DSimiliarCompounds({ state }) {
      state.compoundListLoading = 'Ładuję...';
      state.listError = false;
      fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/fastsimilarity_3d/cid/${state.singleCompoundData.CID}/property/MolecularWeight,MolecularFormula,CanonicalSMILES,IsomericSMILES,IUPACName,XLogP,ExactMass,MonoisotopicMass,TPSA,Complexity,Charge,RotatableBondCount,AtomStereoCount,BondStereoCount,CovalentUnitCount,Volume3D/JSON?listkey_start=0&listkey_count=100`)
        .then((response) => response.json())
        .then((body) => {
          state.compoundListData = body.PropertyTable.Properties;
          state.compoundListLoading = false;
        })
        .catch((error) => {
          state.compoundListLoading = false;
          state.listError = Error(`API ${error}`);
          throw new Error(`API ${error}`);
        });
    },
    getCompoundData({ state, dispatch }) {
      state.compoundListLoading = 'Ładuję...';
      state.error = false;
      fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/substructure/cid/${state.singleCompoundData.CID}/JSON`)
        .then((response) => response.json())
        .then((body) => {
          state.compoundListLoading = 'Pobieram dane...';
          const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/listkey/${body.Waiting.ListKey}/property/MolecularWeight,MolecularFormula,CanonicalSMILES,IsomericSMILES,IUPACName/JSON?listkey_start=0&listkey_count=100`;
          dispatch('fetchRetry', url);
        })
        .catch((error) => {
          state.compoundListLoading = false;
          state.error = Error(`API ${error}`);
          throw new Error(`API ${error}`);
        });
    },
    fetchRetry: async ({ state, dispatch }, url) => {
      const res = await fetch(url);
      if (res.ok) {
        return res.json()
          .then((body) => {
            if (body.Waiting) {
              dispatch('fetchRetry', url);
            } else {
              state.compoundListLoading = false;
              state.compoundListData = data.PropertyTable.Properties;
            }
          });
      }
      throw new Error('Error while fetching properties.');
    },
    getModel({ rootState }) {
      const color = rootState.themes.theme === 'dark' ? '#000000' : '#FFFFFF';
      const Info = {
        color,
        height: '100%',
        width: '100%',
        console: 'myJmol_infodiv',
        appletLoadingImage: '/loading.svg',
        use: 'WebGL',
        j2sPath: '/jsmol/j2s',
        serverURL: '/jsmol/php/jsmol.php',
        disableJ2SLoadMonitor: true,
        zIndexBase: 102,
        language: 'PL_pl',
        addSelectionOpions: false,
      };
      Jmol.getApplet('myJmol', Info);
      document.getElementById('viewer').innerHTML = Jmol.getAppletHtml(myJmol);
    },
    getCompound: ({ state, rootState }) => {
      state.loading = true;
      state.compound = '';
      for (let i = 1; i <= rootState.math.noa; i += 1) {
        state.compound += rootState.tabledata[rootState.chosenElementAtomIndex[i]].symbol;
        state.compound += rootState.math.elementQuantity[i] > 1
          ? rootState.math.elementQuantity[i]
          : '';
      }
    },
    getSingleData: ({ dispatch }) => {
      dispatch('getCompound');
      dispatch('getSingleCompoundData');
    },
  },
  getters: {
    getFilteredCompoundData: (state, getters, rootState) => (body) => {
      let num = Math.round(`${rootState.math.sum}e${3}`);
      num = Number(`${num}e${-3}`);
      return body.filter((property) => Math.abs(1 - property.MolecularWeight / num) < 0.01)[0];
    },
  },
};

export default data;
