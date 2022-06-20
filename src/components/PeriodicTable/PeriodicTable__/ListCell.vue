<template>
  <LazyRender :index="atomicNumber">
    <div :class="['mainInfo', cellClass]">
      <h2>
        <span class="atomicNumber">{{ atomicNumber }}</span>{{ symbol }}
      </h2>
      <h6 class="elementName">
        {{ name }}
      </h6>
    </div>
    <ElementInfoList
      class="elementInfoList"
      :index="index"
    />
  </LazyRender>
</template>
<script>
import { defineAsyncComponent } from 'vue';
import { mapState, mapGetters } from 'vuex';
import translations from '../../../assets/translations.json';
import LazyRender from '../../../helpers/components/LazyRender.vue';
// import ElementInfoList from "../../ElementInfo/ElementInfoInner/ElementInfoList.vue";
const ElementInfoList = defineAsyncComponent(() => import('../../ElementInfo/ElementInfoInner/ElementInfoList.vue'));

export default {
  name: 'ListCell',
  components: { ElementInfoList, LazyRender },
  props: {
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
