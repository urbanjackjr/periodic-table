<template>
	<ElementSearch @update:searchValue="searchUpdate" />
	<ul :class="['table', tableMode]">
		<PropertyChoice v-if="tableMode == 'grid'" />
		<Legend v-if="tableMode == 'grid'" />
		<Cell
			v-for="atom in tabledata"
			:class="[
				!atom.symbol || isSearchedFor(atom.symbol, atom.name) ? 'h' : '',
				atom.groupBlock ? atom.groupBlock.value : '',
				atom.symbol == 'La-Lu' || atom.symbol == 'Ac-Lr'
					? 'fBlockSymbol'
					: '',
			]"
			:atomicNumber="atom.atomicNumber"
			:symbol="atom.symbol"
			:name="atom.name"
			:info="atom.name ? atom[mainInfo] : {}"
			:index="atom.index"
			:key="atom.index"
			@click="this.chooseAtomFromTable(atom)"
		/>
		<Watermark v-if="tableMode == 'grid'" class="watermark" />
	</ul>
</template>
<script>
import ElementSearch from "./PeriodicTableGrid/ElementSearch.vue";
import Cell from "./PeriodicTableGrid/Cell.vue";
import Legend from "./PeriodicTableGrid/Legend.vue";
import PropertyChoice from "./PeriodicTableGrid/PropertyChoice.vue";
import Watermark from "./PeriodicTableGrid/Watermark.vue";
import { mapState, mapActions } from "vuex";

export default {
	name: "Periodic Table",
	components: { ElementSearch, Cell, Legend, PropertyChoice, Watermark },
	data() {
		return {
			searchQuery: '',
		}
	},
	methods: {
		...mapActions(["chooseAtomFromTable"]),
		searchUpdate(value) {
			this.searchQuery = value;
		},
		isSearchedFor(symbol, name) {
			if(this.searchQuery.length && name) {
				if(!symbol.includes(this.searchQuery) && !name.includes(this.searchQuery)) {
					return true;
				}
				return false;
			}
			return false;
		}
	},
	computed: {
		...mapState({
			tabledata: (state) => state.tabledata,
			mainInfo: (state) => state.mainInfo,
			tableMode: (state) => state.global.tableMode,
		}),
	},
};
</script>
