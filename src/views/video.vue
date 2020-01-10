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
				<el-col :xl="19" :lg="22" :md="24" :sm="24" :xs="24">
					<div class="panel-content">
						<div class="panel-title">
							<h5>
								{{content.title}}
							</h5>
							<!-- <h6>HUALI VIDEO</h6> -->
						</div>
						<el-carousel class="carousel" :autoplay="false" height="640px" arrow="always" indicator-position="none">
							<el-carousel-item class="carousel-item" v-for="item in 1" :key="item">
								<a class="" target="_blank" href="https://v.qq.com/iframe/player.html?vid=s0524n95f89&tiny=0&auto=0">
									<div class="carousel-item-img">
										<!-- 			<video id="video" class="video" poster="img/preview.jpg">
										当前浏览器不支持 video直接播放，点击这里下载视频： -->

										<img class="video" src="http://www.dghuafuli.com/uploadfiles/image/pic30.jpg"></img>
										<!-- </video> -->
									</div>
								</a>
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
			carousel,
			// left: left
		},
		data() {
			return {
				msg: 'Welcome to Your Vue.js App',
				banner: [{
					url: require("../assets/banner_about.png")
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
				id: 0, // 路径id
				content: "",
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
			getData(id) {
				let url = "/api/contentCategory/category/"
				this.$axios.get(url + id, {
					params: {
						limit: 3,
						page: 1
					}
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "00") {
						let content = res.data.data.info;
						this.content = content;
						// this.summary = content.summary
					}
				}, response => {
					console.log("error");
				});
			},
			setId() {
				this.id = this.$route.params.id
			}
		},
		mounted() {
			// this.$store.state.topNavActive = this.$route.path; // 活跃菜单与当前路径对应
			this.setSize();
			let id = this.$route.params.id;
			this.id = id;
			console.log("frame", id)
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
		margin: 6.25rem 0 4.125rem 0;
	}

	.carousel-item {
		overflow: hidden;

		// width: 618px;
		// height: 400px;
		&-img {
			// width: 71.0625rem;
			width: 71.0625rem;
			height: 40rem;
			// width: 100%;
			position: relative;

			&::before {
				content: '';
				background: rgba(0, 0, 0, 0.5);
				z-index: 2;
				position: absolute;
				width: 100%;
				height: 100%;
				left: 0;
				top: 0;
			}

			&::after {
				background: url(../../static/imgs/larkcloud_play.png) no-repeat center;
				content: '';
				z-index: 3;
				position: absolute;
				width: 100%;
				height: 100%;
				left: 0;
				top: 0;
			}

		}

		// padding: 0 60px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		margin: o auto;
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

	.panel-content /deep/  .el-carousel__container {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
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
		position: relative;
		z-index: 0;
		// background: #CCCCCC
	}
</style>
