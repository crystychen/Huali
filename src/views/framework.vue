<!-- 科研 -->
<template>
	<div class="container frame-container">
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
								{{infos.title}}
							</h5>
							<!-- <h6>COMPANY STRUCTURE</h6> -->
						</div>
						<div class="panel-body-wrap" v-if="contentData.length">
							<div class="title" v-html="contentData[0].content"></div>
							<div class="img-wrap">
								<img class="img" :src="contentData[0].clogo" @error="imgError(contentData[0].clogo)" v-show="showImg"></img>
							</div>
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
					url: require("../assets/banner_develop.png")
				}],
				bannerHeight: 0,
				screenWidth: 0,
				proActiveIndex: 0,
				summary: "",
				id: 0, // 路径id
				contents: "", // 内容
				contentData: "", // 内容数据数组 
				infos: "", // 栏目信息
				showImg: true
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
				let url = "/api/contentCategory/category/"
				this.$axios.get(url + id, {
					params: {
						limit: 15,
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
			}
		},
		created() {},
		mounted() {
			// this.$store.state.topNavActive = this.$route.path; // 活跃菜单与当前路径对应
			this.setSize();
			let id = this.$route.params.id;
			this.id = id;
			this.getData(id)

			// this.getBannerImgs()
		},
		watch: {
			// 监测
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
		}

		.panel-body-wrap {
			// text-align: center;
			width: 100%;
			font-size: 1.222222rem;
			font-weight: normal;
			font-stretch: normal;
			line-height: 1.777777rem;
			letter-spacing: 0px;
			color: #333333;
			padding: 2.5rem 3.25rem;

			p {
				text-align: left;
			}

			.title {
				margin-bottom: 1.875rem;
			}

			.img-wrap {
				overflow: hidden;
				max-width: 100%;
				display: flex;
				justify-content: center;

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
			line-height: 1.555555rem;
			letter-spacing: 0px;
			color: #333333;
		}
		
		h6 {
			font-family: SourceHanSansCN-Bold;
			height: 1.166666rem;
			font-size: 1.555555rem;
			// font-weight: normal;
			// font-stretch: normal;
			line-height: 1.555555rem;
			letter-spacing: -1px;
			color: #333333;
			margin-top: 0.666666rem;
		}
	}
</style>
