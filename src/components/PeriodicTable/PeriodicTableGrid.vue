<template>
	<div class="inline">
		<Legend />
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
				:atomicNumber="atom.atomicNumber"
				:symbol="atom.symbol"
				:name="atom.name"
				:info="atom.name ? atom[mainInfo] : {}"
				:index="atom.index"
				@click="this.chooseAtomFromTable(atom)"
			/>
			<Watermark class="watermark" />
		</ul>
	</div>
</template>
<script>
import GridCell from "./PeriodicTable__/GridCell.vue";
import Legend from "./PeriodicTable__/Legend.vue";
import Watermark from "./PeriodicTable__/Watermark.vue";
import { mapState, mapActions } from "vuex";

export default {
	name: "Periodic Table",
	components: { GridCell, Legend, Watermark },
	methods: {
		...mapActions(["chooseAtomFromTable"]),
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
			searchQuery: (state) => state.global.searchQuery,
		}),
	},
};
</script>
