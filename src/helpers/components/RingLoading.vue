<template>
  <transition name="fade">
    <div
      v-if="status"
      class="lds-wrapper absolute"
      :style="{height: 'calc(100vh - ' + tableOffsetTop + 'px)'}"
    >
      <div class="lds-ring">
        <div /><div /><div /><div />
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'RingLoading',
  props: {
    status: Boolean,
  },
  computed: {
    tableOffsetTop() {
      return document.getElementsByClassName('table')[0].offsetTop;
    },
  },
};
</script>
