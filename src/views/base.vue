<!-- 科研 -->
<template>
	<div class="container">
		<el-carousel :height="bannerHeight + 'px'" :autoplay="false" arrow="never">
			<el-carousel-item v-for="(item, index) in banner" :key="index">
				<img class="img-responsive" :src="item.url">
			</el-carousel-item>
		</el-carousel>
		<div class="panel">
			<el-row type="flex" justify="center">
				<el-col :xl="18" :lg="22" :md="24" :sm="24" :xs="24">
					<div class="panel-content">
						<div class="panel-title">
							<h5>
								{{infos.title}}
							</h5>
							<h6>HUALI BASE</h6>
						</div>
						<el-carousel class="carousel" :autoplay="false" height="558px" arrow="always" indicator-position="outside">
							<el-carousel-item class="carousel-item" v-for="(item, index) in contentData" :key="index">
								<div class="carousel-item-img">
									<div class="text-container">
										<h1>{{item.title}}</h1>
										<p class="main-text elellipse" v-html="item.content"></p>
									</div>
									<img class="grid-content-img" :src="item.clogo" alt="">
								</div>
							</el-carousel-item>
						</el-carousel>
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
			carousel
		},
		data() {
			return {
				banner: [{
					url: require("../assets/banner_about.png")
				}],
				bannerHeight: 0,
				screenWidth: 0,
				contents: "", // 内容
				contentData: "", // 内容数据数组
				infos: "", // 栏目信息
			}
		},
		methods: {
			setSize: function() {
				let screenWidth = this.$store.state.devicewidth;
				this.bannerHeight = 480 / 1920 * screenWidth;
			},
			setId() {
				this.id = this.$route.params.id
			},
			getData(id) {
				let url = "/api/contentCategory/category/"
				this.$axios.get(url + id, {
					params: {
						limit: 20,
						page: 1
					}
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "00") {
						let infos = res.data.data.info;
						this.infos = infos;
						this.contents = res.data.data.contents;
						this.contentData = this.contents.data;
					}
				}, response => {
					console.log("error");
				});
			},
		},
		mounted() {
			// this.$store.state.topNavActive = this.$route.path; // 活跃菜单与当前路径对应
			this.setSize();
			console.log(this.$route);
			let id = this.$route.params.id;
			this.id = id;
			this.getData(id)
		
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
		margin: 5.625rem auto;

		.panel-content {
			padding: 0 4rem;
			padding: 0 4rem;
		}

		.img-wrap {
			text-align: center;
			width: 100%;
			margin: 4rem 0;

			.img {
				width: 48rem;
				height: 36rem;
			}

		}
	}

	.panel-title {

		// font-size: 36px;
		h5 {
			height: 1.944444rem;
			font-family: SourceHanSansCN-Bold;
			font-size: 2rem;
			line-height: 1;
			letter-spacing: 0px;
			color: #333333;
		}
		
		h6 {
			font-family: SourceHanSansCN-Bold;
			height: 1.166666rem;
			font-size: 1.555555rem;
			line-height: 1;
			letter-spacing: -1px;
			color: #333333;
			margin-top: 0.666666rem;
		}
	}

	.carousel {
		margin: 20px 0;
	}

	.carousel /deep/ .el-carousel__arrow--left {
		left: 80px;
	}

	.carousel /deep/ .el-carousel__arrow--right {
		right: 80px;
	}

	.carousel /deep/ .el-carousel__arrow {
		background-color: transparent;
		color: #4993EF;
		font-size: 50px;
	}

	.carousel /deep/ .el-carousel__item {
		overflow: visible;
	}

	/* 覆盖ele-ui默认样式 指示器样式 */
	.carousel /deep/ .el-carousel__button {
		width: 10px;
		height: 10px;
		border: 1px solid #000000;
		border-radius: 50%;
		background-color: transparent;
		opacity: 1;
	}

	.carousel /deep/ .el-carousel__indicator.is-active button {
		opacity: 1;
		background: #000;
		border: 1px solid #000;
	}

	.carousel /deep/ .el-carousel__indicators--outside {
		margin-top: 1rem;
	}

	.carousel-item {

		&-img {
			width: 71.0625rem;
			height: 34.375rem;
			background-color: #000000;
		}

		// padding: 0 60px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		margin: 0 auto;
		box-sizing: border-box;
	}

	.panel-content /deep/ .el-carousel__arrow--left {
		color: #4b91ef;
		background: transparent;
		left: 0px;
	}

	.panel-content /deep/ .el-carousel__arrow--right {
		color: #4b91ef;
		background: transparent;
		right: 0px;
	}

	.panel-content /deep/ .el-carousel__arrow {
		// background-color: #4b91ef;
		font-size: 50px
	}

	.indicator-panel {
		margin: 4.3125rem 0 3.6875rem 0;
		background: #FFFFFF;

	}

	.indicator-item {
		// max-width: 16.875rem;
		// max-height: 23.75rem;
		display: flex;
		flex-direction: column;
		align-items: center;

		&__img {
			width: 270px;
			height: 380px;
			background-color: #ffffff;
			box-shadow: 0px 0px 80px 0px rgba(89, 89, 89, 0.1);
			border-radius: 8px;

		}

		p {
			// width: 333px;
			height: 1.5rem;
			font-family: SourceHanSansCN-Regular;
			font-size: 24px;
			font-weight: normal;
			font-stretch: normal;
			line-height: 32px;
			letter-spacing: 0px;
			color: #333333;
			margin: 2.125rem 0;
		}
	}

	.video {
		width: 100%;
		height: 100%;
		background: #CCCCCC;
	}

	.carousel-item-img {
		background: #FAFAFA;
		position: relative;
		overflow: hidden;
		margin: o auto;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		.grid-content-img {
			height: 100%;
			width: 50%;
			z-index: 1;
		}

		.text-container {
			width: 100%;
			max-width: 43.75rem;
			height: 100%;
			background: #4c91ef;
			padding: 2.8125rem 6.25rem;
			color: #fff;
			font-size: 20px;
			box-sizing: border-box;
			border-top-left-radius: 4px;
			border-bottom-left-radius: 4px;

			h1 {
				// width: 131px;
				height: 21px;
				font-size: 22px;
				letter-spacing: 0px;
				color: #ffffff;
			}


			.main-text {
				font-size: 18px !important;
				line-height: 28px;
				letter-spacing: 0px;
				color: #ffffff !important;
				background: transparent !important;
				margin-top: 1.25rem;
			}

			.operation-btn {
				margin-top: 70px;
				position: relative;
				width: auto;
				display: inline-block;
				z-index: 1;
				font-size: 1.375rem;

				&:after {
					content: " ";
					position: absolute;
					bottom: 2px;
					left: 0;
					z-index: -1;
					height: 6px;
					width: 96%;
					background: #CD1E46;
				}
			}
		}
	}
</style>
