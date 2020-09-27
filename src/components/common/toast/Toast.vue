<template>
	<div class="toast" v-show="isShow">
		{{message}}
	</div>
</template>

<script>
	export default {
		name:"Toast",
		// props:{
		// 	message:{
		// 		type:String,
		// 		default:""
		// 	},
		// 	show:{
		// 		type:Boolean,
		// 		default:false
		// 	}
		// }
		data() {
			return {
				message:"",
				isShow:false
			}
		},
		methods:{
			show(message,duration=1500){
				this.isShow = true
				this.message = message
				setTimeout(() => {
					this.isShow = false
					this.message =""
				},duration)
			}
		}
	}
</script>

<style scoped>
	.toast {
		position: fixed;
		top: 50%;
		left: 50%;
		z-index: 999;
		transform: translate(-50%,-50%);
		padding: 15px 20px;
		color: #fff;
		background-color: rgba(0,0,0,0.75);
		border-radius: 5px;
	}
</style>
