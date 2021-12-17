<template>
	<div class="calculator-wrapper" @click="calculateHeight">
		<CalculatorToggle
			:style="{ paddingBottom: show ? 30 : 15 }"
			@click="showCalc"
		/>
		<transition name="show">
			<div
				class="calcWithCompoundList"
				v-if="show"
				:style="{ maxHeight: height + 'px' }"
			>
				<div class="calculator">
					<ChoiceOverlay v-if="chooseElement" />
					<div
						class="calcInner"
						:style="{ filter: chooseElement ? 'blur(10px)' : '' }"
					>
						<Compound />
						<transition-group
							name="calc-list"
							appear
							tag="div"
							class="calcChoose"
						>
							<CalculatorChoose
								v-for="n in noa"
								:symbol="tabledata[cEAI[n]].symbol"
								:ma="atomicMass(n)"
								:wi="wi(n)"
								:n="n"
								:key="n"
								class="calcChooseAtom"
							/>
							<div
								class="line"
								v-if="noa > 2"
								@click="subtractAtom"
							></div>
							<div
								@click="addAnotherAtom"
								v-if="noa < 5"
								class="plus"
							></div>
						</transition-group>
					</div>
				</div>
				<transition name="fade">
					<CompoundInfo v-if="showCompoundInfo" />
				</transition>
			</div>
		</transition>
	</div>
</template>
<script>
import CalculatorChoose from "./Calculator/CalculatorChoose.vue";
import CalculatorToggle from "./Calculator/CalculatorToggle.vue";
import CompoundInfo from "./Calculator/CompoundInfo.vue";
import Compound from "./Calculator/Compound.vue";
import ChoiceOverlay from "./Calculator/ChoiceOverlay.vue";
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
	name: "Calculator",
	components: {
		CalculatorChoose,
		CalculatorToggle,
		Compound,
		CompoundInfo,
		ChoiceOverlay,
	},
	props: {
		indexes: Array,
	},
	methods: {
		...mapMutations(["addAnotherAtom", "subtractAtom", "showCalc"]),
	},
	computed: {
		...mapState({
			tabledata: "tabledata",
			noa: (state) => state.math.noa,
			elementQuantity: (state) => state.math.elementQuantity,
			showCompoundInfo: (state) => state.data.showCompoundInfo,
			cEAI: "chosenElementAtomIndex",
			chooseElement: "chooseElement",
			height: "height",
			show: "show",
		}),
		...mapGetters(["atomicMass", "wi"]),
	},
	emits: ["clicked"],
};
</script>
