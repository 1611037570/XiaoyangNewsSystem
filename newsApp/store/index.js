// 页面路径：store/index.js 
import Vue from 'vue'
import Vuex from 'vuex'

import user from "./user/index"
Vue.use(Vuex);


const store = new Vuex.Store({
	state: {
		// "name": null,
	},
	modules: {
		user
	}
})

function setupStore() {
	store.commit("user/saveName", uni.getStorageSync("name"))
	store.commit("user/saveRole", uni.getStorageSync("role"))
	console.log("初始化VUEX完成")
}
setupStore()
export default store
