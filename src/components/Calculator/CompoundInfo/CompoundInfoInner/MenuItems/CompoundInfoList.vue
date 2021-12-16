<template>
    <ul v-if="!loading" class="compoundInfoList">
        <li v-for="[key, value] in Object.entries(data)" :class="key" :key="key">
            <span class="key">{{ translations[key] }}</span
            ><span class="value">{{ value }}</span>
        </li>
    </ul>
    <Loading v-else :status="loading" />
</template>
<script>
import Loading from "../../../../../helpers/components/Loading.vue";
import { mapState } from 'vuex';
import translations from "../../../../../assets/translations.json";

export default {
    name: "Compound Info List",
    components: { Loading },
    data() {
        return {
            translations: translations,
        };
    },
    computed: {
        ...mapState({
            data: (state) => state.data.singleCompoundData,
            loading: (state) => state.data.compoundInfoListLoading,
        })
    },
}
</script>
<style lang="scss" scoped>


.loading {
    position: static;
}
</style>