<template>
	<div class="login">
			<nav-bar class="nav-bar">
				<div slot="left" class="back" @click="backclick">
					<img src="../../../assets/img/detail/back.svg" alt="">
				</div>
				</nav-bar>
			<bm_phone_login v-on:accountLogin="to_account_login"
		                     v-on:changedPhone="to_change_phone"
		                     v-on:qq_login="qqLogin"
		                     v-on:weixin_login="weixinLogin"
		                     v-on:weibo_login="weiboLogin"
		                     @parent_choose_area="to_chooseArea"
		                     @parent_get_code="getCode"
		                     @parent_phone_login="phoneLogin"
		                     :base-config="myConfig">
		      <template v-slot:country_tel>+{{countryTel}}</template>
		  </bm_phone_login>
	</div>
</template>

<script>
	import NavBar from "../../../components/common/navbar/NavBar.vue"
	export default {
		name:"LogIn",
		components:{
			NavBar
		},
		  data(){
		      return{
		          countryTel:"",
		          myConfig: {
		              code_length:'6',
		              accountLogin:true,
		              changedPhone: true,
		              protocol: true,
		              otherLoginWays: true,
		              //登录按钮中的内容
		              login_btn_value: '注册'
		          }
		      }
		   },
		   methods:{
		       to_chooseArea(){
		           // 跳转到区号选择页面
		           this.$router.push({path:'/phoneLogin/selectCode'});
		       },
		       to_account_login(){
		           // 跳转到账号密码登录页面
		           this.$router.push({path:'/'});
		       },
		       to_change_phone(){
		           //跳转到更改手机号页面
		       },
		       getCode(tel){
		           //获取验证码
		           console.log("tel:"+tel);//用户输入的手机号
		           let params = new URLSearchParams();
		           //参数：手机号（可根据自己需要自行添加）
		           params.append('YourParamName',tel);
		           //发送请求
		           this.axios.post('xxx',params)
		               .then((res) => {
		                   console.log(res);
		               })
		               .catch((err) => {
		                   console.log(err);
		               });
		       },
		       phoneLogin(inputInfo){
		           //登录
		           console.log(inputInfo);//用户输入的手机号及验证码
		           let params = new URLSearchParams();
		           //参数：手机号，验证码（可根据自己需要自行添加）
		           params.append('YourParamName1',inputInfo.phone);
		           params.append('YourParamName2',inputInfo.code);
		           //发送请求
		           this.axios.post('xxx',params)
		               .then((res) => {
		                   console.log(res);
		               })
		               .catch((err) => {
		                   console.log(err);
		               });
		       },
		       qqLogin(){},
		       weixinLogin(){},
		       weiboLogin(){},
					 backclick() {
						 this.$router.go(-1)
					 }
		   },
		   mounted() {
		       this.countryTel = this.$route.params.tel || 86;
		   }
	}
</script>

<style>
	.login {
		position: fixed;
		top: 10px;
		left: 0;
		right: 0;
		background-color: white;
		z-index: 100;
	}
	.back{
		padding-left: 20px;
		padding-top: 2px;
	}
</style>
