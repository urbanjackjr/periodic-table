<template>
	<transition name="fade">
		<div class="elementInfo-wrapper" v-if="showAllInfoIndex !== -1">
			<ElementInfoInner />
		</div>
	</transition>
</template>
<script>
import ElementInfoInner from "./ElementInfo/ElementInfoInner.vue";
import { mapState } from "vuex";

export default {
	name: "Element Info",
	components: { ElementInfoInner },
	computed: {
		...mapState(["showAllInfoIndex"]),
	},
};
</script>
