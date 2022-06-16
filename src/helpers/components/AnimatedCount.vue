<template lang="">
  {{ animatedNumber }}
</template>
<script>
import { gsap } from 'gsap';

export default {
  name: 'AnimatedCount',
  props: {
    number: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      tweenedNumber: this.number,
    };
  },
  computed: {
    animatedNumber() {
      return this.tweenedNumber.toFixed(4);
    },
  },
  watch: {
    number(newValue) {
      gsap.to(this.$data, { duration: 0.3, tweenedNumber: newValue });
    },
  },
};
</script>
