<template>
	<div class="tableWrap">
		<PeriodicTableGrid v-show="tableMode === 'grid'" />
		<PeriodicTableList v-show="tableMode === 'list'" />
	</div>
</template>
<script>
import PeriodicTableGrid from "./PeriodicTable/PeriodicTableGrid.vue";
import PeriodicTableList from "./PeriodicTable/PeriodicTableList.vue";
import { mapState } from "vuex";

export default {
	name: "Periodic Table",
	components: { PeriodicTableGrid, PeriodicTableList },
	computed: {
		...mapState({
			tableMode: (state) => state.global.tableMode,
		}),
	},
};
</script>
