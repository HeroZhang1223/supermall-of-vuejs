<template>
	<div class="detail">
		
		<detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="nav"></detail-nav-bar>
		<scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
			<detail-swiper :top-images="topImages"></detail-swiper>
			<detail-base-info :goods="goods"></detail-base-info>
			<detail-shop-info :shop="shop"></detail-shop-info>
			<detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
			<detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
			<detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
			<goods-list ref="recommend" :goods="recommends"></goods-list>
		</scroll>
		<back-top @click.native="backclick" v-if="isShowBackTop"></back-top>
		<detail-bottom-bar @addToCart="addCart"></detail-bottom-bar>
		<toast :message="message" :show="show"></toast>
	</div> 	
</template>

<script>
	import DetailNavBar from "./detailComponents/DetailNavBar.vue"
	import DetailSwiper from "./detailComponents/DetailSwiper.vue"
	import DetailBaseInfo from "./detailComponents/DetailBaseInfo.vue"
	import DetailShopInfo from "./detailComponents/DetailShopInfo.vue"
	import DetailGoodsInfo from "./detailComponents/DetailGoodsInfo.vue"
	import DetailParamInfo from "./detailComponents/DetailParamInfo.vue"
	import DetailCommentInfo from "./detailComponents/DetailCommentInfo.vue"
	import DetailBottomBar from "./detailComponents/DetailBottomBar.vue"
	
	import GoodsList from "../../components/content/goods/GoodsList.vue"
	import Scroll from "../../components/common/scroll/Scroll.vue"
	import BackTop from "../../components/common/backtop/BackTop.vue"
	import Toast from "../../components/common/toast/Toast.vue"
	import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "../../network/detail.js"
	import {debounce} from "../../common/utils.js"
	export default {
		name:"Detail",
		components:{
			DetailNavBar,
			DetailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			DetailGoodsInfo,
			DetailParamInfo,
			DetailCommentInfo,
			DetailBottomBar,
			GoodsList,
			Scroll,
			BackTop,
			Toast
		},
		data() {
			return {
				iid:null,
				topImages:[],
				goods:{},
				shop:{},
				detailInfo:{},
				paramInfo:{},
				commentInfo:{},
				recommends:[],
				itemImgListener:null,
				themeTopYs:[],
				getThemeTopYs:null,
				currentIndex:0,
				isShowBackTop:false,
				message:"",
				show:false
			}
		},
		mounted() {
			const refresh = debounce(this.$refs.scroll.refresh,500)
			this.itemImgListener = () => { refresh() }
			this.$bus.$on("itemImageLoad", this.itemImgListener)
			
			
		},
		created() {
			// 1.保存传入的信息
			this.iid = this.$route.params.iid
			
			// 2.根据iid	请求详细数据
			getDetail(this.iid).then(res => {
				// 1.获取顶部轮播图数据
				const data = res.result
				this.topImages = res.result.itemInfo.topImages
				
				// 2.获取商品信息
				this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
				
				// 3.获取店铺信息
				this.shop = new Shop(data.shopInfo)
				
				// 4.获取商品的详细数据
				this.detailInfo = data.detailInfo
				
				// 5.获取商品的参数
				this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)
				
				// 6.获取商品的评论信息
				if(data.rate.cRate!=0) {
				this.commentInfo=data.rate.list[0]
				}
				
				// 7.给getThemeTopYs赋值
				this.getThemeTopYs = debounce(() => {
					this.themeTopYs=[]
					this.themeTopYs.push(0)
					this.themeTopYs.push(this.$refs.param.$el.offsetTop)
					this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
					this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
				},100)
				
			})
				// 7.获取商品推荐数据
			getRecommend().then(res => {
				this.recommends = res.data.list
			})
			
			// 8.监听位置信息
			// 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新
			this.$nextTick(() => {
				// 获取各个数据到顶部的距离
			})
		},
		destroyed() {
			this.$bus.$off("itemImageLoad", this.itemImgListener)
		},
		methods:{
			imageLoad() {
				this.$refs.scroll.refresh()
				this.getThemeTopYs()
			},
			titleClick(index){
				this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],500)
			},
			contentScroll(position) {
				let positionY = -position.y
				let length = this.themeTopYs.length
				for(let i=0;i<length;i++){
					if(this.currentIndex !==i &&((i<length-1 &&positionY >=this.themeTopYs[i] && positionY<this.themeTopYs[i+1])
					|| (i === length-1 && positionY >= this.themeTopYs[i]))){
						this.currentIndex = i
						this.$refs.nav.currentIndex = this.currentIndex
					}
				}
				// 判断回到顶部是否显示
				this.isShowBackTop = Math.abs(position.y)>1000
			},
			// 回到顶部
			backclick() {
				this.$refs.scroll.scrollTo(0,0,500)
			},
			addCart() {
				// 1.获取购物车需要展示的信息
				const product = {}
				product.image = this.topImages[0]
				product.title = this.goods.title
				product.desc = this.goods.desc
				product.price = this.goods.realPrice
				product.iid = this.iid
				
				// 2.将商品加入到购物车
				// this.$store.commit("addCart",product)
				this.$store.dispatch("addCart",product).then(res => {
					// console.log(res)
					// this.message = res
					// this.show = true
					// setTimeout(() => {
					// 	this.show = false
					// 	 this.message =""
					// },1500)
					
					this.$toast.show(res,1500)
				})
			}
		}
	}
</script>

<style scoped>
	.detail{
		/* 对于开启定位的元素，可以通过z-index属性来设置元素的层级 */
		position: relative;
		z-index: 9;
		background-color: white;
		height: 100vh;
	}
	.detail-nav-bar{
		position: relative;
		z-index: 9;
		background-color: white;
	}
	.content{
		height: calc(100% - 44px);
	}
</style>
