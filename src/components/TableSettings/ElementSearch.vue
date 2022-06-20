<template>
  <input
    class="elementSearch"
    :v-model="query"
    placeholder="Szukaj pierwiastka"
    @input="searchQueryUpdate($event.target.value)"
  >
</template>
<script>
import { mapMutations } from 'vuex';

export default {
  name: 'ElementSearch',
  data() {
    return {
      query: '',
    };
  },
  methods: {
    ...mapMutations(['searchQueryUpdate']),
  },
};
</script>
