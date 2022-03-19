<template>
	<LazyRender :index="atomicNumber">
			<div :class="['mainInfo', cellClass]">
				<h2>
					<span class="atomicNumber">{{ atomicNumber }}</span
					>{{ symbol }}
				</h2>
				<h6 class="elementName">{{ name }}</h6>
			</div>
			<ElementInfoList class="elementInfoList" :index="index" />
	</LazyRender>
</template>
<script>
import translations from "../../../assets/translations.json";
import LazyRender from "../../../helpers/components/LazyRender.vue";
import { defineAsyncComponent } from 'vue';
// import ElementInfoList from "../../ElementInfo/ElementInfoInner/ElementInfoList.vue";
const ElementInfoList = defineAsyncComponent(() => import("../../ElementInfo/ElementInfoInner/ElementInfoList.vue"))
import { mapState, mapGetters } from "vuex";

export default {
	name: "Cell",
	components: { ElementInfoList, LazyRender },
	data() {
		return {
			translations: translations,
		}
	},
	props: {
		symbol: String,
		name: String,
		atomicNumber: [String, Number],
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
