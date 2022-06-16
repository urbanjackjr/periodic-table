<template>
  <ul
    v-if="!loading"
    class="compoundInfoList"
  >
    <li
      v-for="[key, value] in Object.entries(data)"
      :key="key"
      :class="key"
    >
      <span class="key">{{ translations[key] }}</span><span class="value">{{ value }}</span>
    </li>
  </ul>
  <Loading
    v-else
    :status="loading"
  />
</template>
<script>
import { mapState } from 'vuex';
import Loading from '../../../../../helpers/components/Loading.vue';
import translations from '../../../../../assets/translations.json';

export default {
  name: 'CompoundInfoList',
  components: { Loading },
  data() {
    return {
      translations,
    };
  },
  computed: {
    ...mapState({
      data: (state) => state.data.singleCompoundData,
      loading: (state) => state.data.compoundInfoListLoading,
    }),
  },
  mounted() {
    this.$store.commit(
      'compoundRegExp',
      document.querySelector('.MolecularFormula .value'),
    );
  },
};
</script>
