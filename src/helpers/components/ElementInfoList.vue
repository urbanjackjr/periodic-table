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
						@clicked="getUnitFromChildComponent, calculateValueOnUnitChange(loopValue.value)"
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
import { mapGetters } from 'vuex';

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
			console.log(this.unit)
		},
		calculateValueOnUnitChange(value) {
			// console.log(this.unit);
			this.value = value;
			switch (this.unit) {
				case "Å":
					value =
						this.value / 100;
					break;
				case "°C":
					value =
						Math.round((this.value - 273.15) * 100) /
						100;
					break;
				case "°F":
					value =
						Math.round(
							(((this.value - 273.15) * 9) / 5 + 32) *
								100
						) / 100;
					break;
				case "eV":
					value =
						Math.round(this.value * 0.01036427 * 100) /
						100;
					break;
				case "kg/m^3":
					value =
						Math.round(this.value * 1000 * 100) / 100;
					break;
				default:
					value = value;
					break;
			}
		},
		preparedForRenderValue(key, value) {
			return key == "Konfiguracja elektronowa" ||
				key == "Pełna konfiguracja elektronowa"
				? value.replace(
						/(\d[a-z])(\d+)/g,
						"$1<sup>$2</sup>"
				  )
				: value;
		},
	},
	computed: {
		...mapGetters(["properties"]),
	},
};
</script>
