<!-- 新闻详情 -->
<template>
	<div class="container">
		<el-carousel :height="bannerHeight + 'px'" :autoplay="false" arrow="never" indicator-position="none">
			<el-carousel-item v-for="(item, index) in banner" :key="index">
				<img class="img-responsive" :src="item.url">
			</el-carousel-item>
		</el-carousel>
		<div class="panel">
			<el-row type="flex" justify="center">
				<el-col :xl="16" :lg="22" :md="24" :sm="24" :xs="24">
					<div class="panel-content">
						<div class="panel-title">
							<h5>
								<!-- {{infos.title}} -->
								{{title}}
							</h5>
							<!-- <h6>COMPANY STRUCTURE</h6> -->
						</div>
						<!-- v-if="contentData.length" -->
						<div class="panel-body-wrap">
							<div class="title">
								<h1>
									{{contentData.title}}
								</h1>
								<span>发布时间: {{date}}</span>
							</div>
							<div class="img-wrap" v-html="contentData.content"></div>
							<!-- <div class="img-wrap">
								<img class="img" :src="contentData[0].clogo" @error="imgError(contentData[0].clogo)" v-show="showImg"></img>
							</div> -->
							<div class="back" @click="back">【返回列表】</div>
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
					url: require('../assets/banner5.png'),
				}],
				bannerHeight: 0,
				screenWidth: 0,
				proActiveIndex: 0,
				summary: "",
				id: 0, // 路径id
				contents: "", // 内容
				contentData: "", // 内容数据数组 
				infos: "", // 栏目信息
				showImg: true,
				title: "", // 头部新闻类型标题
				date: "", // 新闻日期
			}
		},
		methods: {
			setSize: function() {
				let screenWidth = this.$store.state.devicewidth;
				this.bannerHeight = 480 / 1920 * screenWidth;
			},
			// 图片加载出错不显示图片
			imgError(item) {
				this.showImg = false
			},
			getData(id) {
				this.getBannerImgs(); // banner数据
				this.showImg = true;
				let url = "/api/banner/content/"
				this.$axios.get(url + id).then(res => {
					console.log(res.data);
					if (res.data.code == "00") {
						// let infos = res.data.data.info;
						// this.infos = infos;
						this.contentData = res.data.data.content;
						// this.contentData = this.contents.data;
					}
				}, response => {
					console.log("error");
				});
			},
			setId() {
				this.id = this.$route.params.id
			},
			getBannerImgs() {
				let id = this.$route.params.id;
				// let imgUrl = "../assets/banner_develop.png";
				console.log(id)
				switch (id) {
					case '79':
						this.banner = [{
							url: require("../assets/banner_about.png")
						}]
						break;
					case "11":
						this.banner = [{
							url: require("../assets/banner_develop.png")
						}]
						break;
					case "50":
						this.banner = [{
							url: require("../assets/banner_science.png")
						}]
					case "51":
						this.banner = [{
							url: require("../assets/banner_science.png")
						}]
						break;
					case "55":
						this.banner = [{
							url: require("../assets/banner_service.jpg")
						}]
					case "16":
						this.banner = [{
							url: require("../assets/banner_service.jpg")
						}]
						break;
					case "18":
						this.banner = [{
							url: require('../assets/banner_welfare.png')
						}]
						break;
					case "61":
						this.banner = [{
							url: require('../assets/banner_touzi.png')
						}]
						break;
					default:
						break;
				}
				// this.banner = [{
				// 	url: require("../assets/banner_develop.png")
				// }]
			},
			back() {
				this.$router.go(-1)
			}
		},
		created() {},
		mounted() {
			// this.$store.state.topNavActive = this.$route.path; // 活跃菜单与当前路径对应
			this.setSize();
			let id = this.$route.params.id;
			let title = this.$route.params.title;
			let date = this.$route.params.date;
			console.log(this.$route.params)
			this.title = title
			this.date = date
			this.id = id;
			this.getData(id)

			// this.getBannerImgs()

		},
		beforeRouteLeave(to, from, next) {
			to.meta.keepAlive = true;
			next();
		},
		watch: {
			// 监测
			'$store.state.devicewidth': 'setSize',
			// 'id': 'getData',
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
		}

		.panel-body-wrap {
			// text-align: center;
			width: 100%;
			font-size: 1.222222rem;
			font-weight: normal;
			font-stretch: normal;
			line-height: 32px;
			letter-spacing: 0px;
			color: #333333;
			padding: 2.5rem 3.25rem;
			// text-align: center;

			p {
				text-align: left;
			}

			.title {
				// margin-bottom: 1.875rem;
				text-align: center;
				padding-bottom: 14px;
				border-bottom: 1px dashed #d2d2d2;
				margin-bottom: 3%;

				h1 {
					margin: 0;
					padding-bottom: 0.833333rem;
					font-size: 1.333333rem;
					line-height: 1.333333rem;
					font-weight: normal;
					color: #666;
				}

				span {
					margin: 0 1.111111rem;
					color: #999;
					font-size: 0.666666rem;
				}
			}

			.img-wrap {
				// overflow: hidden;
				// max-width: 100%;
				// display: flex;
				// justify-content: center;

				.img {
					width: auto;
					// max-width: 49.625rem;
					height: auto;
				}
			}

			// 			.img {
			// 				width: 48rem;
			// 				height: 36rem;
			// 			}
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

	.back {
		cursor: pointer;
		text-align: center;
		clear: both;
		padding: 4% 0 2% 0;
		border-top: 1px dashed #d2d2d2;
		margin-top: 5%;

		&:hover {
			color: #4a92ef;
		}
	}
</style>
