<template>
	<img v-if="theme === 'dark'" src="../../../assets/watermark-dark.png" />
	<img v-else src="../../../assets/watermark.png" />
</template>
<script>
import { mapState } from "vuex";

export default {
	name: "Watermark",
	computed: {
		...mapState({
			theme: (state) => state.themes.theme,
		}),
	},
};
</script>
