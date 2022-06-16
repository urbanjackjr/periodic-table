<template>
  <div :class="['modelViewer', fullscreen ? 'fullscreen' : '']">
    <div :id="viewerId" />
    <ViewerOptions v-if="showOptions" />
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
    showOptions: Boolean,
  },
  computed: {
    ...mapState({
      fullscreen: (state) => state.data.fullscreen,
    }),
  },
};
</script>
