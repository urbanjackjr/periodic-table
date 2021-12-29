<template>
	<ul :class="['table', tableMode]">
		<Legend />
		<Cell
			v-for="atom in tabledata"
			:class="[
				!atom.symbol ? 'h' : '',
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
		<Watermark class="watermark" />
	</ul>
</template>
<script>
import Cell from "./PeriodicTableGrid/Cell.vue";
import Legend from "./PeriodicTableGrid/Legend.vue";
import Watermark from "./PeriodicTableGrid/Watermark.vue";
import { mapState, mapActions } from "vuex";

export default {
	name: "Periodic Table",
	components: { Cell, Legend, Watermark },
	data() {
		return {
			loading: false,
		}
	},
	methods: {
		...mapActions(["chooseAtomFromTable"]),
	},
	computed: {
		...mapState({
			tabledata: (state) => state.tabledata,
			mainInfo: (state) => state.mainInfo,
			tableMode: (state) => state.global.tableMode,
			modeLoading: (state) => state.global.modeLoading,
		}),
	},
};
</script>
