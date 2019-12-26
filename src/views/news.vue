<!-- 新闻资讯 -->
<template>
	<div class="container">
		<el-carousel :height="bannerHeight + 'px'" :autoplay="false" arrow="never">
			<el-carousel-item v-for="(item, index) in banner" :key="index">
				<img class="img-responsive" :src="item.url">
			</el-carousel-item>
		</el-carousel>
		<div class="panel">
			<el-row type="flex" justify="center">
				<el-col :xl="15" :lg="20" :md="24" :sm="24" :xs="24">
					<div class="panel-content">
						<el-tabs v-model="activeName" type="card" @tab-click="handleTabClick">
							<el-tab-pane :label="tab.title" :name="String(tab.id)" v-for="(tab, index) in pinfos.children" :key="index">
								<!-- <span slot="label">企业新闻</span> -->
								<div class="tab-content">
									<div class="news-content-list" v-if="contentData.length">
										<!-- <router-link :to="contents.data[0].id"> -->
										<div class="media" @click="firstDetail(contentData[0].id, contentData[0].link)">
											<div class="media-img">
												<img class="img" :src="contentData[0].clogo"></img>
											</div>
											<div class="media-content">
												<div class="media-content__title">{{contentData[0].title}}</div>
												<div class="media-content__body" v-html="contentData[0].content"></div>
												<div class="media-btn">More →</div>
											</div>
										</div>
										<!-- </router-link> -->
										<div class="list" v-for="(news, index) in contentData" v-if="index >= 1" @click="toDetail(news.id, news.link)">
											<div class="list-left">
												<div class="time-top">{{news.date[2]}}</div>
												<div class="time-bottom">{{news.date[0]}}{{news.date[1]}}</div>
											</div>
											<div class="list-content">
												<div class="list-content__title">{{news.title}}</div>
												<div class="list-content__body">
													<div class="list-info" v-html="news.content">
													</div>
													<div class="media-btn">More →</div>
												</div>
											</div>
										</div>
									</div>
									<div class="pagination-wrap" style="" v-if="contents.count">
										<div class="pagination">
											<div class="pagination__btn" @click="clickOne">首页</div>
											<el-pagination class="" :current-page.sync="currentPage" @current-change="pageChange" background layout="prev, pager, next"
											 :page-size="pageSize" :total="contents.count">
											</el-pagination>
											<div class="pagination__btn" @click="clickLast">末页</div>
										</div>
									</div>
									<div v-else>暂无记录</div>
								</div>
							</el-tab-pane>
						</el-tabs>
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	var fromdetail;
	export default {
		name: 'culture',
		components: {},
		data() {
			return {
				msg: 'Welcome to Your Vue.js App',
				banner: [{
					url: require('../assets/banner5.png'),
				}],
				originImgs: [],
				bannerHeight: 0,
				screenWidth: 0,
				proActiveIndex: 0,
				total: 50,
				pageSize: 4,
				currentPage: 1,
				activeName: 'news',
				activeTitle: '', // 选中tab标题名
				id: 0, // 路径id
				infos: "",
				contents: "",
				contentData: "",
				pinfos: "", // 父tabs
			}
		},
		methods: {
			setSize: function() {
				let screenWidth = this.$store.state.devicewidth;
				this.bannerHeight = 480 / 1920 * screenWidth;
			},
			// tab切换
			handleTabClick(tab) {
				console.log(tab);
				console.log(tab.label);
				this.activeTitle = tab.label
				let name = tab.name;
				// 分页器重置
				this.currentPage = 1;
				this.id = name;
				// 数据重置并请求
				this.getSubContent(name)
			},
			getSubContent(id) {
				let url = '/api/contentCategory/category/';
				this.$axios.get(url + id, {
					params: {
						limit: this.pageSize,
						page: 1
					}
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "00") {
						let infos = res.data.data.info;
						this.infos = infos;
						let data = res.data.data.contents.data
						data.map((element, index) => {
							if (element.link) {
								element.date = element.link.split('-');
								element.content = element.content.replace(/<img.*?>/g, '').replace(/<[^>]+>/g, "");
							}
							return element
						})
						this.contentData = data
						console.log(data)
						console.log(this.contentData)
						this.contents = res.data.data.contents;
						this.activeName = String(infos.id);

					}
				}, response => {
					console.log("error");
				});
			},
			// 分页
			pageChange(e) {
				console.log(e)
				this.currentPage = e;
				this.getData(this.id, true);
			},
			clickOne() {
				this.currentPage = 1;
				this.getData(this.id, true);
			},
			clickLast() {
				this.currentPage = Math.ceil(this.contents.count / this.pageSize);
				this.getData(this.id, true);
			},
			// 初始化页面数据, flag 标志是否为初始数据, true 为查询分页
			getData(id, flag) {
				let url = '/api/contentCategory/category/';
				this.$axios.get(url + id, {
					params: {
						limit: this.pageSize,
						page: this.currentPage
					}
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "00") {
						let infos = res.data.data.info;
						this.infos = infos;
						this.contents = res.data.data.contents;
						let data = res.data.data.contents.data
						data.map((element, index) => {
							if (element.link) {
								element.date = element.link.split('-');
							}
							element.content = element.content.replace(/<img.*?>/g, '').replace(/<[^>]+>/g, "");
							return element
						})

						this.contentData = data
						if (flag == true) {
							return;
						}
						this.activeName = String(infos.id)
						this.activeTitle = infos.title
						// 通过父元素查询子节点
						this.getParentData(infos.pid);
						// 查询子节点
						// this.getSubContent(infos.id);
					}
				}, response => {
					console.log("error");
				});
			},
			getParentData(id) {
				let url = '/api/contentCategory/category/';
				this.$axios.get(url + id, {
					params: {
						limit: 4,
						page: 1
					}
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "00") {
						let infos = res.data.data.info;
						this.pinfos = infos;
						// this.pcontents = res.data.data.contents;
						// 通过父元素查询子节点
						// this.summary = content.summary

					}
				}, response => {
					console.log("error");
				});
			},
			setId() {
				console.log(this.$route)
				this.id = this.$route.params.id
			},
			firstDetail(id, date) {
				console.log("id", id)
				this.$router.push({
					name: 'news-detail',
					params: {
						id: id,
						title: this.activeTitle,
						date: date
					}
				})
			},
			toDetail(id, date) {
				console.log("id", id)
				this.$router.push({
					name: 'news-detail',
					params: {
						id: id,
						title: this.activeTitle,
						date: date
					}
				})
			},
		},
		mounted() {
			this.$store.state.topNavActive = this.$route.path; // 活跃菜单与当前路径对应
			this.setSize();
			let id = this.$route.params.id;
			this.id = id;
			console.log("frame", id)
			this.getData(id)
		},
		created() {
			this.activeName = this.$route.params.type || 'news'
			console.log("this.activeName", this.activeName)
		},
		// beforeRouteEnter(to, from, next) {
		// 	console.log("form")
		// 	console.log(from)
		// 	if (from.name == 'news-detail') {
		// 		fromdetail = true;
		// 	} else {
		// 		formdetail = false
		// 	}
		// 	next();
		// },
		beforeRouteEnter(to, from, next) {
			console.log("beforeEnter", from)
			console.log("to", to)
			// 在渲染该组件的对应路由被 confirm 前调用
			// 不！能！获取组件实例 `this`
			// 因为当守卫执行前，组件实例还没被创建
			to.meta.keepAlive = true;
			next()
		},
		beforeRouteUpdate(to, from, next) {
			// 在当前路由改变，但是该组件被复用时调用
			// 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
			// 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
			// 可以访问组件实例 `this`
			let id = to.params.id;
			this.id = id;
			console.log("frame", id)
			this.getData(id)
			next()
		},
		beforeRouteLeave(to, from, next) {
			// 导航离开该组件的对应路由时调用
			// 可以访问组件实例 `this`
			next()
		},
		watch: {
			// 监测store.state
			'$store.state.devicewidth': 'setSize',
			// 'id': 'getData',
			// "$route.params.id": "setId"
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	@import '../../static/font/iconfont.css';

	// 媒体查询
	@media only screen and (min-width: 992px) {
		.col-grid {
			// width: 960px;
		}
	}

	.container {
		width: 100%;
	}

	p {
		font-size: 18px;
	}

	/* 图片自适应容器 */
	.img-responsive {
		display: block;
		height: auto;
		width: 100%;
	}

	.panel {
		position: relative;
		top: -6rem;
	}

	.panel-content {
		background: #FFFFFF;
		border-radius: 10px;
		box-shadow: 0px 20px 60px 10px #EBF2FB;
		position: relative;
		z-index: 2;
		padding: 1.25rem 0 2.5rem 0;
	}

	// 修改element ui样式
	/* tab样式 */
	.panel-content /deep/ .el-tabs__nav-scroll {
		padding: 0 2.5rem;
	}

	.panel-content /deep/ .el-tabs--card>.el-tabs__header .el-tabs__item {
		margin: 1.111111rem 1.111111rem;
		border: none;
		font-family: "SourceHanSansCN-Bold";
		font-size: 1.333333rem;
		font-weight: normal;
		font-stretch: normal;
		line-height: 1.555555rpx;
		letter-spacing: -1px;
		color: #333333;
	}

	.panel-content /deep/ .el-tabs--card>.el-tabs__header .el-tabs__item:first-child {
		margin-left: 4px;
	}

	.panel-content /deep/ .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
		background: #4B94EE;
		color: #FFFFFF;
		border-radius: 6px;
		text-shadow: 0px 0px 10px rgba($color: #ffffff, $alpha: 0.75);
		box-shadow: 0px 4px 15px 4px #B4CFF5; //1.水平阴影  2.垂直阴影 3.模糊距离，改虚实 4.阴影尺寸
	}

	.panel-content /deep/ .el-tabs--card>.el-tabs__header {
		border: none;
	}

	.panel-content /deep/ .el-tabs--card>.el-tabs__header .el-tabs__nav {
		border: none;
	}

	// .panel-content /deep/ .el-tabs__content {
	// 	// padding: 20px 0;
	// }

	//  分页组件覆盖
	.panel-content /deep/ .el-pagination {
		padding: 10px 5px;
		padding-bottom: 20px;
	}

	.panel-content /deep/ .el-pager li {
		min-width: 40px;
		height: 40px;
		line-height: 40px;
	}

	.panel-content /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
		background-color: #409EFF;
		color: #FFF;
		border-radius: 50%;
		font-size: 22px;
		font-weight: normal;
		box-shadow: 0 4px 10px 6px #CAE2F9;
	}

	.panel-content /deep/ .el-pagination.is-background .el-pager li {
		color: #D5D5D5;
		font-size: 22px;
		font-weight: normal;
		margin: 0 4px;
		background: none;
	}

	.panel-content /deep/ .el-pagination .btn-next,
	.panel-content /deep/ .el-pagination .btn-prev {
		background: none;
	}

	.panel-content /deep/ .el-pagination .btn-next .el-icon,
	.panel-content /deep/ .el-pagination .btn-prev .el-icon {
		display: block;
		font-size: 34px;
		font-weight: 100;
		color: #D5D5D5;
	}

	.pagination-wrap {
		text-align: center;
	}

	.pagination {
		display: inline-flex;
		align-items: center;

		&__btn {
			border: 2px solid #D4D4D4;
			border-radius: 50px;
			font-size: 20px;
			color: #D5D5D5;
			padding: 6px 12px;
			letter-spacing: 2px;
			margin-bottom: 20px;
			;

		}
	}

	// tab content
	.tab-content {
		padding: 0 2.5rem;

		.news-content-list {
			padding: 30px 0 50px 0;
		}
	}

	.media {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin: 1.111111rem 0;
		margin-bottom: 2.222222rem;
		cursor: pointer;

		&:first-child {
			margin-top: 0;
		}

		&:last-child {
			margin-bottom: 0;
		}


		&-img {
			width: 15.555555rem;
			height: 10rem;
			border-radius: 6px;
			background: #4A92EF;
			overflow: hidden;

			.img {
				width: 100%;
				height: 100%;
			}
		}

		&-content {
			height: 10rem;
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			margin: 0 1.25rem;
			box-sizing: border-box;
			position: relative;

			&__title {
				font-size: 1.555555rem;
				font-weight: bold;
				font-stretch: normal;
				line-height: 1.555555rem;
				letter-spacing: 0px;
				color: #333333;
			}

			&__body {
				// flex: 1;
				margin: 1.055555rem 0 0 0;
				overflow: hidden;
				-webkit-box-orient: vertical;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				font-family: SourceHanSansCN-Normal;
				font-size: 1rem;
				font-weight: normal;
				font-stretch: normal;
				line-height: 1.777777rem;
				letter-spacing: 0px;
				color: #7a7a7a;
				box-sizing: border-box;
			}
		}

		.media-btn {
			// height: 17px;
			font-family: SourceHanSansCN-Normal;
			font-size: 1.222222rem;
			font-weight: normal;
			font-stretch: normal;
			line-height: 1.777777rem;
			letter-spacing: 0px;
			color: #ce1d44;
			position: absolute;
			left: 0;
			bottom: 0;
		}
	}

	.list {
		cursor: pointer;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin: 20px 0;
		height: 3.333333rem;
		margin-bottom: 2.222222rem;

		&:first-child {
			margin-top: 0;
		}

		&:last-child {
			margin-bottom: 0;
		}


		&-left {
			width: 4.375rem;
			height: 3.333333rem;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding-right: 10px;
			border-right: 1px solid #D4D4D4;

			.time-top {
				font-size: 2.666666rem;
				font-weight: normal;
				font-stretch: normal;
				line-height: 1.777777rem;
				letter-spacing: 2px;
				color: #333333;
			}

			.time-bottom {
				height: 16px;
				font-size: 1.222222rem;
				font-weight: normal;
				font-stretch: normal;
				line-height: 1.777777rem;
				letter-spacing: 0px;
				color: #333333;
			}
		}

		&-content {
			height: 3.333333rem;
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding: 0 1.25rem;
			box-sizing: border-box;

			&__title {
				// font-size: 16px;
				// color: #333333;
				height: 1rem;
				font-family: SourceHanSansCN-Normal;
				font-size: 1rem;
				font-weight: normal;
				font-stretch: normal;
				// line-height: 1.777777rem;
				letter-spacing: 0px;
				color: #333333;

			}

			&__body {
				flex: 1;
				display: flex;
				align-items: center;
				padding: 12px 0 0 0;
				overflow: hidden;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
			}

			.list-info {
				font-size: 1rem;
				line-height: 1.777777rem;
				letter-spacing: 0px;
				color: #7a7a7a;
				flex: 1;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
				/*我设置的是文字超过1行显示...；行数可以随便改；*/
				overflow: hidden;
			}
		}

		.media-btn {
			color: #CD1E44;
			font-size: 18px;
		}
	}
</style>
