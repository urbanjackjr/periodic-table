<template>
  <ul
    ref="compoundList"
    class="compoundList"
  >
    <li
      v-for="compound in data"
      :key="compound.CID"
      @click="loadNewCompound(compound)"
    >
      <span class="molecularFormula">{{
        compound.MolecularFormula
      }}</span>
      <span class="moreInfo">{{ compound.IsomericSMILES }}</span>
    </li>
  </ul>
</template>
<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'CompoundListData',
  computed: {
    ...mapState({
      data: (state) => state.data.compoundListData,
      activeTab: (state) => state.data.activeMenuTab,
    }),
  },
  mounted() {
    // sub/sup Compound Formula RegEx
    this.$nextTick(() => {
      for (let i = 0; i < this.data.length; i += 1) {
        this.compoundRegExp(
          document.getElementsByClassName('molecularFormula')[i],
        );
      }
    });
  },
  methods: {
    ...mapMutations([
      'setSingleCompoundData',
      'loadNewCompoundModel',
      'compoundRegExp',
      'setActiveTab',
    ]),
    loadNewCompound(newCompound) {
      this.setActiveTab(0);
      this.loadNewCompoundModel(newCompound.IsomericSMILES);
      this.$store.commit(
        'compoundRegExp',
        document.querySelector('.MolecularFormula'),
      );
      this.$store.dispatch('getDataFromCID', newCompound.CID);
    },
  },
};
</script>
