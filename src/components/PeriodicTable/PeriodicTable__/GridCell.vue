<template>
  <li>
    <div :class="['mainInfo', cellClass]">
      <h2>
        <span class="atomicNumber">{{ atomicNumber }}</span>{{ symbol }}
      </h2>
      <h6 class="elementName">
        {{ name }}
      </h6>
      <data class="elementInfo">{{ info.value }}</data>
      <div
        :style="{
          height:
            typeof info.value === 'number'
              ? (Math.abs(info.value) * 100) / max + '%'
              : 0,
        }"
        class="visualizer"
      />
    </div>
  </li>
</template>
<script>
import { mapState, mapGetters } from 'vuex';
import translations from '../../../assets/translations.json';

export default {
  name: 'GridCell',
  props: {
    mode: {
      type: String,
      default: '',
    },
    symbol: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    atomicNumber: {
      type: [String, Number],
      default: '',
    },
    info: {
      type: Object,
      default: () => ({}),
    },
    index: {
      type: Number,
      default: 0,
    },
    cellClass: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      translations,
    };
  },
  computed: {
    ...mapState({
      max: (state) => state.max,
      tableMode: (state) => state.global.tableMode,
      modeLoading: (state) => state.global.modeLoading,
    }),
    ...mapGetters(['properties']),
  },
};
</script>
