import Vue from "vue";
import App from "./App.vue";
import Router from "./Router";

Vue.config.productionTip = false;

new Vue({
	data: {
		store: {
			items: [],
			loading: false
		}
	},
	router: Router,
	render: h => h(App)
}).$mount("#app");
