// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
Vue.use(ElementUI)

import App from './App'
import router from './router'
//绑定store状态管理到全局，挂载Vuex
import store from './common/store/store'
Vue.prototype.$store = store

import axios from 'axios'
axios.defaults.baseURL = 'http://hualiadmin.ejamad.com'
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.prototype.$axios = axios

Vue.config.productionTip = false

// 跳转后返回顶部
router.afterEach((to, from, next) => {
	window.scrollTo(0, 0);
})
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: {
		App
	},
	template: '<App/>'
})
