<!-- 新闻资讯 -->
<template>
	<div class="container">
		<!-- <el-carousel :height="bannerHeight + 'px'" :autoplay="false" arrow="never">
			<el-carousel-item v-for="(item, index) in banner" :key="index">
				<img class="img-responsive" :src="item.url">
			</el-carousel-item>
		</el-carousel> -->
		<carousel :banner="banner" :bannerHeight="bannerHeight"></carousel>
		<div class="panel">
			<el-row type="flex" justify="center">
				<el-col :xl="18" :lg="20" :md="24" :sm="24" :xs="24" :offset="3">
					<div class="panel-content">
						<el-tabs class="" v-model="activeFirstName" type="card" @tab-click="handleFirstTabClick">
							<el-tab-pane :label="tab.title" :name="String(tab.id)" v-for="(tab, index) in pinfos.children" :key="index">
								<div class="tab-content">
									<div class="describe">
										<div class="describe-title">
											{{tab.title}}
										</div>
										<div class="describe-content">
											<p v-html="tab.summary">
												<!-- {{tab.summary}} -->
											</p>
										</div>
									</div>
									<!-- :activeName="subTabs.length?String(subTabs[0].id):'0'" -->
									<custom-tab :contentData="subContentData" :tabData="subTabs" @bindMore="viewMore"></custom-tab>
								</div>
								<!-- <card-content :data="contentData" @bindMore="viewMore"></card-content> -->
							</el-tab-pane>
							<!-- <el-tab-pane label="异型线材系列" name="YX">
								<div class="tab-content">
									<div class="describe">
										<div class="describe-title">
											异型线材系列
										</div>
										<div class="describe-content">
											<p>
												异型线材的种类有很多
											</p>
										</div>
									</div>
									<custom-tab :contentData="contentData" @bindMore="viewMore"></custom-tab>
								</div>
							</el-tab-pane>
							<el-tab-pane label="装饰面材系列" name="ZS">
								<div class="tab-content">
									<div class="describe">
										<div class="describe-title">
											装饰面材系列
										</div>
										<div class="describe-content">
											<p>
												装饰面材的种类有很多
											</p>
										</div>
									</div>
									<custom-tab :contentData="contentData" @bindMore="viewMore"></custom-tab>
								</div>
							</el-tab-pane> -->
						</el-tabs>
						<!-- 						<div class="pagination-wrap" style="">
							<div class="pagination">
								<div class="pagination__btn" @click="clickOne">首页</div>
								<el-pagination class="" :current-page.sync="currentPage" @current-change="pageChange" background layout="prev, pager, next"
								 :page-size="pageSize" :total="total">
								</el-pagination>
								<div class="pagination__btn" @click="clickLast">末页</div>
							</div>
						</div> -->
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import carousel from '@/components/carousel.vue';
	import cardContent from '@/components/cardContent.vue';
	import customTab from '@/components/tabs.vue';
	export default {
		name: 'culture',
		components: {
			carousel,
			cardContent,
			customTab
		},
		data() {
			return {
				msg: 'Welcome to Your Vue.js App',
				banner: [{
						cimg: require('../assets/banner13.png')
					},
					{
						cimg: require('../assets/banner14.jpg')

					},
					{
						cimg: require('../assets/banner15.jpg')

					},
					{
						cimg: require('../assets/banner16.jpg')

					},
					{
						cimg: require('../assets/banner17.jpg')

					},
					{
						cimg: require('../assets/banner18.jpg')

					},
					{
						cimg: require('../assets/banner19.jpg')

					},
					{
						cimg: require('../assets/banner20.jpg')

					}
				],
				originImgs: [],
				bannerHeight: 0,
				screenWidth: 0,
				proActiveIndex: 0,
				total: 50,
				pageSize: 3,
				currentPage: 1,
				subContentData: {},
				subTabs: [], // 子Tab
				activeName: 'ABS',
				activeFirstName: "FB",
				id: 0, // 路径id
				infos: "",
				contents: "",
				pinfos: "",
				pcontents: ""
			}
		},
		methods: {
			setSize: function() {
				let screenWidth = this.$store.state.devicewidth;
				this.bannerHeight = 480 / 1920 * screenWidth;
			},
			// tab切换
			handleFirstTabClick(tab) {
				console.log(tab);
				let name = tab.name;
				// 分页器重置
				this.currentPage = 1;
				// 数据重置并请求
				this.getSubContent(name);
				this.$store.state.activeProsId = String(name);

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
						this.subContentData = res.data.data.contents;
						if (!infos.children.length) {
							this.subTabs = []
							return;
						}
						this.subTabs = infos.children; // tab数组 [ info.children]
						// this.infos = infos;
						// this.contents = res.data.data.contents;
						// this.activeFirstName = String(infos.id);
						// 通过父元素查询子节点
						// this.summary = content.summary
						// this.getParentData(infos.pid)
					}
				}, response => {
					console.log("error");
				});
			},
			// 分页
			pageChange(e) {
				console.log(e)
			},
			clickOne() {
				this.currentPage = 1
			},
			clickLast() {
				this.currentPage = Math.floor(this.total / this.pageSize)
			},
			// 更多详情
			viewMore(e) {
				console.log("product", e)
			},
			// 初始化页面数据
			getData(id) {
				let url = '/api/contentCategory/category/';
				this.$axios.get(url + id, {
					params: {
						limit: 3,
						page: 1
					}
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "00") {
						let infos = res.data.data.info;
						this.infos = infos;
						this.contents = res.data.data.contents;
						this.activeFirstName = String(infos.id);
						console.log("actiFirst", this.activeFirstName)
						this.$store.state.activeProsId = String(infos.id);
						// 通过父元素查询子节点
						this.getParentData(infos.pid);
						// 查询子节点
						this.getSubContent(infos.id);
					}
				}, response => {
					console.log("error");
				});
			},
			getParentData(id) {
				let url = '/api/contentCategory/category/';
				this.$axios.get(url + id, {
					params: {
						limit: 3,
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
			// 跟着当前路径id改变
			setId() {
				this.id = this.$route.params.id
			},
			getBannerData() {
				this.$axios.get('/api/banner/list/2/1').then(res => {
					console.log(res.data);
					if (res.data.code == "00") {
						this.banner = res.data.data;
					}
				}, response => {
					console.log("error");
				});
			},
		},
		mounted() {
			// this.$store.state.topNavActive = this.$route.path; // 活跃菜单与当前路径对应
			this.setSize();
			let id = this.$route.params.id;
			this.id = id;
			console.log("frame", id)
			this.getData(id);
			
			this.getBannerData(); // 顶部banner

		},
		created() {
			console.log(this.$route.params);
			this.activeFirstName = this.$route.params.type || 'FB'
			console.log("this.afaw", this.activeFirstName)
		},
		watch: {
			// 监测store.state
			'$store.state.devicewidth': 'setSize',
			'id': 'getData',
			"$route.params.id": "setId"
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
		margin-top: 1.875rem;
	}

	.panel-content {
		// background: #FFFFFF;
		// border-radius: 10px;
		// box-shadow: 0px 20px 60px 10px #EBF2FB;
		position: relative;
		// z-index: 2;
		padding: 0 0 2.5rem 0;
	}

	// 修改element ui样式
	/* tab样式 */
	.panel-content /deep/ .el-tabs .el-tabs__nav-scroll {
		padding-left: 10px;
		background: transparent;

	}

	.panel-content /deep/ .el-tabs--card>.el-tabs__header .el-tabs__item {
		margin: 1.111111rem 1.111111rem;
		border: none;
		font-weight: normal;
		font-family: "SourceHanSansCN-Bold";
		font-size: 1.555555rem;
		width: 23.75rem;
		height: 6.25rem;
		line-height: 6.25rem;
		box-sizing: border-box;
		text-align: center;
		text-shadow: 0px 1px 1px #FFFFFF;
	}

	.panel-content /deep/ .el-tabs--card>.el-tabs__header .el-tabs__item:first-child {
		margin-left: 0;
	}

	.panel-content /deep/ .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
		font-family: "SourceHanSansCN-Bold";
		background: #4B94EE;
		color: #FFFFFF;
		border-radius: 6px;
		text-shadow: 0px 0px 10px rgba($color: #ffffff, $alpha: 0.75);
		box-shadow: 0px 4px 15px 4px #B4CFF5; //1.水平阴影  2.垂直阴影 3.模糊距离，改虚实 4.阴影尺寸
	}

	.panel-content /deep/ .el-tabs--card>.el-tabs__header {
		border: none;
		background: transparent;
	}

	.panel-content /deep/ .el-tabs--card>.el-tabs__header .el-tabs__nav {
		border: none;
	}

	.panel-content /deep/ .el-tabs__content {
		// padding: 20px 0;
		overflow: visible;
	}

	.panel-content /deep/ .el-tabs__nav-next,
	.panel-content /deep/ .el-tabs__nav-prev {
		line-height: 80px;
	}

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
		// margin: 2.5rem 0;
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

	.tab-content {

		// padding: 1.875rem;
		.content-list {
			margin: 30px 0 50px 0;
			box-sizing: border-box;
		}
	}

	.describe {
		margin: 20px 0;

		.describe-title {
			font-size: 2.25rem;
			font-weight: bold;

		}

		.describe-content {
			padding: 1.875rem 2.5rem;
			font-size: 1.125rem;
			min-width: 58.75rem;

		}
	}

	.card-container {
		margin: 20px;

		&:first-child {
			margin-left: 0;
		}

		&:last-child {
			margin-right: 0;
		}
	}

	.card {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		background: #FFFFFF;
		border-radius: 4px;
		box-shadow: -6px 0px 20px 10px #F9F9F9, //左边阴影
			0 -20px 60px 10px #F7F7F7, //顶部阴影
			0 20px 60px 10px #F7F7F7, //底部阴影
			6px 0px 20px 10px #F9F9F9; //右边阴影
		padding: 30px;
		// width: 100%;

		// 		&:first-child {
		// 			margin-top: 0;
		// 		}
		// 
		// 		&:last-child {
		// 			margin-bottom: 0;
		// 		}


		&-img {
			width: 14.375rem;
			height: 14.375rem;
			border-radius: 6px;
			background: #4A92EF;
		}

		&-content {
			height: 11.25rem;
			flex: 1;
			text-align: center;
			padding: 0 1.25rem;

			&__title {
				font-weight: bold;
				font-size: 18px;
			}

			&__body {
				flex: 1;
				padding: 12px 0 20px 0;
				color: #797979;
				line-height: 1.8;
			}
		}

		.card-btn {
			color: #CD1E44;
			font-size: 18px;
		}
	}
</style>
