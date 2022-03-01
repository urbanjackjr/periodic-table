<template>
    <input class="elementSearch" :v-model="query" @input="searchQueryUpdate($event.target.value)" placeholder="Szukaj pierwiastka" />
</template>
<script>
import { mapMutations } from "vuex";

export default {
    name: "Element Search",
    data() {
        return {
            query: '',
        }
    },
    methods: {
        ...mapMutations(["searchQueryUpdate"])
    },
}
</script>