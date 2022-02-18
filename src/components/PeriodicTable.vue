<template>
	<PeriodicTableGrid v-show="tableMode === 'grid'" />
	<PeriodicTableList v-show="tableMode === 'list'" />
</template>
<script>
import Loading from "../helpers/components/Loading.vue";
import PeriodicTableGrid from "./PeriodicTable/PeriodicTableGrid.vue";
import PeriodicTableList from "./PeriodicTable/PeriodicTableList.vue";
import { mapState } from "vuex";

export default {
	name: "Periodic Table",
	components: { PeriodicTableGrid, PeriodicTableList, Loading },
	computed: {
		...mapState({
			tableMode: (state) => state.global.tableMode,
		}),
	},
};
</script>
