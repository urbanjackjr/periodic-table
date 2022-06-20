<template>
  <transition name="fade">
    <div
      v-if="showAllInfoIndex !== -1"
      class="elementInfo-wrapper"
    >
      <ElementInfoInner />
    </div>
  </transition>
</template>
<script>
import { mapState } from 'vuex';
import ElementInfoInner from './ElementInfo/ElementInfoInner.vue';

export default {
  name: 'ElementInfo',
  components: { ElementInfoInner },
  computed: {
    ...mapState(['showAllInfoIndex']),
  },
};
</script>
