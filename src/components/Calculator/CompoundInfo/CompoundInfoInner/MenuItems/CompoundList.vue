<template>
	<div class="loadingWrapper" v-if="loading">
		<Loading :status="loading" />{{ loading }}
	</div>
	<Error v-else-if="error" :status="error" />
	<CompoundListData v-else />
</template>
<script>
import Loading from "../../../../../helpers/components/Loading.vue";
import Error from "../../../../../helpers/components/Error.vue";
import CompoundListData from "./CompoundList/CompoundListData.vue";
import { mapState } from "vuex";

export default {
	name: "Compound List",
	components: { Loading, Error, CompoundListData },
	computed: {
		...mapState({
			loading: (state) => state.data.compoundListLoading,
			error: (state) => state.data.listError,
		}),
	},
};
</script>
