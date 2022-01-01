<template>
	<li>
		<div :class="['mainInfo', cellClass]">
			<h2>
				<span class="atomicNumber">{{ atomicNumber }}</span
				>{{ symbol }}
			</h2>
			<h6 class="elementName">{{ name }}</h6>
			<h6 v-if="tableMode == 'grid'" class="elementInfo">{{ info.value }}</h6>
			<div
				:style="{
					height:
						typeof info.value === 'number'
							? (Math.abs(info.value) * 100) / max + '%'
							: 0,
				}"
				class="visualizer"
			></div>
		</div>
		<keep-alive>
			<ElementInfoList v-if="tableMode == 'list'" :index="index" />
		</keep-alive>
	</li>
</template>
<script>
import { defineAsyncComponent } from 'vue';
// import ElementInfoList from "../../../helpers/components/ElementInfoList.vue";
const ElementInfoList = defineAsyncComponent(() => import("../../../helpers/components/ElementInfoList.vue"))
import { mapState } from "vuex";

export default {
	name: "Cell",
	components: { ElementInfoList },
	props: {
		symbol: String,
		name: String,
		atomicNumber: [String, Number],
		info: Object,
		index: Number,
		cellClass: Array,
	},
	computed: {
		...mapState({
			max: (state) => state.max,
			tableMode: (state) => state.global.tableMode
		})
	},
};
</script>
