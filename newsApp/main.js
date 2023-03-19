import App from './App'

import Vue from 'vue'

import store from '@/store/index.js'

// import "swiper/swiper.min.css"
Vue.config.productionTip = false

App.mpType = 'app'
const app = new Vue({
	...App,
	store
})
app.$mount()