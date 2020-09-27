<template>
	<div class="goods-list-item" @click="itemclick">
		<!-- <img :src="showImage" alt="" @load="imageLoad"> -->
		<img v-lazy="showImage" alt="" @load="imageLoad">
		<div class="goods-info">
			<p>{{goodsItem.title}}</p>
			<span class="price">¥{{goodsItem.price}}</span>
			<span class="collect">{{goodsItem.cfav}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name:"GoodsListItem",
		props:{
			goodsItem:{
				type:Object,
				default() {
					return {}
				}
			}
		},
		methods:{
			imageLoad() {
				this.$bus.$emit("itemImageLoad")
			},
			itemclick() {
				this.$router.push("/detail/"+ this.goodsItem.iid)
			}
		},
		computed:{
			showImage() {
				return this.goodsItem.image || this.goodsItem.show.img
			}
		}
	}
</script>

<style scoped>
	.goods-list-item {
	  padding-bottom: 40px;
	  position: relative;
		/* 设置元素占整个屏幕的百分比 */
		width: 48%;
	}
	.goods-list-item img {
	  width: 100%;
		border-radius: 2%;
	}
	
	.goods-info {
	  font-size: 12px;
	  position: absolute;
	  bottom: 5px;
	  left: 0;
	  right: 0;
	  overflow: hidden;
	  text-align: center;
	}
	
	.goods-info p {
	  overflow: hidden;
	  text-overflow: ellipsis;
	  white-space: nowrap;
	  margin-bottom: 3px;
	}
	
	.goods-info .price {
	  color:  #ff5777;
	  margin-right: 20px;
	}
	
	.goods-info .collect {
	  position: relative;
	}
	
	.goods-info .collect::before {
	  content: '';
	  position: absolute;
	  left: -15px;
	  top: 0;
	  width: 14px;
	  height: 14px;
	  background: url(../../../assets/img/collect/collect.svg) 0 0/14px 14px;
	}
</style>
