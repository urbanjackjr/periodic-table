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
      	<span v-if="modeLoading">Loading...</span>
		<keep-alive>
			<ElementInfoList v-if="tableMode == 'list'" class="elementInfoList" :index="index" />
		</keep-alive>
	</li>
</template>
<script>
import translations from "../../../assets/translations.json";
import { defineAsyncComponent } from 'vue';
// import ElementInfoList from "../../ElementInfo/ElementInfoInner/ElementInfoList.vue";
const ElementInfoList = defineAsyncComponent(() => import("../../ElementInfo/ElementInfoInner/ElementInfoList.vue"))
import { mapState, mapGetters } from "vuex";

export default {
	name: "Cell",
	components: { ElementInfoList },
	data() {
		return {
			translations: translations,
		}
	},
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
			tableMode: (state) => state.global.tableMode,
			modeLoading: (state) => state.global.modeLoading
		}),
		...mapGetters(["properties"]),
	},
};
</script>
