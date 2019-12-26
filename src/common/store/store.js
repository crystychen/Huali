// 集中式存储管理应用的所有组件的状态
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const store = new Vuex.Store({
	state: {
		count: 0,
		topNavActive: "/", //菜单顶部导航
		devicewidth: 0, // 屏幕宽度
		activeMenuId: 0,  // 当前选中导航id
		activeProsId: 0, // 产品中心当前Id
	},
	mutations: {
		login(state, provider) {
			state.hasLogin = true;
			state.loginProvider = provider;
		},
		increment (state) {
			state.count++
		}
	},
	actions: {
		// lazy loading openid
		getUserInfo: async function({
			commit,
			state
		}, arrObj) {
			return new Promise((resolve, reject) => {
				const authLevel = arrObj[0];
				const uinfo = arrObj[1];
				if (authLevel == 2 && uinfo) { // 利用缓存，直接调用
					console.info('getUserInfo-利用缓存，直接回调:authLevel=' + authLevel + ',uinfo=' + uinfo);
					resolve(uinfo);
				} else {
					if (state.iv && state.encryptedData) { // 已经点击过授权，请求后台解密
						console.log(uni.getStorageSync('authKey'));
						console.info('getUserInfo-已经点击授权:用户信息提交后台解密');
						uni.request({
							url: websiteUrl + '/interfaceAction',
							method: 'POST',
							data: {
								interId: '90002',
								version: 1,
								authKey: uni.getStorageSync('authKey'),
								params: {
									iv: state.iv,
									encryptedData: state.encryptedData,
								}
							},
							success: res => {
								console.log('20004')
								console.log(res);
								if (res.data.code == '00') {
									console.info("解密用户信息成功");

									commit('setAuthLevel', res.data.authLevel);

									uni.setStorageSync('authLevel', res.data.authLevel);
									uni.setStorageSync('userInfo', res.data.userInfo);

									resolve(res.data.userInfo);
								}
							}
						})
					}
					// 还没有授权用户信息处理

				}
			})
		},
		login: async function({
			commit,
			state
		}) {
			return new Promise((resolve, reject) => {
				const nt = new Date().valueOf();
				let tinterval = nt - state.loginStamp;
				if (tinterval < 3600000 && uni.getStorageSync('authKey')) { //利用缓存，直接回调
					console.info("距离上一次登陆:" + tinterval + "ms--不重复登陆");
					resolve([uni.getStorageSync('authLevel'), uni.getStorageSync('userInfo')]);
				} else {
					console.info("距离上一次登陆:" + tinterval + "ms--执行登陆");
					uni.login({
						success: logres => {
							// 2.返回code到后台
							uni.request({
								url: websiteUrl + '/interfaceAction',
								method: 'POST',
								data: {
									interId: '90001',
									version: 1,
									authKey: uni.getStorageSync('authKey'),
									params: {
										code: logres.code,
										appId: appId,
										// channelId: state.channelId
									}
								},
								success: res => {
									console.log('20002')
									console.log(res);

									if (res.data.code == '00') { //登陆成功记录数据
										console.info('登陆成功啦');

										var timestamp = (new Date()).valueOf();
										commit('setLoginStamp', timestamp);
										
										commit('setAuthLevel', res.data.data.level);
										commit('setUserInfo', res.data.data.userInfo);
										
										uni.setStorageSync('userInfo', res.data.data.userInfo)
										uni.setStorageSync('authKey', res.data.data.authKey);
										uni.setStorageSync('authLevel', res.data.data.level);

										resolve([res.data.data.level, res.data.data.userInfo]);
									}else {
										reject(res.data);
									}
								},
								fail (err) {
									reject(err);
								}
							})
						}
					});
				}
			})
		},
		getUpdateUserInfo: async function({
			commit,
			state
		}) {
			return new Promise((resolve, reject) => {	
				uni.login({
					success: logres => {
						// 2.返回code到后台
						uni.request({
							url: websiteUrl + '/interfaceAction',
							method: 'POST',
							data: {
								interId: '90001',
								version: 1,
								authKey: uni.getStorageSync('authKey'),
								params: {
									code: logres.code,
									appId: appId,
									// channelId: state.channelId
								}
							},
							success: res => {
								console.log(res);
								if (res.data.code == '00') { //登陆成功记录数据
								
									var timestamp = (new Date()).valueOf();
									commit('setLoginStamp', timestamp);
									
									commit('setAuthLevel', res.data.data.level);
									commit('setUserInfo', res.data.data.userInfo);

									uni.setStorageSync('userInfo', res.data.data.userInfo)
									uni.setStorageSync('authKey', res.data.data.authKey);
									uni.setStorageSync('authLevel', res.data.data.level);

									resolve([res.data.data.level, res.data.data.userInfo]);	
								}else {
									reject(res.data)
								}
							},
							fail (err) {
								reject(err)
							}
						})
					}
				});
			})
		},
	}
})

export default store
