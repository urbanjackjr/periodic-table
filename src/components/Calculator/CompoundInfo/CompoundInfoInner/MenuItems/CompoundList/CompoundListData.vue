<template>
  <ul class="compoundList" ref="compoundList">
    <li v-for="compound in data" :key="compound.CID">
      <a
        class="compoundLink"
        @click="loadNewCompound(compound)"
        >{{ compound.MolecularFormula }}</a
      >
    </li>
  </ul>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "Compound List Data",
  methods: {
    ...mapMutations(["setSingleCompoundData", "loadNewCompoundModel", "compoundRegExp", "setActiveTab"]),
    loadNewCompound(newCompound) {
        this.setActiveTab(0);
        this.loadNewCompoundModel(newCompound.IsomericSMILES)
        this.$store.commit("compoundRegExp", document.querySelector(".MolecularFormula"));
        this.$store.dispatch("getDataFromCID", newCompound.CID)
    }
  },
  computed: {
    ...mapState({
      data: (state) => state.data.compoundListData,
      activeTab: (state) => state.data.activeMenuTab,
    }),
  },
  mounted: function () {
    // sub/sup Compound Formula RegEx
    this.$nextTick(function () {
      for (let i = 0; i < this.data.length; i++) {
          this.compoundRegExp(document.getElementsByClassName("compoundLink")[i]);
      }
    });
  },
};
</script>
