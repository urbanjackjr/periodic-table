<template>
    <div class="back" @click="hideInfo"></div>
    <div :class="['elementInfo', tabledata[showAllInfoIndex].groupBlock.value]">
        <Viewer viewerId="viewer" :showOptions="false" />
        <ElementHeader />
        <ul>
          <ElementInfoList
            v-for="(loopValue, key) in properties(showAllInfoIndex, 3)"
            :infoInstanceKey="translations[key]"
            :infoInstanceValue="loopValue.value"
            :infoInstanceUnit="loopValue.unit"
            :key="key"
          />
        </ul>
        <transition name="fade">
            <ConfigBlocks v-if="isMounted" />
        </transition>
    </div>
</template>
<script>
import ElementInfoList from "./ElementInfoInner/ElementInfoList.vue";
import ElementHeader from "./ElementInfoInner/ElementHeader.vue";
import Viewer from "../../helpers/components/Viewer.vue";
import ConfigBlocks from "./ElementInfoInner/ConfigBlocks.vue";
import { mapState, mapMutations, mapGetters } from 'vuex';
import translations from "../../assets/translations.json";

export default {
    name: "Element Info Inner",
    components: { ElementInfoList, ElementHeader, Viewer, ConfigBlocks },
    data() {
        return {
            translations: translations,
            isMounted: false,
        };
    },
    methods: {
        ...mapMutations(["hideInfo"]),
    },
    computed: {
        ...mapState(["tabledata", "showAllInfoIndex"]),
        ...mapGetters(["properties"]),
    },
    mounted() {
        this.$nextTick(() => setTimeout(() => {this.isMounted = true;}, 300))
    },
}
</script>