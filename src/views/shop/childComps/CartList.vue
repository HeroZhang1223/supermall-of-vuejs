<template>
	<div class="cart-list">
		<scroll class="content" ref="scroll">
			<!-- <li v-for="(item,index) in $store.state.cartList" :key="index">{{item}}</li> -->
			
		<cart-list-item v-for="(item,index) in $store.state.cartList" :key="index" :product="item"></cart-list-item>
		</scroll>
		
	</div>
	
</template>

<script>
	import Scroll from "../../../components/common/scroll/Scroll.vue"
	import CartListItem from "./CartListItem.vue"
	export default {
		name:"CartList",
		components:{
			Scroll,
			CartListItem
		},
		activated() {
			this.$refs.scroll.refresh()
		}
		
	}
</script>

<style scoped>
	.cart-list{
		height: calc(100% - 44px - 49px - 40px);
	}
	.content{
		height: 100%;
		overflow: hidden;
	}
</style>
