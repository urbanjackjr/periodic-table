<template>
	<PropertyChoice v-if="tableMode == 'grid'" />
	<PeriodicTableGrid />
</template>
<script>
import Loading from "../helpers/components/Loading.vue";
import PeriodicTableGrid from "./PeriodicTable/PeriodicTableGrid.vue";
import PropertyChoice from "./PeriodicTable/PropertyChoice.vue";
import { mapState, mapActions } from "vuex";

export default {
	name: "Periodic Table",
	components: { PeriodicTableGrid, PropertyChoice, Loading },
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
