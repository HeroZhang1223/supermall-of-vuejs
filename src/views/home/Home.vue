<template>
  <div id="home">
		<nav-bar class="home-navbar"><div slot="center">购物商城</div></nav-bar>
		<home-swiper :banners="banners"></home-swiper>
		<home-recommend-view :recommends="recommends"></home-recommend-view>
	</div>
</template>

<script>
	import NavBar from "../../components/common/navbar/NavBar.vue"
	import HomeSwiper from "./homeComponents/HomeSwiper.vue"
	import HomeRecommendView from "./homeComponents/HomeRecommendView.vue"
	
	import {getHomeMultidata} from "../../network/home.js"
	export default {
		name:"Home",
		components:{
			NavBar,
			HomeSwiper,
			HomeRecommendView
		},
		data() {
			return {
				banners:[],
				recommends:[]
			}
		},
		created() {
			getHomeMultidata().then(res => {
				this.banners = res.data.banner.list
				this.recommends = res.data.recommend.list
			})
		}
	}
</script>

<style scoped>
	.home-navbar{
		background-color:  #ff5777;
		color: whitesmoke;
	}
</style>
