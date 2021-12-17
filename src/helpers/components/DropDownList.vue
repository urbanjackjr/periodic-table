<template>
	<div :class="['dropDownList', down ? 'open' : '']">
		<div class="chosen" @click="down = !down">
			{{ translation(chosenInfo) }}
			<svg
				:style="{ transform: down ? 'rotate(180deg)' : 'rotate(0)' }"
				aria-hidden="true"
				focusable="false"
				data-prefix="fas"
				data-icon="chevron-down"
				class="svg-inline--fa fa-chevron-down fa-w-14"
				role="img"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 448 512"
			>
				<path
					fill="currentColor"
					d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
				></path>
			</svg>
		</div>
		<transition name="slide">
			<ul class="chooseInfo" v-show="down">
				<li
					v-for="value in info"
					:key="translation(value)"
					@click="defaultClickEvents(value)"
				>
					{{ translation(value) }}
				</li>
			</ul>
		</transition>
	</div>
</template>
<script>
import translations from "../../assets/translations.json";

export default {
	name: "Drop-Down List",
	props: {
		info: Array,
		translated: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			down: false,
			chosenInfo: this.info[0],
			translations: translations,
		};
	},
	methods: {
		translation(toTranslate) {
			return this.translated
				? this.translations[toTranslate]
				: toTranslate;
		},
		defaultClickEvents(value) {
			this.down = false;
			this.$emit("clicked", value);
			this.chosenInfo = value;
		},
	},
	emits: ["clicked"],
};
</script>
