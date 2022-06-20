<template>
  <div
    v-if="loading"
    class="loadingWrapper"
  >
    <Loading :status="loading" />{{ loading }}
  </div>
  <Error
    v-else-if="error"
    :status="error"
  />
  <CompoundListData v-else />
</template>
<script>
import { mapState } from 'vuex';
import Loading from '../../../../../helpers/components/Loading.vue';
import Error from '../../../../../helpers/components/Error.vue';
import CompoundListData from './CompoundList/CompoundListData.vue';

export default {
  name: 'CompoundList',
  components: { Loading, Error, CompoundListData },
  computed: {
    ...mapState({
      loading: (state) => state.data.compoundListLoading,
      error: (state) => state.data.listError,
    }),
  },
};
</script>
