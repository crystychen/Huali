<!-- 定期报告 -->
<template>
	<div class="container">
		<el-carousel :height="bannerHeight + 'px'" :autoplay="false" arrow="never" indicator-position="none">
			<el-carousel-item v-for="(item, index) in banner" :key="index">
				<img class="img-responsive" :src="item.url">
			</el-carousel-item>
		</el-carousel>
		<div class="panel">
			<el-row type="flex" justify="start">
				<el-col :xl="18" :lg="22" :md="24" :sm="24" :xs="24" :offset="3">
					<div class="panel-content">
						<div class="panel-title">
							<h5>
								定期报告
							</h5>
							<h6>PERIODIC REPORTS</h6>
						</div>
						<div class="panel-body">
							<div class="list">
								<div class="list-item ">
									2017年第三季度报告
								</div>
								<div class="list-item active">
									2017年半年度报告
								</div>
								<div class="list-item ">
									2017年半年度报告
								</div>
								<div class="list-item ">
									2016年年度报告
								</div>
							</div>
						</div>
					</div>
					<div class="pagination-wrap" style="">
						<div class="pagination">
							<div class="pagination__btn" @click="clickOne">首页</div>
							<el-pagination class="" :current-page.sync="currentPage" @current-change="pageChange" background layout="prev, pager, next"
							 :page-size="pageSize" :total="total">
							</el-pagination>
							<div class="pagination__btn" @click="clickLast">末页</div>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import carousel from '@/components/carousel.vue';

	export default {
		name: 'Home',
		components: {
			carousel,
			// left: left
		},
		data() {
			return {
				msg: 'Welcome to Your Vue.js App',
				banner: [{
					url: require('../assets/banner2.png'),
				}],
				bannerHeight: 0,
				screenWidth: 0,
				banner3: [{
						url: require('../assets/banner1.png'),
					},
					{
						url: require('../assets/banner2.png'),

					},
					{
						url: require('../assets/banner3.png'),

					}
				],
				proActiveIndex: 0,
				total: 50,
				pageSize: 5,
				currentPage: 1,
			}
		},
		methods: {
			setSize: function() {
				let screenWidth = this.$store.state.devicewidth;
				this.bannerHeight = 480 / 1920 * screenWidth;
			},
			mouseoverImg(e) {
				console.log(e)
				this.navImgs[e].url = require('../assets/banner2.png');
				console.log(this.originImgs[e]);

			},
			mouseoutImg(e) {
				console.log(e)
				console.log(this.originImgs[e]);
				this.navImgs[e] = this.originImgs[e];
			},
			//  产品中心切换swiper
			changeProSwiper(e) {
				console.log("啊哈发货方")
				console.log(e)
				this.$refs.procarousel.setActiveItem(e)
			},
			proChange(e) {
				console.log(e)
				this.proActiveIndex = e
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
		},
		mounted() {
			this.$store.state.topNavActive = this.$route.path; // 活跃菜单与当前路径对应
			this.setSize();
			
		},
		watch: {
			// 监测store.state
			'$store.state.devicewidth': 'setSize'
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
		margin: 5.625rem auto;

		.panel-content {
			padding: 0 4rem;
			padding: 0 4rem;
		}

	}

	.panel-title {

		// font-size: 36px;
		h5 {
			height: 1.944444rem;
			font-family: SourceHanSansCN-Bold;
			font-size: 2rem;
			font-stretch: normal;
			line-height: 1.555555rem;
			letter-spacing: 0px;
			color: #333333;
		}
		
		h6 {
			font-family: SourceHanSansCN-Bold;
			height: 1.166666rem;
			font-size: 1.555555rem;
			font-weight: normal;
			font-stretch: normal;
			line-height: 1.555555rem;
			letter-spacing: -1px;
			color: #333333;
			margin-top: 0.666666rem;
		}
	}

	.panel-body {
		font-size: 22px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 32px;
		letter-spacing: 0px;
		color: #333333;
		padding: 3.75rem 0;

	}

	.list-item {
		height: 3.625rem;
		line-height: 3.625rem;
		background-color: #ffffff;
		border-radius: 8px;
		padding: 0 3.0625rem;
		font-size: 1.125rem;
		box-sizing: border-box;
		position: relative;
		overflow: hidden;

		// .active
		&:hover {
			background-color: #ffffff;
			box-shadow: 0px 10px 38px 2px rgba(7, 93, 222, 0.05);
			border-radius: 8px;
			z-index: 1;

			&::before {
				content: " ";
				height: 100%;
				position: absolute;
				left: 0;
				width: 10px;
				background-color: #4b91ef;
				z-index: 1;
			}
		}
	}

	//  分页组件覆盖
	.pagination /deep/ .el-pagination {
		padding: 10px 5px;
		padding-bottom: 20px;
	}

	.pagination /deep/ .el-pager li {
		min-width: 40px;
		height: 40px;
		line-height: 40px;
	}

	.pagination /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
		background-color: #409EFF;
		color: #FFF;
		border-radius: 50%;
		font-size: 22px;
		font-weight: normal;
		box-shadow: 0 4px 10px 6px #CAE2F9;
	}

	.pagination /deep/ .el-pagination.is-background .el-pager li {
		color: #D5D5D5;
		font-size: 22px;
		font-weight: normal;
		margin: 0 4px;
		background: none;
	}

	.pagination /deep/ .el-pagination .btn-next,
	.pagination /deep/ .el-pagination .btn-prev {
		background: none;
	}

	.pagination /deep/ .el-pagination .btn-next .el-icon,
	.pagination /deep/ .el-pagination .btn-prev .el-icon {
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
</style>
