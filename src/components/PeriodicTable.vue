<template>
	<img src="/loading.svg" v-if="isLoading" />
	<ul v-if="!isLoading" class="table">
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
			:key="atom.index"
			@click="this.chooseAtomFromTable(atom)"
		/>
		<Watermark class="watermark" />
	</ul>
</template>
<script>
import Cell from "./PeriodicTable/Cell.vue";
import Legend from "./PeriodicTable/Legend.vue";
import Watermark from "./PeriodicTable/Watermark.vue";
import { mapState, mapActions } from "vuex";

export default {
	name: "Periodic Table",
	components: { Cell, Legend, Watermark },
	data() {
		return {
			isLoading: true,
		};
	},
	mounted() {
		this.$nextTick(() => {
			this.isLoading = false;
		});
	},
	methods: {
		...mapActions(["chooseAtomFromTable"]),
	},
	computed: {
		...mapState(["tabledata", "mainInfo"]),
	},
};
</script>
