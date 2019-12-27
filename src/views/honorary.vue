<!-- 科研 -->
<template>
	<div class="container">
		<el-carousel :height="bannerHeight + 'px'" :autoplay="false" arrow="never" indicator-position="none">
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
								{{infos.title}}
							</h5>
							<!-- <h6>HONORARY QUALIFICATIONS</h6> -->
						</div>
						<el-carousel class="carousel" :autoplay="false" type="card" height="520px" arrow="always" indicator-position="none">
							<template v-for="(child, index) in contentsData" v-if="index < 3">
								<el-carousel-item class="carousel-item">
									<div class="carousel-item-img">
										<img class="" :src="child.clogo"></img>
									</div>
									<h3 class="medium">{{ child.title }}</h3>
								</el-carousel-item>
							</template>
						</el-carousel>
					</div>
				</el-col>
			</el-row>
			<el-row type="flex" justify="center" class="indicator-panel">
				<el-col :xl="18" :lg="22" :md="24" :sm="24" :xs="24">
					<el-row type="flex" justify="center" class="indicator-row">
						<template v-for="(child, index) in contentsData" v-if="index > 2">
							<el-col class="indicator-item" :xl="8" :lg="8" :md="8" :sm="8" :xs="8">
								<img class="indicator-item__img" :src="child.clogo"></img>
								<p>{{child.title}}</p>
							</el-col>
						</template>
						<!-- <el-col class="indicator-item" :xl="8" :lg="8" :md="8" :sm="8" :xs="8">
							<img class="indicator-item__img" src="/static/imgs/erji.jpg"></img>
							<p>国家教育部科学技术进步二等奖</p>
						</el-col>
						<el-col class="indicator-item" :xl="8" :lg="8" :md="8" :sm="8" :xs="8">
							<img class="indicator-item__img" src="../../static/imgs/country.jpg"></img>
							<p>知识产权管理体系认证证书</p>
						</el-col> -->
					</el-row>
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
				carouselData: [{
						img: "/static/imgs/pic23.jpg"
					},
					{
						img: "/static/imgs/pic33.jpg"

					},
					{
						img: "/static/imgs/pic35.jpg"
					}
				],
				proActiveIndex: 0,
				contents: "",
				infos: "",
				verticalData: "",
				contentsData: ""
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
				this.$refs.procarousel.setActiveItem(e)
			},
			proChange(e) {
				console.log(e)
				this.proActiveIndex = e
			},
			// 初始化页面数据
			getData(id) {
				let url = '/api/contentCategory/category/';
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
						let contents = res.data.data.contents;
						this.contents = contents;
						this.contentsData = contents.data;

						// this.dealWithDatas(contents)
						// this.summary = content.summary
					}
				}, response => {
					console.log("error");
				});
			}, // 跟着当前路径id改变
			setId() {
				this.id = this.$route.params.id
			},
			dealWithDatas(contents) {
				let carouselData = contents.data.filter((element) => { // 横版图片
					return element.layout == 1
				})
				this.carouselData = carouselData;
				// console.log("carousel", carouselData)
				let verticalData = contents.data.filter((element) => { // 横版图片
					return element.layout == 2
				})
				// console.log("verticalData", verticalData) 
				this.verticalData = verticalData;
			}
		},
		mounted() {
			// this.$store.state.topNavActive = this.$route.path; // 活跃菜单与当前路径对应
			this.setSize();
			let id = this.$route.params.id;
			this.id = id;
			console.log("frame", id)
			this.getData(id)

			$webfont.load(".container", "ac637fb5c0d94ae1aae2a2869480adf7", "SiYuanRegular");
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
			// font-family: SourceHanSansCN-Bold;
			font-size: 2rem;
			line-height: 1.555555rem;
			letter-spacing: 0px;
			color: #333333;
		}
		
		h6 {
			// font-family: SourceHanSansCN-Bold;
			height: 1.166666rem;
			font-size: 1.555555rem;
			line-height: 1.555555rem;
			letter-spacing: -1px;
			color: #333333;
			margin-top: 0.666666rem;
		}
	}

	.el-carousel__item .medium {
		width: 192px;
		height: 24px;
		// font-family: SourceHanSansCN-Regular;
		font-size: 1.333333rem;
		font-weight: normal;
		line-height: 1.777777rem;
		letter-spacing: 0px;
		color: #333333;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: -20px;
		text-align: center;
		z-index: 9999;
	}

	.carousel {
		margin: 6.25rem 0 4.125rem 0;
	}

	.carousel-item.is-active {
		padding: 5rem;

		.medium {
			bottom: 1.444444rem;
		}
	}

	.carousel-item {
		overflow: hidden;
		padding: 4rem;

		// width: 618px;
		// height: 400px;
		&-img {
			width: 100%;
			height: 100%;
			background-color: #a1a1a1;
			box-shadow: 0px 20px 36px 4px rgba(7, 93, 222, 0.2);
			border-radius: 8px;
			border: solid 10px #f5f5f5;
			overflow: hidden;

			img {
				width: 100%;
				height: 100%;
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

	.indicator-panel {
		margin: 4.3125rem 0 3.6875rem 0;
		background: #FFFFFF;

		.indicator-row {
			flex-wrap: wrap;

		}
	}

	.indicator-item {
		// max-width: 16.875rem;
		// max-height: 23.75rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 1.875rem 0;

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
			// font-family: SourceHanSansCN-Regular;
			font-size: 1.333333rem;
			font-weight: normal;
			line-height: 1.777777rem;
			letter-spacing: 0px;
			color: #333333;
			margin: 2.125rem 0;
		}
	}
</style>
