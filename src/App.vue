<template>
  <div class="wrapper">
    <GlobalSettings />
    <Calculator />
    <TableSettings />
    <PeriodicTable />
    <ElementInfo />
    <AppFooter />
    <Viewer viewer-id="viewer" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PeriodicTable from './components/PeriodicTable.vue';
import ElementInfo from './components/ElementInfo.vue';
import Calculator from './components/Calculator.vue';
import GlobalSettings from './components/GlobalSettings.vue';
import TableSettings from './components/TableSettings.vue';
import AppFooter from './components/AppFooter.vue';
import Viewer from './helpers/components/Viewer.vue';

export default {
  name: 'App',
  components: {
    PeriodicTable,
    ElementInfo,
    Calculator,
    GlobalSettings,
    TableSettings,
    AppFooter,
    Viewer,
  },
  computed: {
    ...mapState({
      tabledata: 'tabledata',
    }),
  },
  created() {
    this.mountJSmol();
    this.$store.dispatch('loadData');
    this.$store.commit('maxValue');
  },
  methods: {
    mountJSmol() {
      const interval = setInterval(() => {
        if (window.Jmol) {
          this.$store.dispatch('getModel');
          clearInterval(interval);
        }
      }, 0);
    },
  },
};
</script>
