<template>
  <div class="elementInfo-wrapper compound">
    <div
      class="back"
      @click="hideCompoundInfo()"
    />
    <div class="elementInfo">
      <div :class="['modelViewer', fullscreen ? 'fullscreen' : '']" />
      <div class="elementHeader">
        <h2
          class="MolecularFormula"
          v-html="regExpMolecularFormula"
        />
      </div>
      <TabbedMenu :items="['Informacje o związku', 'Inne związki']">
        <CompoundInfoList v-show="activeTab == 0" />
        <CompoundList v-show="activeTab == 1" />
      </TabbedMenu>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import TabbedMenu from '../../../helpers/components/TabbedMenu.vue';
import Viewer from '../../../helpers/components/Viewer.vue';
import CompoundInfoList from './CompoundInfoInner/MenuItems/CompoundInfoList.vue';
import CompoundList from './CompoundInfoInner/MenuItems/CompoundList.vue';

export default {
  name: 'CompoundInfoInner',
  components: {
    CompoundInfoList, TabbedMenu, CompoundList, Viewer,
  },
  computed: {
    ...mapState({
      data: (state) => state.data.singleCompoundData,
      activeTab: (state) => state.data.activeMenuTab,
      fullscreen: (state) => state.data.fullscreen,
    }),
    regExpMolecularFormula() {
      return this.data.MolecularFormula.replace(
        /((?<!\+|-|\/|(>\d*))\d+)/g,
        '<sub>$1</sub>',
      ).replace(/(-|\+)\d?/g, '<sup>$&</sup>');
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$store.commit('mountCompoundModel');
    });
  },
  methods: {
    ...mapMutations(['mountCompoundModel']),
    hideCompoundInfo() {
      this.$store.state.data.showCompoundInfo = false;
    },
  },
};
</script>
