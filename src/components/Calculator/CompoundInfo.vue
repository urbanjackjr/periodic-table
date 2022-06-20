<template>
  <Loading
    v-if="loading"
    :status="loading"
  />
  <Error
    v-else-if="error"
    :status="error"
    @click="hideCompoundInfo()"
  />
  <CompoundInfoInner v-else />
</template>
<script>
import { mapState } from 'vuex';
import Loading from '../../helpers/components/Loading.vue';
import Error from '../../helpers/components/Error.vue';
import CompoundInfoInner from './CompoundInfo/CompoundInfoInner.vue';

export default {
  name: 'CompoundInfo',
  components: { Loading, Error, CompoundInfoInner },
  computed: {
    ...mapState({
      loading: (state) => state.data.loading,
      error: (state) => state.data.error,
    }),
  },
  beforeUnmount() {
    this.$store.commit('hideViewer');
  },
  methods: {
    hideCompoundInfo() {
      this.$store.state.data.showCompoundInfo = false;
      this.$store.commit('hideViewer');
    },
  },
};
</script>
