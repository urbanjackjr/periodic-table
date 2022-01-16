<template>
	<Loading v-if="loading" :status="loading" />
	<Error v-else-if="error" :status="error" @click="hideCompoundInfo()" />
	<CompoundInfoInner v-else />
</template>
<script>
import Loading from "../../helpers/components/Loading.vue";
import Error from "../../helpers/components/Error.vue";
import CompoundInfoInner from "./CompoundInfo/CompoundInfoInner.vue";
import { mapState } from "vuex";

export default {
	name: "Compound Info",
	components: { Loading, Error, CompoundInfoInner },
	methods: {
		hideCompoundInfo() {
			this.$store.state.data.showCompoundInfo = false;
		},
	},
	computed: {
		...mapState({
			loading: (state) => state.data.loading,
			error: (state) => state.data.error,
		}),
	},
};
</script>
