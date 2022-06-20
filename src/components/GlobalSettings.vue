<template>
  <div class="globalSettings">
    <ModeSwitch />
    <ThemeSwitch />
  </div>
</template>
<script>
import ModeSwitch from './GlobalSettings/ModeSwitch.vue';
import ThemeSwitch from './GlobalSettings/ThemeSwitch.vue';

export default {
  name: 'GlobalSettings',
  components: { ModeSwitch, ThemeSwitch },
};
</script>
