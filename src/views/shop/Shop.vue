<template>
  <div class="Shop">
		<!-- 导航 -->
		<nav-bar class="nav-bars">
			<div slot="center">购物车({{cartLength}})</div>
		</nav-bar>
		<!-- 商品列表 -->
		<cart-list></cart-list>
		<!-- 底部汇总 -->
		<cart-bottom-bar></cart-bottom-bar>
	</div>
</template>

<script>
	import NavBar from "../../components/common/navbar/NavBar.vue"
	import CartList from "./childComps/CartList.vue"
	import CartBottomBar from "./childComps/CartBottomBar.vue"
	export default {
		name:"Shop",
		components:{
			NavBar,
			CartList,
			CartBottomBar
		},
		computed:{
			cartLength() {
				return this.$store.state.cartList.length
			}
		}
	}
</script>

<style scoped>
	.Shop{
		height: 100vh;
	}
	.nav-bar{
		background-color:  #ff5777;
		color: white;
		font-weight: 700;
	}
	
</style>
