<template>
  <div class="loadingWrapper" v-if="loading">
    <Loading :status="loading" />{{ loading }}
  </div>
  <Error v-else-if="error" :status="error" />
  <CompoundListData v-else />
</template>
<script>
import Loading from "../../../../../helpers/components/Loading.vue";
import Error from "../../../../../helpers/components/Error.vue";
import CompoundListData from "./CompoundList/CompoundListData.vue";
import { mapState } from "vuex";

export default {
  name: "Compound List",
  components: { Loading, Error, CompoundListData },
  computed: {
    ...mapState({
      loading: (state) => state.data.compoundListLoading,
      error: (state) => state.data.listError,
    }),
  },
};
</script>
<style lang="scss" scoped>
.menu {
  .loadingWrapper {
    .loading {
      position: static;
      transition: 0.5s ease;
    }
  }

  .errorWrapper {
    display: inline-block;
    width: auto;
    height: auto;
    position: static;
    padding: 20px;
  }
}
</style>
