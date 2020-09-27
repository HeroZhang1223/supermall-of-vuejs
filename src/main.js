import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from "./components/common/toast/index.js"
import swal from 'sweetalert'
import bmVlogin from 'bm-vlogin'
import {bm_phone_login} from 'bm-vlogin'
import Mint from 'mint-ui'
import fastClick from "fastclick"
import vueLazyLoad from "vue-lazyload"

// 图片懒加载
Vue.use(vueLazyLoad,{
	preLoad: 1,
	loading:require('./assets/img/load/loader.png')
})

Vue.use(Mint); 
Vue.use(bmVlogin)

//按需引入
Vue.use(bm_phone_login);

Vue.use(toast)



// 解决移动端300ms延迟问题
fastClick.attach(document.body)

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue() 

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
