<template>
	<div class="propertyChoice">
		<DropDownList
			:info="Object.keys(properties(0, 6))"
			:translated="true"
			@clicked="childClick"
		/>
	</div>
</template>
<script>
import DropDownList from "../helpers/components/DropDownList.vue";
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
	name: "Property Choose",
	components: { DropDownList },
	methods: {
		...mapMutations(["changeInfo", "maxValue"]),
		childClick(value) {
			this.changeInfo(value);
			this.$store.commit("maxValue");
		},
	},
	computed: {
		...mapState(["mainInfo"]),
		...mapGetters(["properties"]),
	},
};
</script>
