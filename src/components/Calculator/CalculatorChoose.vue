<template>
  <div>
    <div>
      <button
        class="choose-atom-button"
        @click="elementChoice(n)"
      >
        Wybierz
      </button>
      <h2>
        Pierwiastek: <span class="symbol">{{ symbol }}</span>
      </h2>
      <h3>w<sub>i</sub> = <AnimatedCount :number="wi" /></h3>
      <h3>m<sub>a</sub> = <AnimatedCount :number="ma" /></h3>
      <div class="inputWrapper">
        <div
          class="line"
          @click="sub(n)"
        />
        <input
          v-model="elementQuantity[n]"
          type="number"
          name="elementNumber"
          min="1"
        >
        <div
          class="plus"
          @click="add(n)"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import AnimatedCount from '../../helpers/components/AnimatedCount.vue';

export default {
  components: { AnimatedCount },
  props: {
    symbol: {
      type: String,
      default: 'H',
    },
    ma: {
      type: Number,
      default: 0,
    },
    wi: {
      type: Number,
      default: 0,
    },
    n: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapState({
      elementQuantity: (state) => state.math.elementQuantity,
    }),
  },
  methods: {
    ...mapMutations(['elementChoice']),
    add(n) {
      this.elementQuantity[n] += 1;
    },
    sub(n) {
      if (this.elementQuantity[n] > 1) {
        this.elementQuantity[n] -= 1;
      }
    },
  },
};
</script>
