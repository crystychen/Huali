<template>
	<el-header id="menus-wrap" class="" :height="'100px'">
		<!-- 导航菜单 -->
		<el-row :type="'flex'" :justify="'center'">
			<!-- <el-col :xl="20" :lg="20" :md="22" :sm="24" :xs="24"> -->
			<div class="header-wrap">
				<div class="logo hidden-xs-only hidden-sm-only">
					<img class="img" src="../assets/logo.png">
				</div>
				<!-- @select="handleSelect" -->
				<!-- background-color="#4A92EF" text-color="#fff" active-text-color="#ffd04b" -->
				<!-- :default-active="$route.path" -->
				<el-menu :default-active="activeIndex" :active="activeIndex" class="menu el-menu-demo" mode="horizontal" @select="handleSelect"
				 @open="openMenu" @close="closeMenu" :router="router">
					<template v-for="(item,index) in menu">
						<el-submenu  :index="'/'+item.link+'/'+item.id" @click="clickMenu(item)" :popper-append-to-body="true"
						 popper-class="custom-submenu" v-if="item.children.length">
							 <template slot="title">{{item.title}}</template>
							 <el-menu-item v-for="child in item.children"  :index="'/'+child.link+'/'+child.id"  :key="child.id" @click="clickMenu(child)">
								<a :href="child.link" target="_blank" v-if="child.link.indexOf('http') > -1">{{child.title}}</a>
								<template v-else>{{child.title}}</template>
							</el-menu-item>
						</el-submenu>
						<el-menu-item index="/" v-else @click="clickMenu(item)">
							{{item.title}}
						</el-menu-item>
					</template>
					<!-- <el-submenu index="/" popper-class="custom-submenu">
							<template slot="title">关于华立</template>
							<el-menu-item index="/intros">公司概况</el-menu-item>
							<el-menu-item index="/develops">发展历程</el-menu-item>
							<el-menu-item index="/culture">企业文化</el-menu-item>
							<el-menu-item index="/framework">公司架构</el-menu-item>
							<el-menu-item index="/honorary">荣誉资质</el-menu-item>
							<el-menu-item index="/video">华立视频</el-menu-item>
							<el-menu-item index="/roaming">全景漫游</el-menu-item>
							<el-menu-item index="/base">华立基地</el-menu-item>
						</el-submenu>
						<el-submenu index="/product" popper-class="custom-submenu">
							<template slot="title">产品中心</template>
							<el-menu-item index="/product/FB">封边片材系列</el-menu-item>
							<el-menu-item index="/product/YX">异型线材系列</el-menu-item>
							<el-menu-item index="/product/ZS">装饰面材系列</el-menu-item>
						</el-submenu>
						<el-submenu index="/science" popper-class="custom-submenu">
							<template slot="title">科研与环保</template>
							<el-menu-item index="/science">华立科研与生产实力</el-menu-item>
							<el-menu-item index="/innovation">技术创新</el-menu-item>
							<el-menu-item index="/protection">环保与生活</el-menu-item>
						</el-submenu>
						<el-menu-item index="/service">服务&资源</el-menu-item>
						<el-submenu index="/contact" popper-class="custom-submenu">
							<template slot="title">联系我们</template>
							<el-menu-item index="/contact">联系方式</el-menu-item>
							<el-menu-item index="/feedback">留言反馈</el-menu-item>
						</el-submenu> -->
					<!-- <i class="icon el-icon-s-tools"></i> -->
				</el-menu>
			</div>
			<!-- </el-col> -->
		</el-row>
	</el-header>
</template>

