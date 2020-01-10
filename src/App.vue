<template>
	<div id="app">
		<!-- <router-link to='/'>首页</router-link> -->
		<!-- <router-link to='/user'>用户管理</router-link> -->
		<el-container class="container" direction="vertical">
			<!-- 子元素有el-header或el-footer为vertical,否则为horizontal，所以加上direction="vertical" -->
			<!-- <el-header :height="'100px'"> -->
			<!-- 导航栏 -->
			<header-nav :menu="menu" @getContent="transContent"></header-nav>
			<!-- <navs></navs> -->
			<!-- </el-header> -->
			<el-main>
				<!-- <carousel :banner="banner" :bannerHeight="bannerHeight"></carousel> -->
				<!-- <div class="content" v-html="summary"></div> -->
				<!-- <component v-bind:is="currentTabComponent" :callbackdata="callbackdata"></component> -->
				<!-- <router-view /> -->
				<keep-alive>
				    <router-view v-if="$route.meta.keepAlive">
				        <!-- 这里是会被缓存的视图组件，比如 page1,page2 -->
				    </router-view>
				</keep-alive>
				
				<router-view v-if="!$route.meta.keepAlive">
				    <!-- 这里是不被缓存的视图组件，比如 page3 -->
				</router-view>
	
			</el-main>
			<!-- <el-footer :height="'auto'"> -->
			<footer-bar :menu="menu" @getContent="transContent" :linkData="linkData"></footer-bar>
			<!-- </el-footer> -->
		</el-container>
		<!-- <img src="./assets/logo.png"> -->

	</div>
</template>

