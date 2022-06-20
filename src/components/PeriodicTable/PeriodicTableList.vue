<template>
  <ul :class="['table', 'list']">
    <Cell
      v-for="atom in tabledata"
      :key="atom.index"
      :class="[
        !atom.symbol || isSearchedFor(atom.symbol, atom.name) ? 'h' : '',
        atom.groupBlock ? atom.groupBlock.value : '',
        atom.symbol == 'La-Lu' || atom.symbol == 'Ac-Lr'
          ? 'fBlockSymbol'
          : '',
      ]"
      :style="{order: atom.atomicNumber}"
      :atomic-number="atom.atomicNumber"
      :symbol="atom.symbol"
      :name="atom.name"
      :index="atom.index"
      @click="chooseAtomFromTable(atom)"
    />
  </ul>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import Cell from './PeriodicTable__/ListCell.vue';

export default {
  name: 'PeriodicTable',
  components: { Cell },
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
