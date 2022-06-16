<template>
  <div class="inline">
    <TableLegend />
    <ul :class="['table', 'grid']">
      <GridCell
        v-for="atom in tabledata"
        :key="atom.index"
        :class="[
          !atom.symbol || isSearchedFor(atom.symbol, atom.name) ? 'h' : '',
          atom.groupBlock ? atom.groupBlock.value : '',
          atom.symbol == 'La-Lu' || atom.symbol == 'Ac-Lr'
            ? 'fBlockSymbol'
            : '',
        ]"
        :atomic-number="atom.atomicNumber"
        :symbol="atom.symbol"
        :name="atom.name"
        :info="atom.name ? atom[mainInfo] : {}"
        :index="atom.index"
        @click="chooseAtomFromTable(atom)"
      />
      <TableWatermark class="watermark" />
    </ul>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import GridCell from './PeriodicTable__/GridCell.vue';
import TableLegend from './PeriodicTable__/TableLegend.vue';
import TableWatermark from './PeriodicTable__/TableWatermark.vue';

export default {
  name: 'PeriodicTableGrid',
  components: { GridCell, TableLegend, TableWatermark },
  computed: {
    ...mapState({
      tabledata: (state) => state.tabledata,
      mainInfo: (state) => state.mainInfo,
      searchQuery: (state) => state.global.searchQuery,
    }),
  },
  methods: {
    ...mapActions(['chooseAtomFromTable']),
    isSearchedFor(symbol, name) {
      if (this.searchQuery.length && name) {
        if (!symbol.includes(this.searchQuery) && !name.includes(this.searchQuery)) {
          return true;
        }
        return false;
      }
      return false;
    },
  },
};
</script>
