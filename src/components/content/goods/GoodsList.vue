<template>
	<div class="goods-list">
		<goods-list-item v-for="item in goods" :goods-item="item"></goods-list-item>
	</div>
</template>

<script>
	import GoodsListItem from "./GoodsListItem.vue"
	export default {
		name:"GoodsList",
		components:{
			GoodsListItem
		},
		props:{
			goods:{
				type:Array,
				default() {
					return []
				}
			}
		}
	}
</script>

<style scoped>
	.goods-list{
		/* 设置元素为弹性容器 */
		display: flex;
		/* 设置元素自动换行 */
		flex-wrap: wrap;
		/* 设置元素的自动换行 */
		justify-content: space-around;
	}
</style>
