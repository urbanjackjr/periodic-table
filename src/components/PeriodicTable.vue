<template>
	<PeriodicTableGrid />
</template>
<script>
import Loading from "../helpers/components/Loading.vue";
import PeriodicTableGrid from "./PeriodicTable/PeriodicTableGrid.vue";
import { mapState, mapActions } from "vuex";

export default {
	name: "Periodic Table",
	components: { PeriodicTableGrid, Loading },
	methods: {
		...mapActions(["chooseAtomFromTable"]),
	},
	computed: {
		...mapState({
			tableMode: (state) => state.global.tableMode,
		}),
	},
};
</script>
