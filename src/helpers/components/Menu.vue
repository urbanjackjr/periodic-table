<template>
  <div class="menu">
    <div class="nav">
      <ul>
        <li
          v-for="(item, index) in items"
          @click="setActiveTab(index)"
          :class="activeTab == index ? 'active' : ''"
          :key="index"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <slot :tab="activeTab"></slot>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "Menu",
  props: {
    items: Array,
  },
  methods: {
    ...mapMutations(["setActiveTab"])
  },
  computed: {
    ...mapState({
      activeTab: (state) => state.data.activeMenuTab,
    })
  },
}
</script>