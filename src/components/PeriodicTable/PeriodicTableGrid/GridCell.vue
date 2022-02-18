<template>
	<li>
        <div :class="['mainInfo', cellClass]">
            <h2>
                <span class="atomicNumber">{{ atomicNumber }}</span
                >{{ symbol }}
            </h2>
            <h6 class="elementName">{{ name }}</h6>
            <data class="elementInfo">{{ info.value }}</data>
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
	</li>
</template>
<script>
import translations from "../../../assets/translations.json";
import { mapState, mapGetters } from "vuex";

export default {
	name: "Cell",
	props: {
		mode: String,
	},
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
