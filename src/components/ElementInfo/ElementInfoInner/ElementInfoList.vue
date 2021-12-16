<template>
	<li v-if="infoInstanceValue">
		<span class="key">{{ infoInstanceKey }}:</span>
		<span class="value">
			<span v-html="preparedForRenderValue"></span>
			<div v-if="infoInstanceUnit && infoInstanceUnit.length > 1" class="relative">
				<DropDownList :info="infoInstanceUnit" @clicked="calculateValueOnUnitChange" />
			</div>
		</span>
	</li>
</template>
<script>
	import DropDownList from "../../../helpers/components/DropDownList.vue";

	export default {
		name: "Element Info List",
		props: {
			infoInstanceKey: String,
			infoInstanceValue: [String, Number],
			infoInstanceUnit: Array,
		},
		components: { DropDownList },
		data() {
			return {
				unit: "",
				calculatedInfoInstanceValue: this.infoInstanceValue,
			};
		},
		methods: {
			calculateValueOnUnitChange(value) {
				this.unit = value;
				switch (value) {
					case "Å":
						this.calculatedInfoInstanceValue =
							this.infoInstanceValue / 100;
						break;
					case "°C":
						this.calculatedInfoInstanceValue =
							Math.round((this.infoInstanceValue - 273.15) * 100) / 100;
						break;
					case "°F":
						this.calculatedInfoInstanceValue =
							Math.round((((this.infoInstanceValue - 273.15) * 9) / 5 + 32) * 100) / 100;
						break;
					case "eV":
						this.calculatedInfoInstanceValue =
							Math.round(this.infoInstanceValue * 0.01036427 * 100) /
							100;
						break;
					case "kg/m^3":
						this.calculatedInfoInstanceValue =
							Math.round(this.infoInstanceValue * 1000 * 100) / 100;
						break;
					default:
						this.calculatedInfoInstanceValue = this.infoInstanceValue;
						break;
				}
			},
		},
		computed: {
			preparedForRenderValue() {
				return this.infoInstanceKey == "Konfiguracja elektronowa" ? this.calculatedInfoInstanceValue.replace(/(\d[s-z])(\d+)/gm, '$1<sup>$2</sup>') : this.calculatedInfoInstanceValue;
			}
		}
	};
</script>