<script>
	export default {
		name: 'Header',
		props: {
			menu: {
				type: Array,
				default: function() {
					return []
				}
			}
		},
		computed: {
			// activeId: function () {
			// 	
			// }
		},
		data() {
			return {
				msg: 'Welcome to Your Vue.js App',
				activeIndex: "/",
				router: true,
				isShow: false,
				activeId: 0,
				preRoute: 0
			}
		},
		methods: {
			openMenu(key) {
				console.log("打开二级菜单", key)
			},
			closeMenu(key) {
				console.log("关闭二级菜单", key)
			},
			handleSelect(key, keyPath) {
				// this.isShow = this.defaultActive != key;
				// window.console.log(this.isShow);
				console.log("handleSelect path", key)
				console.log("handleSelect keyPath", keyPath)

				let arr = key.split("/");
				this.$store.state.topNavActive = key;
				// this.$router.push({
				// 	name: arr[0],
				// 	params: {
				// 		id: arr[1]
				// 	}
				// })
				console.log("$route", this.$route);
				this.preRoute = this.$route; // 当前路由获取到的是点击前的路由
				// this.$emit('', key); // /api/contentCategory/category/
			},
			clickMenu(e) {
				let type = e.type; // type: 0(栏目)， 4(图片)，3(产品)
				// this.$store.state.topNavActive = e.link;
				this.$emit('getContent', e);
				console.log(this.$store.state.topNavActive)
				let path = this.$route.path;

				// this.activeId = e.id;
				let link = e.link;
				if (link && link.indexOf("http") > -1) {
					// console.log("preRoute", this.preRoute)
					this.$router.push({
						// name: "Home"
						path: this.preRoute.path
					})
					return;
				}
				this.$router.push({
					name: e.link,
					params: {
						id: e.id
					}
				})
			},
			getNavType() {
				//store.state.topNavActive里值变化的时候，设置activeIndex
				this.activeIndex = this.$store.state.topNavActive;
			},
		},
		mounted: () => {
			console.log("menu")
			console.log(this.menu)

		},
		watch: {
			// 监测store.state
			'$store.state.topNavActive': 'getNavType'
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
	#menus-wrap {
		font-family: SourceHanSansCN-Regular;
	}

	.el-header {
		background-color: #4a92ef;
		color: #fff;
		margin: 0 auto;
		height: 100px;
		line-height: 100px;
		width: 100%;
		box-sizing: border-box;
	}

	.header-wrap {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		// max-width: 1200px;
		margin: 0 auto;
		height: 100px;
	}

	.menu {
		// width: 100%;
		width: 100%;
		margin: 0 auto;
		flex: 1;
	}


	.logo {
		// width: 240px;
		// height: 72px;
		width: 10vw;

		img {
			width: 100%;
			border: none;
			max-width: 100%;
			vertical-align: middle;
		}
	}

	/* 重写导航菜单样式 */
	.el-menu-demo {
		background: #4C91EF;
	}

	.el-menu-item {
		font-size: 1rem;
	}

	.el-menu--horizontal>.el-menu-item {
		// 一级菜单
		color: #FFFFFF !important;
		background: #4a92ef !important;
		font-size: 1rem;
		padding: 0;
		height: 100px;
		line-height: 100px;
		margin-left: 2vw;
		border-bottom: none !important;
		// text-shadow: 0px 0px 10px rgba($color: #ffffff, $alpha: 0.75);
	}

	.el-menu.el-menu--horizontal .icon {
		margin-left: 2vw;
	}

	.header-wrap /deep/ .el-menu {
		background: #4C91EF;
	}
	.header-wrap .el-menu {
		background: #4C91EF;
	}
	.el-menu {
		background: #4C91EF;
	}

	/* 利用深度/deep/深度修改组建的样式 */
	.header-wrap /deep/ .el-menu--horizontal>.el-submenu .el-submenu__title {
		height: 100px !important;
		line-height: 100px !important;
		color: #FFFFFF;
		background: #4a92ef;
		border-bottom: none;
	}

	.header-wrap .el-menu--horizontal>.el-submenu .el-submenu__title {
		height: 100px !important;
		line-height: 100px !important;
		color: #FFFFFF;
		background: #4a92ef;
		border-bottom: none;
	}

	.header-wrap /deep/ .el-submenu__title i {
		color: #fff;
	}

	.header-wrap .el-submenu__title i {
		color: #fff;
	}

	.el-menu--horizontal>.el-menu-item.is-active {
		// color: #ffd04b !important;
		background: #4a92ef !important;
		text-shadow: 0px 0px 10px rgba($color: #ffffff, $alpha: 0.75);
	}

	/* 鼠标悬浮时，子菜单的样式 */
	.el-menu-item:hover {
		outline: 0 !important;
		color: #fff !important;
		background: #4a92ef !important;
		text-shadow: 0px 0px 10px rgba($color: #ffffff, $alpha: 0.75);
	}

	// 二级菜单
	.el-submenu.is-active .el-submenu__title {
		text-shadow: 0px 0px 10px rgba($color: #ffffff, $alpha: 0.75);
	}

	.el-menu--popup .el-menu-item {
		color: #FFFFFF !important;
		background: transparent !important;
	}

	.el-menu--popup .el-menu-item a {
		color: #FFFFFF !important;
		background: transparent !important;
		height: 100px;
		vertical-align: middle;
	}

	.el-menu--horizontal>.el-submenu:hover .el-submenu__title {
		color: #FFFFFF;
	}

	.el-menu--popup .el-menu-item:hover,
	.el-menu--popup .el-menu-item:hover a {
		color: #FFFFFF !important;
		background: transparent !important;
		text-shadow: 0px 0px 10px rgba($color: #ffffff, $alpha: 0.75);
	}

	.el-menu--popup>.el-menu-item.is-active {
		// color: #ffd04b !important;
		text-shadow: 0px 0px 10px rgba($color: #ffffff, $alpha: 0.75);
	}

	.el-menu--horizontal>.el-submenu.is-active .el-submenu__title {
		color: #FFFFFF;
	}

	/* 鼠标悬浮时，主菜单的样式 */
	.menu /deep/ .el-submenu__title {
		font-size: 1rem;
		padding: 0;
		margin-left: 2vw;
	}

	.menu .el-submenu__title {
		font-size: 1rem;
		padding: 0;
		margin-left: 2vw;
	}

	.menu /deep/ .el-submenu__title:focus,
	.menu /deep/ .el-submenu__title:hover {
		outline: 0 !important;
		// color: #ffd04b !important;
		background: #4a92ef !important;
		text-shadow: 0px 0px 10px rgba($color: #ffffff, $alpha: 0.75);
	}

	.menu .el-submenu__title:focus,
	.menu .el-submenu__title:hover {
		outline: 0 !important;
		// color: #ffd04b !important;
		background: #4a92ef !important;
		text-shadow: 0px 0px 10px rgba($color: #ffffff, $alpha: 0.75);
	}

	.el-menu--horizontal {
		width: 100%;
	}

	.el-menu.el-menu--horizontal {
		border-bottom: none;
	}

	.el-menu--popup-bottom-start {
		margin-top: 0;
		box-shadow: none;
	}

	.custom-submenu /deep/ .el-menu--popup {
		margin: 0 auto;
		text-align: center;
		background: transparent;
		height: 100px;
		line-height: 100px;
	}

	.custom-submenu .el-menu--popup {
		margin: 0 auto;
		text-align: center;
		background: transparent;
		height: 100px;
		line-height: 100px;
	}

	.custom-submenu {
		left: 0;
		width: 100%;
		background: rgba($color: #000000, $alpha: 0.5);
		height: 100px;
		font-family: SourceHanSansCN-Regular;
	}

	.el-menu--popup.el-menu .el-menu-item {
		display: inline-block;
		position: relative;
		color: #FFFFFF;
		padding: 0 1.875rem;
		margin: 0;

		&:after {
			content: '';
			width: 1px;
			height: 1rem;
			position: absolute;
			right: 0;
			top: 50%;
			transform: translateY(-50%);
			background: #FFFFFF;
		}

		&:last-child {
			&:after {
				content: '';
				width: 0px;
				height: 1rem;
				position: absolute;
				right: 0;
				top: 50%;
				transform: translateY(-50%);
				background: #FFFFFF;
			}
		}
	}

	@media (max-width: 1200px) {
		.menu /deep/ .el-submenu__title {
			margin-left: 1vw;
		}
		
		.menu .el-submenu__title {
			margin-left: 1vw;
		}

		.icon {
			margin-left: 1vw;
		}

		.el-menu--horizontal>.el-menu-item {
			// 一级菜单
			margin-left: 1vw;
		}
	}
</style>
