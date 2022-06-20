<template>
  <div class="tableSettings">
    <ElementSearch />
    <PropertyChoice v-if="tableMode == 'grid'" />
  </div>
</template>
<script>
import { mapState } from 'vuex';
import ElementSearch from './TableSettings/ElementSearch.vue';
import PropertyChoice from './TableSettings/PropertyChoice.vue';

export default {
  name: 'TableSettings',
  components: { ElementSearch, PropertyChoice },
  computed: {
    ...mapState({
      tableMode: (state) => state.global.tableMode,
    }),
  },
};
</script>
