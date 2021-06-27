<template>
	<section class="project-section" :id="name">
		<div class="items">
			<ProjectItem v-for="item in items" :key="item.id" :item="item" class="item"/>
		</div>
	</section>
</template>
<script>
import ProjectItem from "./elements/ProjectItem";
import Data from "./../Data";

export default {
	props: ["name"],
	data () {
		return {
			items : []
		}
	},
	components: {
		ProjectItem
	},
	created() {
		Data.fetchData().then((e)=>{
			this.items = e;
		});
	}
};
</script>
<style lang="scss" scoped>
@import "../constants/constants.scss";

.items {
	background-color: darken($var-bg-color, 20);
	padding: 2em 0;

	.item {
		margin-bottom: 2em;
	}
}
.project-section {
	color: #d7d7d8;
}
</style>
