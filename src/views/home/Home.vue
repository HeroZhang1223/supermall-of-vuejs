<template>
  <div id="home">
		<nav-bar class="home-navbar">
			<div slot="center">购物商城</div>
		</nav-bar>
		<tab-control :titles="['流行','新款','精选']"
								@tabClick="tabclick" ref="tabcontrol1"
								class="tab-control" v-show="isTabFixed"></tab-control>
		<scroll class="content" 
						ref="scroll" :probe-type="3" 
						@scroll="contentscroll"
						:pull-up-load="true"
						@pullingUp="loadmore">
			<home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
			<home-recommend-view :recommends="recommends"></home-recommend-view>
			<home-feature-view></home-feature-view>
			<tab-control :titles="['流行','新款','精选']" 
									@tabClick="tabclick" ref="tabcontrol2"></tab-control>
			<goods-list :goods="showGoods"></goods-list>
		</scroll>
		<back-top @click.native="backclick" v-if="isShowBackTop"></back-top>
	</div>
</template>

<script>
	import NavBar from "../../components/common/navbar/NavBar.vue"
	import Scroll from "../../components/common/scroll/Scroll.vue"
	import BackTop from "../../components/common/backtop/BackTop.vue"
	import TabControl from "../../components/content/tabControl/TabControl.vue"
	import GoodsList from "../../components/content/goods/GoodsList.vue"
	
	import HomeSwiper from "./homeComponents/HomeSwiper.vue"
	import HomeRecommendView from "./homeComponents/HomeRecommendView.vue"
	import HomeFeatureView from "./homeComponents/HomeFeatureView.vue"
	
	import {getHomeMultidata,getHomeGoodsdata} from "../../network/home.js"
	import {debounce} from "../../common/utils.js"
	export default {
		name:"Home",
		components:{
			NavBar,	
			Scroll,
			BackTop,
			TabControl,
			GoodsList,
			
			HomeSwiper,
			HomeRecommendView,
			HomeFeatureView,
		
		},
		data() {
			return {
				banners:[],
				recommends:[],
				goods:{
					"pop":{page:0,list:[]},
					"new":{page:0,list:[]},
					"sell":{page:0,list:[]},
				},
				currentType:'pop',
				isShowBackTop:false,
				offsetTop:0,
				isTabFixed:false,
				saveY:0,
				itemImgListener:null
			}
		},
		created() {
			// 1.请求多个数据
			this.getHomeMultidata()
			
			// 2.请求商品数据
			this.getHomeGoodsdata('pop')
			this.getHomeGoodsdata('new')
			this.getHomeGoodsdata('sell')
			 
		},
		mounted() {
			// 3.监听item中图片加载完成
			const refresh = debounce(this.$refs.scroll.refresh,500)
			this.itemImgListener = () => { refresh() }
			this.$bus.$on("itemImageLoad", this.itemImgListener)
		},
		computed:{
			showGoods() {
				return this.goods[this.currentType].list
			}
		},
		destroyed() {
		},
		activated() {
			this.$refs.scroll.scrollTo(0,this.saveY,1)
			this.$refs.scroll.refresh()
		},
		deactivated() {
			// 1.监听页面的滚动距离
			this.saveY = this.$refs.scroll.scroll.y
			
			// 2.进入详细页，结束对home页面的监听
			// 取消全局事件的监听
			this.$bus.$off('itemImageLoad',this.itemImgListener)
		},
		methods:{
			// 在哪个组件里发射的自定义事件，就要在哪个组件里接受，不能在其他组件接收
			swiperImageLoad() {
				// 4.监听tabcontral的offsetTop
			// 所有的组件元素都有一个属性$el,用来获取组件中的元素
			this.offsetTop = this.$refs.tabcontrol2.$el.offsetTop
			},
			
			/*
			**事件监听相关代码
			*/
		 tabclick(index) {
			 switch(index) {
				 case 0:
					 this.currentType = 'pop'
					 break
				 case 1:
					 this.currentType = 'new'
					 break
				 case 2:
					 this.currentType = 'sell'
					 break
			 }
			 this.$refs.tabcontrol1.currentIndex = index
			 this.$refs.tabcontrol2.currentIndex = index
		 },
		 backclick() {
			 this.$refs.scroll.scrollTo(0,0,500)
		 },
		 contentscroll(position) {
			 this.isShowBackTop = Math.abs(position.y)>1000
			 
			 // 决定tabFixed是否显示
			 // this.isTabFixed = position.y < -this.tabOffsetTop
			 this.isTabFixed = position.y<-this.offsetTop
		 },
		 loadmore() {
			 this.getHomeGoodsdata(this.currentType)
		 },
			
			/*
			**网络请求的相关代码
			*/
			getHomeMultidata() {
				getHomeMultidata().then(res => {
				this.banners = res.data.banner.list
				this.recommends = res.data.recommend.list
				})
			},
			getHomeGoodsdata(type) {
				const page = this.goods[type].page + 1
				getHomeGoodsdata(type,page).then(res => {
					this.goods[type].list.push(...res.data.list)
					this.goods[type].page += 1
					
					// 调用finishPullUp方法，结束加载更多，以便执行下一次刷新
					this.$refs.scroll.finishPullUp()
				})
			}
		}
	}
</script>

<style scoped>
	#home{
		/* padding-top: 44px; */
		/* 视口的高度 */
		height: 100vh;
		position: relative;
	}
	.home-navbar{

		background-color:  #ff5777;
		color:white;
		font-weight: 700;
		/* 在使用浏览器原生滚动时需要的 */
		/* position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 9; */
	}
	.content{
		position: absolute;
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;
		overflow: hidden;
	}
	.tab-control {
		position: relative;
		z-index: 9;
	}
</style>
