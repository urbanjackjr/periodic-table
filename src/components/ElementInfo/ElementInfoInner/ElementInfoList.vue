<template>
    <ul>
		<ElementInfoListItem
			v-for="(loopValue, key) in properties(index, 3)"
			:infoInstanceKey="translations[key]"
			:infoInstanceValue="loopValue.value"
			:infoInstanceUnit="loopValue.unit"
			:key="key"
		/>
    </ul>
</template>
<script>
import ElementInfoListItem from "./ElementInfoList/ElementInfoListItem.vue";
import { mapState, mapGetters } from "vuex";
import translations from "../../../assets/translations.json";

export default {
    name: "Element Info List",
	props: {
		infoInstanceKey: String,
		infoInstanceValue: [String, Number],
		infoInstanceUnit: Array,
        index: Number,
	},
    components: { ElementInfoListItem },
	data() {
		return {
			translations: translations,
		};
	},
    computed: {
		...mapGetters(["properties"]),
		...mapState({
			tableMode: (state) => state.global.tableMode,
		})
    },
	mounted() {
		if(this.tableMode == 'list') {
			this.$store.commit('stopModeLoading');
			this.$store.commit('turnListAlive');
		}
	},
}
</script>