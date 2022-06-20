<template>
  <div
    class="calculator-wrapper"
    @click="calculateHeight"
  >
    <CalculatorToggle
      :style="{ paddingBottom: show ? 30 : 15 }"
      @click="showCalc"
    />
    <transition name="show">
      <div
        v-if="show"
        class="calcWithCompoundList"
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
                :key="n"
                :symbol="tabledata[cEAI[n]].symbol"
                :ma="atomicMass(n)"
                :wi="wi(n)"
                :n="n"
                class="calcChooseAtom"
              />
              <div
                v-if="noa > 2"
                class="line"
                @click="subtractAtom"
              />
              <div
                v-if="noa < 5"
                class="plus"
                @click="addAnotherAtom"
              />
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
import { mapState, mapGetters, mapMutations } from 'vuex';
import CalculatorChoose from './Calculator/CalculatorChoose.vue';
import CalculatorToggle from './Calculator/CalculatorToggle.vue';
import CompoundInfo from './Calculator/CompoundInfo.vue';
import Compound from './Calculator/Compound.vue';
import ChoiceOverlay from './Calculator/ChoiceOverlay.vue';

export default {
  name: 'Calculator',
  components: {
    CalculatorChoose,
    CalculatorToggle,
    Compound,
    CompoundInfo,
    ChoiceOverlay,
  },
  props: {
    indexes: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['clicked'],
  computed: {
    ...mapState({
      tabledata: 'tabledata',
      noa: (state) => state.math.noa,
      elementQuantity: (state) => state.math.elementQuantity,
      showCompoundInfo: (state) => state.data.showCompoundInfo,
      cEAI: 'chosenElementAtomIndex',
      chooseElement: 'chooseElement',
      height: 'height',
      show: 'show',
    }),
    ...mapGetters(['atomicMass', 'wi']),
  },
  methods: {
    ...mapMutations(['addAnotherAtom', 'subtractAtom', 'showCalc']),
  },
};
</script>
