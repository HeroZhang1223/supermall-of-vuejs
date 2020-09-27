<template>
	<div class="bottom-menu">
	  <CheckButton class="select-all" :is-checked="isSelectAll" @click.native="checkBtn"></CheckButton>
	  <span>全选</span>
	  <span class="total-price">合计: ¥{{totalPrice}}</span>
	  <span class="buy-product" @click="calcClick">去计算({{checkedLength}})</span>
	</div>
</template>

<script>
	import CheckButton from "./CheckButton.vue"
	export default {
		name:"CartBottomBar",
		components:{
			CheckButton
		},
		computed:{
			totalPrice() {
				return this.$store.state.cartList.filter((item) => {
					return item.checked
				}).reduce((pre,next) => {
					return pre + next.price*next.count
				},0).toFixed(2)
			},
			checkedLength() {
				return this.$store.state.cartList.filter(item => {
					return item.checked
				}).length
			},
			isSelectAll() {
				if(this.$store.state.cartList.length === 0) return false
				// return !this.$store.state.cartList.find(item => !item.checked)
				return this.$store.state.cartList.every(item => {
					return item.checked
				})
			}
		},
		methods:{
			checkBtn() {
				if(this.isSelectAll) {
					// 如果全部选中
					this.$store.state.cartList.forEach(item => item.checked = false)
				}else{
					// 如果不选中或者部分选中
					this.$store.state.cartList.forEach(item => item.checked = true)
				}
			},
			calcClick(){
				if(this.checkedLength ===0){
					this.$toast.show("请选择购买的商品",1500)
				}
			}
		}
	}
</script>

<style scoped>
	.bottom-menu {
	  width: 100%;
	  height: 44px;
	  background-color: #eee;
	  position: fixed;
	  bottom: 50px;
	  left: 0;
	  box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
	  font-size: 14px;
	  color: #888;
	  line-height: 44px;
	  padding-left: 35px;
	  box-sizing: border-box;
	}
	
	.bottom-menu .select-all {
	  position: absolute;
	  line-height: 0;
	  left: 12px;
	  top: 13px;
	}
	
	.bottom-menu .total-price {
	  margin-left: 15px;
	  font-size: 16px;
	  color: #666;
	}
	
	.bottom-menu .buy-product {
	  background-color: orangered;
	  color: #fff;
	  width: 100px;
	  height: 44px;
	  text-align: center;
	  line-height: 44px;
	  float: right;
	}
</style>
