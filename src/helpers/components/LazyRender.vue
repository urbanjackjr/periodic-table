<template>
    <li class="lazyRender">
		<slot v-if="visible" />
    </li>
</template>
<script>
export default {
    name: "Lazy Render",
	props: {
		index: [Number, String],
	},
    data() {
        return {
            observer: null,
            visible: false,
        }
    },
	mounted() {
		this.observer = new IntersectionObserver(([entry]) => {
			if(this.index < 4) {
				this.visible = true;
			}
			else {
				this.visible = entry.isIntersecting;
			}
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