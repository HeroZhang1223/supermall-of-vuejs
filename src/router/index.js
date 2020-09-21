import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from "../views/home/Home.vue"
import Shop from "../views/shop/Shop.vue"
import Category from "../views/category/Category.vue"
import Profile from "../views/profile/Profile.vue"

Vue.use(VueRouter)

// 解决Avoided redundant navigation to current location: 的问题
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err);
};

const routes = [
	{
		path:"",
		redirect:"/home"
	},
	{
		path:"/home",
		component:Home
	},
	{
		path:"/shop",
		component:Shop
	},
	{
		path:"/category",
		component:Category
	},
	{
		path:"/profile",
		component:Profile
	}
]

const router = new VueRouter({
  routes,
	mode:"history"
})

export default router
