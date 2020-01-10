<!-- 企业文化 -->
<template>
	<div class="container">
		<!-- <carousel :banner="banner" :bannerHeight="bannerHeight"></carousel> -->
		<el-carousel :height="bannerHeight + 'px'" :autoplay="false" arrow="never" indicator-position="none">
			<el-carousel-item v-for="(item, index) in banner" :key="index">
				<img class="img-responsive" :src="item.url">
			</el-carousel-item>
		</el-carousel>
		<div class="panel">
			<el-row type="flex" justify="center">
				<el-col :xl="16" :lg="22" :md="24" :sm="24" :xs="24">
					<div class="panel-content">
						<el-row type="flex" justify="center" class="">
							<el-col class="" :span="22">
								<el-row type="flex" justify="center" class="" :gutter="10">
									<el-col class="indicator-item" :xl="8" :lg="8" :md="8" :sm="8" :xs="8" v-for="(data, index) in contentData" :key="index" >
										<img class="indicator-item__img" :src="data.clogo"></img>
										<h3>{{data.title}}</h3>
										<p v-html="data.content"></p>
									</el-col>
									<!-- <el-col class="indicator-item" :xl="8" :lg="8" :md="8" :sm="8" :xs="8">
										<img class="indicator-item__img" src="../assets/culture2.png"></img>
										<h3>经营理念</h3>
										<p>品质为基础、服务为保证、创新为动力</p>
									</el-col>
									<el-col class="indicator-item" :xl="8" :lg="8" :md="8" :sm="8" :xs="8">
										<img class="indicator-item__img" src="../assets/culture3.png"></img>
										<h3>发展思路</h3>
										<p>专注装饰封边行业、精研复合材料技术</p>
										<p>贴近市场服务需求、巩固提升领先地位</p>
										<p>致力于打造装饰封边复合材料领域的一流品牌</p>
									</el-col> -->
								</el-row>
							</el-col>
						</el-row>
					</div>
				</el-col>
			</el-row>

		</div>
	</div>
</template>

<script>
	import carousel from '@/components/carousel.vue';

	export default {
		name: 'culture',
		components: {
			carousel
		},
		data() {
			return {
				banner: [{
					url: require('../assets/banner4.jpg'),
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
			// this.$store.state.topNavActive = this.$route.path;  // 活跃菜单与当前路径对应
			this.setSize();
			let id = this.$route.params.id;
			this.id = id;
			this.getData(id);
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
		margin: 5rem 0 3.75rem 0;

		.panel-content {
			.indicator-item {
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				align-items: center;
				text-align: center;

				h3 {
					line-height: 2;
				}

				p {
					font-size: 16px;
				}

				&__img {
					width: 100%;
					max-height: 28.1875rem;
					margin-bottom: 20px;
					box-sizing: border-box;
					position: relative;

				}
			}
		}
	}
	@media only screen and (min-width: 1170px) {
		.indicator-item__img {
			height: 451px;
			width: 23.125rem;
		}
	}
</style>
