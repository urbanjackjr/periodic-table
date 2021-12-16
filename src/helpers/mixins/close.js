export default {
    mounted() {
        let that = this;

        this.escListener = document.addEventListener('keyup', function (evt) {
            if (evt.key === "Escape") {
                that.close();
            }
        });
    },
    beforeUnmount() {
        document.removeEventListener('keyup', this.escListener);
    },
};