<script>
	import header from './components/header.vue';
	import footer from './components/Footer.vue';
	import navs from './components/navs.vue';
	import carousel from '@/components/carousel.vue';
	import product from '@/views/product.vue';
	import news from '@/views/news.vue';
	import Home from '@/views/index.vue';
	import Intros from '@/views/introduction.vue';
	import govern from '@/views/government.vue';
	import framework from '@/views/framework.vue';
	import honorary from '@/views/honorary.vue';
	import HuaVideo from '@/views/video.vue';
	import introduction from '@/views/introduction.vue';

	export default {
		name: 'App',
		components: {
			headerNav: header,
			footerBar: footer,
			Navs: navs,
			Home: Home,
			carousel: carousel,
			product: product,
			news: news,
			Intros: Intros,
			govern: govern,
			framework: framework,
			honorary: honorary,
			HuaVideo: HuaVideo,
			introduction: introduction,
		},
		data() {
			return {
				menu: [],
				summary: "",
				currentTabComponent: "",
				callbackdata: {}, //返回数据
				linkData: {}
			}
		},
		methods: {
			getScreenWidth() {
				//store.state.topNavActive里值变化的时候，设置activeIndex
				// this.activeIndex = this.$store.state.topNavActive;
			},
			getMenus() {
				this.$axios.get('/api/contentCategory/tops').then(res => {
					console.log(res.data);
					if (res.data.code == "00") {
						this.menu = res.data.data;
						this.$store.state.activeMenuId = this.menu[0].id;
						let id = this.$route.params.id;
						let type = this.checkTypeById(id, this.menu);
						// console.log("this.menu", this.menu)
						// if (id) {
						this.getDatasByIdType(id, type)
						// }else {

						// }
					}
				}, response => {
					console.log("error");
				});
			},
			transContent(data) {
				console.log("content", data)
				// this.content = data;
				// this.summary = data.summary
				if (data == 0) {
					this.currentTabComponent = "Home"
					return;
				}
				console.log("data,", data)
				this.getDatasByIdType(data.id, data.type)
			},
			getBannerData() {
				this.$axios.get('/api/banner/list/1/1').then(res => {
					// console.log(res.data);
					if (res.data.code == "00") {
						this.banner = res.data.data;
					}
				}, response => {
					console.log("error");
				});
			},
			getDatasByIdType(id, type) {
				let url = "/api/contentCategory/category/";
				let data = {};
				// if (type == 0) { // 普通文章类
				// 	// url = "/api/contentCategory/category/";
				// 	this.currentTabComponent = "framework"
				// } else if (type == 3) { // 产品类
				// 	// url = '/api/contentCategory/category/';
				// 	data = {
				// 		limit: 3,
				// 		page: 1
				// 	}
				// 	this.currentTabComponent = "product"
				// } else if (type == 2) { // 新闻类
				// 	// url = '/api/contentCategory/category/';
				// 	data = {
				// 		limit: 3,
				// 		page: 1
				// 	}
				// 	this.currentTabComponent = "news"
				// } else if (type == 5) { // 公司治理类
				// 	this.currentTabComponent = "govern"
				// } else if (type == 4) { // 荣誉资质类
				// 	// url = '/api/banner/content/';
				// 	this.currentTabComponent = "honorary"
				// } else if (type == 6) { // 视频类
				// 	this.currentTabComponent = "video"
				// }

				this.currentTabComponent = this.matchingType(type);
				if (id == 9) {
					this.currentTabComponent = "introduction"
				}
			},
			matchingType(type) {
				let name = "Home"
				switch (type) {
					case 0: // 栏目（概况）
						name = "framework"
						break;
					case 1:
						name = "framework"
						break;
					case 2: // 新闻资讯（新闻类）
						name = "news"
						break;
					case 3: // 产品中心（产品类）
						name = "product"
						break;
					case 4: // 荣誉资质（图片类）
						name = "honorary"
						break;
					case 5: //  公司治理（附件）
						name = "govern"
						break;
					case 6: // 视频类
						name = "HuaVideo"
						break;
					default:
						break;
				}
				return name;
			},
			// 检查类型
			checkTypeById(id, arr) {
				for (var i = 0; i < arr.length; i++) {
					if (arr[i].id == id) {
						return arr[i].type;
					}
				}
			},
			getLinkData() {
				// /api/website/one
				this.$axios.get('/api/website/one').then(res => {
					// console.log(res.data);
					if (res.data.code == "00") {
						this.linkData = res.data.data;
						document.title = this.linkData.seoTitle;
						document.querySelector('meta[name="keywords"]').setAttribute('content', res.data.data.seoKeyword);
						document.querySelector('meta[name="description"]').setAttribute('content', res.data.data.seoRemark)
					}
				}, response => {
					console.log("error");
				});
			}
		},
		created() {
			this.getMenus(); //  获取动态导航菜单
			// this.getBannerData(); // 获取banner图
			this.getLinkData(); // 站点信息
		},
		mounted() {
			// 取得屏幕宽度
			var devicewidth = document.documentElement.clientWidth || document.body.clientWidth
			// //动态设置 html font-size 值
			this.$store.state.devicewidth = window.innerWidth;
			this.$store.state.topNavActive = this.$route.path; // 活跃菜单与当前路径对应
			this.bannerHeight = 480 / 1920 * window.innerWidth;

			console.log(this.$route.path)
			console.log(this.$route.params.id)
			// this.getMenus()

			console.log("window.innerWidth", window.innerWidth);
			console.log("window.devicewidth", devicewidth);

			if (devicewidth > 1920) {
				document.getElementsByTagName('html')[0].style.fontSize = '18px';
				return;
			}
			if (devicewidth >= 1200 && devicewidth <= 1920) {
				document.getElementsByTagName('html')[0].style.fontSize = '16px';
				return;
			}
			document.getElementsByTagName('html')[0].style.fontSize = '14px';
			window.onresize = () => {
				// 取得屏幕宽度
				var devicewidth = document.documentElement.clientWidth || document.body.clientWidth;
				this.screenWidth = window.innerWidth;
				console.log("window.innerWidth", window.innerWidth);
				console.log("window.devicewidth", devicewidth);

				this.$store.state.devicewidth = window.innerWidth;
				// //动态设置 html font-size 值
				// console.log(devicewidth)
				if (devicewidth > 1920) {
					document.getElementsByTagName('html')[0].style.fontSize = '18px';
					return;
				}
				if (devicewidth >= 1200 && devicewidth <= 1920) {
					document.getElementsByTagName('html')[0].style.fontSize = '16px';
					return;
				}
				document.getElementsByTagName('html')[0].style.fontSize = '14px';
			}

			// this.currentTabComponent = "Home"
		},
		watch: {
			// 监测store.state
			// '$store.state.devicewidth': 'getScreenWidth'
		}
	}
</script>

<style>
/* 	@import url("../static/font/font/SourceHanSansCN-Regular.css");
	@import url("../static/font/font-bold/font-bold.css"); */
	/* rem是相对于html根元素进行设定，一般html默认字体大小是16px,如果想要设置12px的字体大小也就是12px/16px = 0.75rem。 */
	html,
	body {
		font-size: 16px;
		margin: 0;
		padding: 0;
		/* font-family: SourceHanSansCN-Regular; */
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	p {
		margin: 0;
		padding: 0;
		line-height: 1.5;
		/* font-family: SourceHanSansCN-Regular; */
	}

	#app {
		/* font-family: SourceHanSansCN-Regular; */
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		/* color: #2c3e50; */
		background: #F8F8F8;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	li {
		list-style: none;
		margin: 10px 0;
	}

	a {
		text-decoration: none;
		color: #333333;
	}

	#app /deep/ .el-main {
		padding: 0;
		background: #FFFFFF;
	}
	
	#app .el-main {
		padding: 0;
		background: #FFFFFF;
	}

	.el-footer {
		width: 100%;
		background: #FAFAFA;
		padding: 0;
	}
</style>
