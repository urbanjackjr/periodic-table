<template>
  <li class="legendCompound">
    <div>
      <h1>
        <span>m<sub>a</sub></span>Sy
      </h1>
      <h6 class="name">
        Nazwa pierwiastka
      </h6>
      <h6 class="chosenInfo">
        {{ translations[mainInfo] }}
      </h6>
    </div>
  </li>
</template>
<script>
import { mapState } from 'vuex';
import translations from '../../../assets/translations.json';

export default {
  name: 'TableLegend',
  data() {
    return {
      translations,
    };
  },
  computed: {
    ...mapState(['mainInfo']),
  },
};
</script>
