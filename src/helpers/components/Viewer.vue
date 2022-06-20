<template>
  <div :class="['modelViewer', fullscreen ? 'fullscreen' : '']">
    <div class="viewerWrapper">
      <ViewerOptions v-show="modelShowOptions" />
      <div :id="viewerId" />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import ViewerOptions from './Viewer/ViewerOptions.vue';

export default {
  name: 'Viewer',
  components: { ViewerOptions },
  props: {
    viewerId: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapState({
      fullscreen: (state) => state.data.fullscreen,
      modelShowOptions: (state) => state.data.modelShowOptions,
    }),
  },
};
</script>
