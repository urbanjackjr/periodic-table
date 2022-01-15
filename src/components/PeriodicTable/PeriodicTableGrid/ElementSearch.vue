<template>
    <input class="elementSearch" v-model="query" @input="$emit('update:searchValue', $event.target.value)" placeholder="Szukaj pierwiastka" />
</template>
<script>
export default {
    name: "Element Search",
    data() {
        return {
            query: '',
        }
    },
    methods: {
        inputEvent() {
            console.log(this.query.includes('Fe') ? 'yes' : 'no');
        }
    },
    emits: ['update:searchValue']
}
</script>