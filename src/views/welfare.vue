<!-- 福利机制 -->
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
								{{infos.title}}
							</h5>
							<h6>WELFARE MECHANISMS</h6>
						</div>
						<div class="panel-body" v-if="contentData.length">
							<!-- 							<div class="infos-title">
								{{contentData[0].title}}
							</div> -->
							<div class="infos-content">
								<p v-html="contentData[0].content"></p>
								<!-- 			<li><span class="num">1 . </span>薪资结构：基本工资+伙食补贴+职业规范奖+高温补贴+计件工资+其它</li>
								<li><span class="num">2 . </span>工资算法：基本工资1510元/月+伙食补贴280元/月+职业规范奖100-500元/月+高温补贴150元/月（每年6-
									10月）+计件工资100-170元/天+其它</li> -->
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
					url: require('../assets/banner_welfare.png'),
				}],
				bannerHeight: 0,
				screenWidth: 0,
				id: 0,
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
						limit: 50,
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

	.panel-body {
		font-size: 22px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 32px;
		letter-spacing: 0px;
		color: #333333;
		padding: 2.5rem 3.25rem;
	}

	.infos-title {
		height: 24px;
		font-size: 24px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 28px;
		letter-spacing: -1px;
		color: #333333;
		text-align: center;
	}

	.infos-content {
		max-width: 72.1875rem;
		font-size: 1.222222rem;
		font-weight: normal;
		letter-spacing: 0px;
		color: #333333;

		.num {
			color: #ce1d44;
		}
	}
</style>
