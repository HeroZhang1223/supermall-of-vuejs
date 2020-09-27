<template>
	<div class="wrapper" ref="wrapper">
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import BScroll from "better-scroll"
	export default {
		name:"Scroll",
		props:{
			probeType:{
				type:Number,
				default:0
			},
			pullUpLoad:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				scroll:null
			}
		},
		mounted() {
			this.scroll = new BScroll(this.$refs.wrapper,{
				// 这个设置让better-scroll组件内部能够实现自己的事件监听
				click:true,
				listenScroll:true,
				probeType:this.probeType,
				pullUpLoad:this.pullUpLoad
			})
			
			// 监听滚动的位置
			this.scroll.on('scroll',(position) => {
				this.$emit('scroll',position)
			})
			
			// 监听上拉加载更多
			this.scroll.on('pullingUp',() => {
				this.$emit("pullingUp")
			})
			
			
		},
		methods:{
			scrollTo(x,y,time=500){
				this.scroll.scrollTo(x,y,time)
			},
			finishPullUp() {
				this.scroll.finishPullUp()
			},
			refresh() {
				this.scroll && this.scroll.refresh()
			}
		}
	}
</script>

<style>
</style>
