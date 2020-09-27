import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		cartList:[]
  },
  mutations: {
		addCounter(state,payload){
			payload.count++
		},
		addToCart(state,payload){
			payload.checked = true
			state.cartList.push(payload)
		}
  },
  actions: {
		addCart(context,payload) {
			return new Promise((resolve,reject) =>{
				let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
				if(oldProduct){
					// oldProduct.count +=1
					context.commit("addCounter",oldProduct)
					resolve("再次添加了该商品")
				}else{
					payload.count = 1
					// context.state.cartList.push(payload)
					context.commit("addToCart",payload)
					resolve("添加购物车成功！")
				}
			})
		}
  },
  modules: {
  }
})
