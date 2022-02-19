<template>
    <li class="lazyRender">
		<slot v-if="visible" />
    </li>
</template>
<script>
export default {
    name: "Lazy Render",
    data() {
        return {
            observer: null,
            visible: false,
        }
    },
	mounted() {
		this.observer = new IntersectionObserver(([entry]) => {
			this.visible = entry.isIntersecting;
		}, {
			threshold: 0,
			rootMargin: '200px',
		});

		this.observer.observe(this.$el);
	},
	destroyed() {
		this.observer.disconnect();
	},
}
</script>