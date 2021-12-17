<template>
	<div class="configBlocks">
		<ul
			v-for="(
				array, key, index
			) in configBlocksArrays.numberOfSubshellElectrons"
			:key="key"
			:class="key"
		>
			<ul
				v-for="n in numberOfShells[key]['shells']"
				:key="n"
				class="subShell"
			>
				{{
					n + index + numberOfShells[key]["symbol"]
				}}
				<li
					v-for="m in numberOfShells[key]['subShells']"
					:key="m"
					@click="loadOrbitalModel(n, index, m)"
					:class="valenceOrbitalClass(n, index, key, m)"
				>
					<span>{{
						drawElectrons(
							m,
							configBlocksArrays["numberOfSubshellElectrons"][
								key
							][n - 1],
							numberOfShells[key]["subShells"]
						)
					}}</span>
				</li>
			</ul>
		</ul>
	</div>
</template>
<script>
import { mapState, mapMutations } from "vuex";

export default {
	name: "Config Blocks Loop",
	props: {
		shown: Boolean,
	},
	data() {
		return {
			numberOfShells: {
				blockS: {
					shells: 7,
					subShells: 1,
					symbol: "s",
				},
				blockP: {
					shells: 6,
					subShells: 3,
					symbol: "p",
				},
				blockD: {
					shells: 4,
					subShells: 5,
					symbol: "d",
				},
				blockF: {
					shells: 2,
					subShells: 7,
					symbol: "f",
				},
			},
		};
	},
	methods: {
		drawElectrons(index, numberOfSubshellElectrons, shells) {
			if (numberOfSubshellElectrons > index + shells - 1) {
				return "↿⇂";
			} else if (numberOfSubshellElectrons >= index) {
				return "↿";
			} else {
				return "";
			}
		},
		valenceOrbitalClass(n, index, key, m) {
			if (
				n + index + this.numberOfShells[key]["symbol"] + m ==
					this.configBlocksArrays.splittedConfiguration[
						this.configBlocksArrays.splittedConfiguration.length - 1
					] ||
				n +
					index +
					this.numberOfShells[key]["symbol"] +
					(m + this.numberOfShells[key]["subShells"]) ==
					this.configBlocksArrays.splittedConfiguration[
						this.configBlocksArrays.splittedConfiguration.length - 1
					]
			) {
				this.$store.dispatch("getModel");
				this.$store.commit("mountOrbitalModel", "viewer");
				this.JmolScript(
					"isosurface phase atomicOrbital " +
						(n + index) +
						" " +
						index +
						" " +
						(-index + (m - 1))
				);
				return "active";
			}
		},
		...mapMutations(["JmolScript"]),
		loadOrbitalModel(n, index, m) {
			const promise = new Promise((resolve, reject) => {
				resolve(this.$emit("clicked"));
			});

			promise.then(() => {
				this.JmolScript(
					"isosurface phase delete;isosurface phase atomicOrbital " +
						(n + index) +
						" " +
						index +
						" " +
						(-index + (m - 1))
				);
			});
		},
	},
	computed: {
		configBlocksArrays() {
			let splittedConfiguration =
				this.tabledata[
					this.showAllInfoIndex
				].fullElectronicConfiguration.value.split(" ");
			let splittedBlockS = splittedConfiguration.filter((block) =>
				block.match(/\ds\d/)
			);
			let splittedBlockP = splittedConfiguration.filter((block) =>
				block.match(/\dp\d/)
			);
			let splittedBlockD = splittedConfiguration.filter((block) =>
				block.match(/\dd\d/)
			);
			let splittedBlockF = splittedConfiguration.filter((block) =>
				block.match(/\df\d/)
			);
			let numberOfSubshellSElectrons = [];
			let numberOfSubshellPElectrons = [];
			let numberOfSubshellDElectrons = [];
			let numberOfSubshellFElectrons = [];
			splittedBlockS.forEach((el) => {
				numberOfSubshellSElectrons.push(+el.match(/\d+$/)[0]);
			});
			splittedBlockP.forEach((el) => {
				numberOfSubshellPElectrons.push(+el.match(/\d+$/)[0]);
			});
			splittedBlockD.forEach((el) => {
				numberOfSubshellDElectrons.push(+el.match(/\d+$/)[0]);
			});
			splittedBlockF.forEach((el) => {
				numberOfSubshellFElectrons.push(+el.match(/\d+$/)[0]);
			});
			return {
				splittedConfiguration: splittedConfiguration,
				subShellArrays: {
					blockS: splittedBlockS,
					blockP: splittedBlockP,
					blockD: splittedBlockD,
					blockF: splittedBlockF,
				},
				numberOfSubshellElectrons: {
					blockS: numberOfSubshellSElectrons,
					blockP: numberOfSubshellPElectrons,
					blockD: numberOfSubshellDElectrons,
					blockF: numberOfSubshellFElectrons,
				},
			};
		},
		...mapState(["tabledata", "showAllInfoIndex"]),
	},
};
</script>
