<template>
	<div class="tableWrap">
		<TableSettings />
		<PeriodicTableGrid v-show="tableMode === 'grid'" />
		<PeriodicTableList v-show="tableMode === 'list'" />
	</div>
</template>
<script>
import TableSettings from "./PeriodicTable/TableSettings.vue";
import PeriodicTableGrid from "./PeriodicTable/PeriodicTableGrid.vue";
import PeriodicTableList from "./PeriodicTable/PeriodicTableList.vue";
import { mapState } from "vuex";

export default {
	name: "Periodic Table",
	components: { PeriodicTableGrid, PeriodicTableList, TableSettings },
	computed: {
		...mapState({
			tableMode: (state) => state.global.tableMode,
		}),
	},
};
</script>
