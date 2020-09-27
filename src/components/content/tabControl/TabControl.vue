<template>
	<div class="tab-control">
		<div class="tab-control-item" v-for="(item,index) in titles" :key="index" 
		:class="{active: currentIndex===index}" @click="tabClick(index)">
			<span>{{item}}</span>
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			titles:{
				type:Array,
				default() {
					return []
				}
			}
		},
		data() {
			return {
				currentIndex:0
			}
		},
		methods:{
			tabClick(index) {
				this.currentIndex = index 
				this.$emit("tabClick",index)
			}
		}
		
	}
</script>

<style>
	.tab-control{
		display: flex;
		text-align: center;
		background-color: #fff;
	}
	.tab-control-item{
		flex: 1;
		height: 40px;
		line-height: 40px;
		font-size: 14px;
	}
	.active{
		color: #FF8198;
	}
	.tab-control-item span {
		padding: 8px;
	}
	.active span {
		border-bottom: 3px solid #ff8198;
	}
</style>
