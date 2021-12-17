<template>
	<div :class="['modelViewer', fullscreen ? 'fullscreen' : '']">
		<div :id="viewerId"></div>
		<ViewerOptions v-if="showOptions" />
	</div>
</template>
<script>
import ViewerOptions from "./Viewer/ViewerOptions.vue";
import { mapState } from "vuex";

export default {
	name: "Viewer",
	components: { ViewerOptions },
	props: {
		viewerId: String,
		showOptions: Boolean,
	},
	computed: {
		...mapState({
			fullscreen: (state) => state.data.fullscreen,
		}),
	},
};
</script>
