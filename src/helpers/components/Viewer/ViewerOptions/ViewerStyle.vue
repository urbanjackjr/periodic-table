<template>
	<div class="modelStyle">
		<ul class="changeStyle">
			<li
				v-for="(type, index) in modelStyles"
				:key="type.name"
				@click="
					this.$store.commit('changeStyle', type.script);
					activeItem = index;
				"
			>
				<div :class="['radio', { active: index === activeItem }]"></div>
				{{ type.name }}
			</li>
		</ul>
	</div>
</template>
<script>
export default {
	name: "Viewer Style",
	data() {
		return {
			modelStyles: {
				ballAndStick: {
					name: "atomy i wiązania",
					script: "spacefill 23%;wireframe 0.15;",
				},
				stick: {
					name: "wiązania",
					script: "wireframe only;wireframe 0.15;",
				},
				spacefill: {
					name: "atomy",
					script: "spacefill only; spacefill 100%Rasmol",
				},
				wireframe: {
					name: "szkielet",
					script: "wireframe -0.1;",
				},
			},
			activeItem: "ballAndStick",
		};
	},
};
</script>
