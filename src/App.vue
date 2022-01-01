<template>
	<div class="wrapper">
		<GlobalSettings />
		<Calculator />
		<PeriodicTable />
		<ElementInfo />
	</div>
</template>

<script>
	import PeriodicTable from "./components/PeriodicTable.vue";
	import ElementInfo from "./components/ElementInfo.vue";
	import Calculator from "./components/Calculator.vue";
	import GlobalSettings from "./components/GlobalSettings.vue";
	import { mapState } from "vuex";

	export default {
		name: "app",
		components: {
			PeriodicTable,
			ElementInfo,
			Calculator,
			GlobalSettings,
		},
		created() {
			this.$store.dispatch("loadData");
			this.$store.commit("maxValue");
		},
		computed: {
			...mapState({
				tabledata: "tabledata",
			}),
		},
	};
</script>
