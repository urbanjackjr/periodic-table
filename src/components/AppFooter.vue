<template>
  <footer class="footer">
    <ul class="footer__section footer__section--links">
      <li
        v-for="link in links"
        :key="link.name"
        class="footer__item"
      >
        <a :href="link.href">
          <component
            :is="link.icon"
            class="footer__icon"
          />
          {{ link.name }}
        </a>
      </li>
    </ul>
  </footer>
</template>
<script>
import GitHub from './Icons/GitHub.vue';

export default {
  name: 'AppFooter',
  data() {
    return {
      links: [
        { href: 'https://github.com/urbanjackjr/periodic-table', name: 'GitHub', icon: GitHub },
      ],
    };
  },
};
</script>
