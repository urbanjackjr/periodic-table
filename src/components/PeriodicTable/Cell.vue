<template>
	<li>
		<div class="mainInfo">
			<h2>
				<span class="atomicNumber">{{ atomicNumber }}</span
				>{{ symbol }}
			</h2>
			<h6 class="elementName">{{ name }}</h6>
			<h6 class="elementInfo">{{ info.value }}</h6>
		</div>
		<div
			:style="{
				height:
					typeof info.value === 'number'
						? (Math.abs(info.value) * 100) / max + '%'
						: 0,
			}"
			class="visualizer"
		></div>
	</li>
</template>
<script>
	import { mapState } from "vuex";

	export default {
		name: "Cell",
		props: {
			symbol: String,
			name: String,
			atomicNumber: [String, Number],
			info: Object,
		},
		computed: {
			...mapState(["max"]),
		},
	};
</script>
