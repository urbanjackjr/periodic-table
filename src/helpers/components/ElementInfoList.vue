<template>
	<ul class="elementInfoList">
		<li v-for="(loopValue, key) in properties(index, 6)" :key="key">
			<span class="key">{{ translations[key] }}:</span>
			<span class="value">
				<span v-html="preparedForRenderValue(translations[key], loopValue.value)"></span>
				<div
					v-if="loopValue.unit"
					:class="[loopValue.unit.length > 1 && 'relative', 'unit']"
				>
					<DropDownList
						v-if="loopValue.unit.length > 1"
						:info="loopValue.unit"
						@unitChange="calculateValueOnUnitChange(loopValue.value)"
						@clicked="getUnitFromChildComponent"
					/>
					<span v-else>{{ loopValue.unit[0] }}</span>
				</div>
			</span>
		</li>
	</ul>
</template>
<script>
import DropDownList from "./DropDownList.vue";
import translations from "../../assets/translations.json";
import { mapGetters, mapState } from 'vuex';

export default {
	name: "Element Info List",
	props: {
		index: Number,
	},
	components: { DropDownList },
	data() {
		return {
			unit: "",
			value: "",
			calculatedInfoInstanceValue: '',
			translations: translations,
		};
	},
	methods: {
		getUnitFromChildComponent(unit) {
			this.unit = unit;
		},
		calculateValueOnUnitChange(value) {
			console.log(this.unit);
			switch (this.unit) {
				case "Å":
					return value / 100;
				case "°C":
					return Math.round((value - 273.15) * 100) /
						100;
				case "°F":
					return value =
						Math.round(
							(((value - 273.15) * 9) / 5 + 32) *
								100
						) / 100;
				case "eV":
					return value =
						Math.round(value * 0.01036427 * 100) /
						100;
				case "kg/m^3":
					return value =
						Math.round(value * 1000 * 100) / 100;
				default:
					return value;
			}
		},
		preparedForRenderValue(key, value) {
			return key == "Konfiguracja elektronowa" ||
				key == "Pełna konfiguracja elektronowa"
				? value.replace(
						/(\d[a-z])(\d+)/g,
						"$1<sup>$2</sup>"
				  )
				: this.calculateValueOnUnitChange(value);
		},
	},
	computed: {
		...mapGetters(["properties"]),
		...mapState({
			modeLoading: (state) => state.global.modeLoading,
			listAlive: (state) => state.global.listAlive
		})
	},
	mounted() {
		this.$store.commit('stopModeLoading');
		this.$store.commit('turnListAlive');
	},
};
</script>
