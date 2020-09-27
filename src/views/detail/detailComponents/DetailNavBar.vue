<template>
	<div>
		<nav-bar>
			<div slot="left" class="back" @click="backclick">
				<img src="../../../assets/img/detail/back.svg" alt="">
			</div>
			<div slot="center" class="title">
				<div v-for="(item,index) in titles" class="title-item"
				 @click="detailclick(index)" :class="{active:currentIndex === index}" :key="index">
					{{item}}
				</div>
			</div>
		</nav-bar>
	</div>
</template>

<script>
	import NavBar from "../../../components/common/navbar/NavBar.vue"
	export default {
		name:"DetailNavBar",
		components:{
			NavBar
		},
		data() {
			return {
				titles:["商品","参数","评论","推荐"],
				currentIndex:0
			}
		},
		methods:{
			detailclick(index) {
			this.currentIndex = index
			this.$emit("titleClick",index)
			},
			backclick() {
				this.$router.go(-1)
			}
		}
	}
</script>

<style scoped>
	.title {
		display: flex;
		font-size: 13px;
	}
	.title-item {
		flex: 1;
	}
	.active {
		color: #FF8198;
	}
	.back{
		padding-left: 20px;
		padding-top: 6px;
	}
</style>
