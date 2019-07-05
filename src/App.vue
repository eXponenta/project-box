<template>
	<div id="app">
		<svg width="0" height="0" class="filter">
			<defs>
				<filter id="svg-blur">
					<feGaussianBlur stdDeviation="3" in="SourceColor"></feGaussianBlur>
				</filter>
			</defs>
		</svg>
		<div id="wrapp" :class="{blured:isPlayerOpened}">
			<Header/>
			<Body ref="body"/>
		</div>
		<router-view/>
	</div>
</template>

<script>
import Header from "./components/Header";
import Body from "./components/Body";

export default {
	name: "App",
	data() {
		return {
			isPlayerOpened: false
		};
	},
	components: {
		Header,
		Body,
	},
	mounted() {

		this.$router.beforeEach((to, from, next) => {
			document.body.classList.toggle("non-scroll", to.path !== "/");
			next();
		});
	}
};
</script>

<style lang="scss">
@import "./constants/constants.scss";

html,
body {
	margin: 0px;
	width: 100%;
}

body {
	overflow-x: hidden;
	&.non-scroll {
		overflow: hidden;
	}
}

.filter {
	position: absolute;
}

.blured {
	filter: url(#svg-blur);
	overflow: hidden;
	pointer-events: none;
}

#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	background-color: $var-bg-color;
}
</style>
