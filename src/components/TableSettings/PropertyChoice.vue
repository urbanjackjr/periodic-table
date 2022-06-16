<template>
  <div class="propertyChoice">
    <DropDownList
      :info="Object.keys(properties(0, 6))"
      :translated="true"
      @clicked="childClick"
    />
  </div>
</template>
<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import DropDownList from '../../helpers/components/DropDownList.vue';

export default {
  name: 'PropertyChoose',
  components: { DropDownList },
  computed: {
    ...mapState(['mainInfo']),
    ...mapGetters(['properties']),
  },
  methods: {
    ...mapMutations(['changeInfo', 'maxValue']),
    childClick(value) {
      this.changeInfo(value);
      this.$store.commit('maxValue');
    },
  },
};
</script>
