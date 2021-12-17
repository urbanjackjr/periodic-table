<template lang="">
	{{ animatedNumber }}
</template>
<script>
import { gsap } from "gsap";

export default {
	props: { number: Number },

	data() {
		return {
			tweenedNumber: this.number,
		};
	},
	computed: {
		animatedNumber: function () {
			return this.tweenedNumber.toFixed(4);
		},
	},
	watch: {
		number: function (newValue) {
			gsap.to(this.$data, { duration: 0.3, tweenedNumber: newValue });
		},
	},
};
</script>
