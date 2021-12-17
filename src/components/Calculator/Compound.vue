<template>
	<div class="compound-wrapper">
		<div class="compound">
			<span v-for="n in noa" :key="n"
				>{{ tabledata[cEAI[n]].symbol
				}}<sub>{{
					elementQuantity[n] > 1 ? elementQuantity[n] : ""
				}}</sub></span
			>
		</div>
		<div class="info">
			<h3>m<sub>a</sub> = <Count :number="compoundAtomicMass" /></h3>
			<button
				class="showCompoundInfo"
				@click="
					getSingleData;
					showCompoundInfo();
				"
			>
				Informacje o związku
			</button>
		</div>
	</div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
import Count from "../../helpers/components/Count.vue";

export default {
	name: "Compound",
	components: { Count },
	data() {
		return {
			ro: new ResizeObserver((entries) => {
				document.querySelector(".calculator")
					? this.$store.commit("maxHeight")
					: "";
			}),
		};
	},
	methods: {
		showCompoundInfo() {
			this.$store.state.data.showCompoundInfo = true;
		},
	},
	mounted() {
		this.ro.observe(document.querySelector(".calculator"));
	},
	unmounted() {
		this.ro.disconnect();
	},
	computed: {
		...mapState({
			tabledata: "tabledata",
			noa: (state) => state.math.noa,
			elementQuantity: (state) => state.math.elementQuantity,
			cEAI: "chosenElementAtomIndex",
		}),
		...mapActions(["getSingleData"]),
		...mapGetters(["compoundAtomicMass", "compoundText"]),
	},
};
</script>
