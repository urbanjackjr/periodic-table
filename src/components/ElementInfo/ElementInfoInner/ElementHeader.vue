<template>
	<div class="elementHeader">
		<h2>
			<span>{{ properties.atomicNumber }}</span
			>{{ properties.symbol }}
		</h2>
		<h3 class="name">{{ properties.name }}</h3>
		<h3 class="groupBlock">{{ properties.groupBlock.value }}</h3>
	</div>
</template>
<script>
import { mapState } from "vuex";

export default {
	name: "Element Header",
	computed: {
		...mapState(["showAllInfoIndex"]),
		properties() {
			return this.$store.getters.properties(this.showAllInfoIndex, 3);
		},
	},
};
</script>
