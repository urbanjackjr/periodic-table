<template>
    <div class="tableSettings">
        <ElementSearch />
        <PropertyChoice v-if="tableMode == 'grid'" />
    </div>
</template>
<script>
import ElementSearch from "./TableSettings/ElementSearch.vue";
import PropertyChoice from "./TableSettings/PropertyChoice.vue";
import { mapState } from "vuex";

export default {
    name: "Table Settings",
    components: { ElementSearch, PropertyChoice },
    computed: {
        ...mapState({
            tableMode: (state) => state.global.tableMode
        })
    }
}
</script>