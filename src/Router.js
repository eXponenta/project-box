import Vue from "vue";
import VueRouter from "vue-router";
import Player from "./components/EmbeddedPlayer.vue";

Vue.use(VueRouter);

export default new VueRouter({
	routes: [
        { path: "/live/:id", component: Player, meta : { mode : "iframe" } },
        { path: "/image/:id", component: Player, meta: { mode : "image" } },
    ]
});
