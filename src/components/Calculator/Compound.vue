<template>
  <div class="compound-wrapper">
    <div class="compound">
      <span
        v-for="n in noa"
        :key="n"
      >{{ tabledata[cEAI[n]].symbol
      }}<sub>{{
        elementQuantity[n] > 1 ? elementQuantity[n] : ""
      }}</sub></span>
    </div>
    <div class="info">
      <h3>m<sub>a</sub> = <AnimatedCount :number="compoundAtomicMass" /></h3>
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
import { mapState, mapGetters, mapActions } from 'vuex';
import AnimatedCount from '../../helpers/components/AnimatedCount.vue';

export default {
  name: 'Compound',
  components: { AnimatedCount },
  data() {
    return {
      ro: new ResizeObserver(() => {
        if (document.querySelector('.calculator')) {
          this.$store.commit('maxHeight');
        }
      }),
    };
  },
  computed: {
    ...mapState({
      tabledata: 'tabledata',
      noa: (state) => state.math.noa,
      elementQuantity: (state) => state.math.elementQuantity,
      cEAI: 'chosenElementAtomIndex',
    }),
    ...mapActions(['getSingleData']),
    ...mapGetters(['compoundAtomicMass', 'compoundText']),
  },
  mounted() {
    this.ro.observe(document.querySelector('.calculator'));
  },
  unmounted() {
    this.ro.disconnect();
  },
  methods: {
    showCompoundInfo() {
      this.$store.state.data.showCompoundInfo = true;
    },
  },
};
</script>
