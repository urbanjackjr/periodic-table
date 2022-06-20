export default {
  mounted() {
    const that = this;

    this.escListener = document.addEventListener('keyup', (evt) => {
      if (evt.key === 'Escape') {
        that.close();
      }
    });
  },
  beforeUnmount() {
    document.removeEventListener('keyup', this.escListener);
  },
};
