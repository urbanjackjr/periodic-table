<template>
	<Loading :status="modeLoading" />
	<PeriodicTableGrid />
</template>
<script>
import Loading from "../helpers/components/Loading.vue";
import PeriodicTableGrid from "./PeriodicTable/PeriodicTableGrid.vue";
import { mapState, mapActions } from "vuex";

export default {
	name: "Periodic Table",
	components: { PeriodicTableGrid, Loading },
	data() {
		return {
			// modeLoading: false,
		}
	},
	methods: {
		...mapActions(["chooseAtomFromTable"]),
	},
	computed: {
		...mapState({
			modeLoading: (state) => state.global.modeLoading,
		}),
	},
};
</script>
