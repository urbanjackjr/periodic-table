<template>
	<div>
		<div>
			<button class="choose-atom-button" @click="elementChoice(n)">
				Wybierz
			</button>
			<h2>
				Pierwiastek: <span class="symbol">{{ symbol }}</span>
			</h2>
			<h3>w<sub>i</sub> = <Count :number="wi" /></h3>
			<h3>m<sub>a</sub> = <Count :number="ma" /></h3>
			<div class="inputWrapper">
				<div class="line" @click="sub(n)"></div>
				<input
					type="number"
					name="elementNumber"
					min="1"
					v-model="elementQuantity[n]"
				/>
				<div class="plus" @click="add(n)"></div>
			</div>
		</div>
	</div>
</template>
<script>
import Count from "../../helpers/components/Count.vue";
import { mapState, mapMutations } from "vuex";

export default {
	components: { Count },
	props: {
		symbol: String,
		ma: Number,
		wi: Number,
		n: Number,
	},
	methods: {
		...mapMutations(["elementChoice"]),
		add(n) {
			this.elementQuantity[n]++;
		},
		sub(n) {
			this.elementQuantity[n] > 1
				? this.elementQuantity[n]--
				: this.elementQuantity[n];
		},
	},
	computed: {
		...mapState({
			elementQuantity: (state) => state.math.elementQuantity,
		}),
	},
};
</script>
