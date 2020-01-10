<!-- 公司概况 -->
<template>
	<div class="container">
		<!-- <carousel :banner="banner" :bannerHeight="bannerHeight"></carousel> -->
		<el-carousel :height="bannerHeight + 'px'" :autoplay="false" arrow="never">
			<el-carousel-item v-for="(item, index) in banner" :key="index">
				<img class="img-responsive" :src="item.url">
			</el-carousel-item>
		</el-carousel>
		<!-- <div class="content" v-html="content.summary"></div> -->
		<div class="panel">
			<el-row type="flex" justify="center">
				<!-- <el-col :xl="16" :lg="22" :md="24" :sm="24" :xs="24"> -->
				<div class="items headquarters">
					<img class="bcg-img" :src="infos.clogo"></img>
					<!-- 东莞总部基地 -->
					<p class="items-title"></p>
					<div class="item-content">
						<div class="item-content-bcg"></div>
						<div class="text-top">{{infos.title}}</div>
						<p class="text-bottom">CORPORATEOVERVIEWS</p>
					</div>
				</div>
				<!-- </el-col> -->
			</el-row>
			<el-row type="flex" justify="center">
				<el-col :xl="16" :lg="22" :md="24" :sm="24" :xs="24" class="wrap">
					<div class="text-content">
						<p class="" v-html="infos.summary"></p>
					</div>
				</el-col>
			</el-row>
			<el-row type="flex" justify="center" v-if="contentData.length">
				<el-col :xl="16" :lg="22" :md="24" :sm="24" :xs="24" class="wrap">
					<el-row type="flex" justify="center">
						<!-- <el-col :xl="6" :lg="6" :md="6" :sm="24" :xs="24"> -->
							<div class="item ">
								<div class="item-img">
									<img :src="contentData[0].clogo"></img>
								</div>
								<p class="item-title">{{contentData[0].title}}</p>
							</div>
						<!-- </el-col> -->
						<!-- <el-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24"> -->
							<div class="item">
								<div class="item-img item-big-img">
									<img :src="contentData[1].clogo"></img>
								</div>
								<p class="item-title">{{contentData[1].title}}</p>
							</div>
						<!-- </el-col> -->
						<!-- <el-col :xl="6" :lg="6" :md="6" :sm="24" :xs="24"> -->
							<div class="item ">
								<div class="item-img">
									<img :src="contentData[2].clogo"></img>
								</div>
								<p class="item-title">{{contentData[2].title}}</p>
							</div>
						<!-- </el-col> -->
					</el-row>
				</el-col>
			</el-row>
			<el-row type="flex" justify="center" v-if="contentData.length >= 4">
				<el-col :xl="16" :lg="22" :md="24" :sm="24" :xs="24" class="wrap">
					<div class="text-content">
						<p class="" v-html="contentData[3].content"></p>
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
			getData(id) {
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
			}

		},
		mounted() {
			// this.$store.state.topNavActive = this.$route.path; // 活跃菜单与当前路径对应
			this.setSize();
			let id = this.$route.params.id;
			this.id = id;
			this.getData(id);
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
		font-size: 1.375rem;
	}

	/* 图片自适应容器 */
	.img-responsive {
		display: block;
		height: auto;
		width: 100%;
	}

	.panel {
		position: relative;
		top: -13.375rem;

		.text-content {
			padding: 2.222222rem 2.777777rem;


			&>p {

				font-size: 22px !important;

			}

			// 			li {
			// 				text-indent: 30px;
			// 				display: block;
			// 				position: relative;
			// 				margin: 1.25rem 0;
			// 
			// 				p::before {
			// 					content: "";
			// 					position: absolute;
			// 					left: 10px;
			// 					// color: red;
			// 					top: 16px;
			// 					width: 6px;
			// 					height: 6px;
			// 					border-radius: 50%;
			// 					background: #CD1E42;
			// 					transform: translateY(-50%);
			// 				}
			// 			}
		}
	}

	.items.headquarters {
		// background-image: url(../assets/banner2.png);
		width: 63.222222rem;
		height: 19.444444rem;
	}
	.wrap {
		max-width: 63.222222rem;
	}
	.items {
		position: relative;
		z-index: 2;
		box-sizing: border-box;
		max-height: 21.875rem;
		overflow: hidden;

		.bcg-img {
			width: 100%;
			height: 100%;
			position: absolute;
			z-index: -1;
		}

		.items-title {
			color: #FFFFFF;
			position: absolute;
			left: 16px;
			bottom: 10px;
		}

		.item-content {
			padding: 3.333333rem 2.777777rem;
			width: 19.444444rem;
			height: 19.444444rem;
			box-sizing: border-box;
			color: #FFFFFF;
			display: inline-block;
			float: right;
			position: relative;

			.item-content-bcg {
				position: absolute;
				top: 0;
				right: 0;
				background-color: #4b91ef;
				opacity: 0.7;
				width: 100%;
				height: 100%;
				z-index: -1;
			}

			.text-top {
				font-weight: bold;
				font-family: SourceHanSansCN-Bold;
				font-size: 2rem;
				// font-weight: normal;
				font-stretch: normal;
				line-height: 1.555555rem;
				letter-spacing: 0px;
				color: #ffffff;
				margin-bottom: 0.666666rem;
			}

			.text-bottom {
				// font-size: 1.555555rem;
				// font-weight: bold;
				// width: 10rem;
				box-sizing: border-box;
				word-wrap: break-word;
				width: 10rem;
				height: 2.722222rem;
				font-family: SourceHanSansCN-Bold;
				font-size: 1.555555rem;
				font-weight: bold;
				font-stretch: normal;
				line-height: 1.555555rem;
				letter-spacing: -1px;
				color: #ffffff
			}
		}
	}

	.item {
		position: relative;

		.item-img {
			// height: 22rem;
			background: #CCCCCC;
			margin-right: 0.555555rem;
			width: 15.777777rem;
			height: 15.777777rem;

			img {
				width: 100%;
				height: 100%;
			}

			// border-right: 10px solid #FFFFFF;
			&:last-child {
				margin: 0;
			}
		}
		
		.item-big-img {
			// flex: 1;
			// min-width: 34.375rem;
			width: 30.555555rem;
		}

		.item-title {
			position: absolute;
			left: 16px;
			bottom: 10px;
			color: #FFFFFF;
		}
	}
</style>
