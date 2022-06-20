<template>
  <ul class="elementInfoList">
    <ElementInfoListItem
      v-for="(loopValue, key) in properties(index, 3)"
      :key="key"
      :info-instance-key="translations[key]"
      :info-instance-value="loopValue.value"
      :info-instance-unit="loopValue.unit"
    />
  </ul>
</template>
<script>
import { mapState, mapGetters } from 'vuex';
import ElementInfoListItem from './ElementInfoList/ElementInfoListItem.vue';
import translations from '../../../assets/translations.json';

export default {
  name: 'ElementInfoList',
  components: { ElementInfoListItem },
  props: {
    infoInstanceKey: {
      type: String,
      default: '',
    },
    infoInstanceValue: {
      type: [String, Number],
      default: '',
    },
    infoInstanceUnit: {
      type: Array,
      default: () => [],
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      translations,
    };
  },
  computed: {
    ...mapGetters(['properties']),
    ...mapState({
      tableMode: (state) => state.global.tableMode,
    }),
  },
  mounted() {
    if (this.tableMode === 'list') {
      this.$store.commit('stopModeLoading');
    }
  },
};
</script>
