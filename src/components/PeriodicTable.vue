<template>
  <div class="tableWrap">
    <PeriodicTableGrid v-show="tableMode === 'grid'" />
    <PeriodicTableList v-show="tableMode === 'list'" />
  </div>
</template>
<script>
import { mapState } from 'vuex';
import PeriodicTableGrid from './PeriodicTable/PeriodicTableGrid.vue';
import PeriodicTableList from './PeriodicTable/PeriodicTableList.vue';

export default {
  name: 'PeriodicTable',
  components: { PeriodicTableGrid, PeriodicTableList },
  computed: {
    ...mapState({
      tableMode: (state) => state.global.tableMode,
    }),
  },
};
</script>
