<template>
  <div
    class="back"
    @click="hideInfo"
  />
  <div :class="['elementInfo', tabledata[showAllInfoIndex].groupBlock.value]">
    <Viewer
      viewer-id="viewer"
      :show-options="false"
    />
    <ElementHeader />
    <ElementInfoList :index="showAllInfoIndex" />
    <transition name="fade">
      <ConfigBlocks v-if="isMounted" />
    </transition>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import ElementInfoList from './ElementInfoInner/ElementInfoList.vue';
import ElementHeader from './ElementInfoInner/ElementHeader.vue';
import Viewer from '../../helpers/components/Viewer.vue';
import ConfigBlocks from './ElementInfoInner/ConfigBlocks.vue';
import translations from '../../assets/translations.json';

export default {
  name: 'ElementInfoInner',
  components: {
    ElementInfoList, ElementHeader, Viewer, ConfigBlocks,
  },
  data() {
    return {
      translations,
      isMounted: false,
    };
  },
  computed: {
    ...mapState(['tabledata', 'showAllInfoIndex']),
  },
  mounted() {
    this.$nextTick(() => setTimeout(() => {
      this.isMounted = true;
    }, 300));
  },
  methods: {
    ...mapMutations(['hideInfo']),
  },
};
</script>
