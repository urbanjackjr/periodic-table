<template>
    <div class="elementInfo-wrapper">
        <div class="back" @click="hideCompoundInfo()"></div>
        <div class="elementInfo">
            <Viewer viewerId="viewer" :showOptions="true" />
            <div class="elementHeader">
                <h2 class="MolecularFormula">{{ data.MolecularFormula }}</h2>
            </div>
            <Menu :items="['Informacje o związku', 'Inne związki']">
                <CompoundInfoList v-show="activeTab == 0" />
                <CompoundList v-show="activeTab == 1" />
            </Menu>
        </div>
    </div>
</template>

<script>
import Menu from "../../../helpers/components/Menu.vue";
import Viewer from "../../../helpers/components/Viewer.vue";
import CompoundInfoList from "./CompoundInfoInner/MenuItems/CompoundInfoList.vue";
import CompoundList from "./CompoundInfoInner/MenuItems/CompoundList.vue";
import { mapState, mapMutations } from 'vuex';

export default {
    name: "Compound Info Inner",
    components: { CompoundInfoList, Menu, CompoundList, Viewer },
    methods: {
        ...mapMutations(["mountCompoundModel"]),
        hideCompoundInfo() {
            this.$store.state.data.showCompoundInfo = false;
        },
    },
    computed: {
        ...mapState({
            data: (state) => state.data.singleCompoundData,
            activeTab: (state) => state.data.activeMenuTab,
        })
    },
    mounted: function() {
        this.$nextTick(function() {
            this.$store.commit("compoundRegExp", document.querySelector(".MolecularFormula"));
            this.$store.commit("compoundRegExp", document.querySelector(".MolecularFormula .value"));
            this.$store.dispatch("getModel");
            this.$store.commit("mountCompoundModel", "viewer");
        })
    },
}
</script>