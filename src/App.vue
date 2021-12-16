<template>
	<div class="wrapper">
		<ThemeSwitch />
		<Calculator />
		<PropertyChoice />
		<PeriodicTable />
		<ElementInfo />
	</div>
</template>

<script>
	import PeriodicTable from "./components/PeriodicTable.vue";
	import PropertyChoice from "./components/PropertyChoice.vue";
	import ElementInfo from "./components/ElementInfo.vue";
	import Calculator from "./components/Calculator.vue";
	import ThemeSwitch from "./helpers/components/ThemeSwitch.vue";
	import { mapState } from "vuex";

	export default {
		name: "app",
		components: {
			PeriodicTable,
			PropertyChoice,
			ElementInfo,
			Calculator,
			ThemeSwitch,
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
