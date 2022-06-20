<template>
  <div class="menu">
    <div class="nav">
      <ul>
        <li
          v-for="(item, index) in items"
          :key="index"
          :class="activeTab == index ? 'active' : ''"
          @click="setActiveTab(index)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <slot :tab="activeTab" />
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'TabbedMenu',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapState({
      activeTab: (state) => state.data.activeMenuTab,
    }),
  },
  methods: {
    ...mapMutations(['setActiveTab']),
  },
};
</script>
