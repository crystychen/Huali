<!-- 员工风采 -->
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
							<h6>STAFF</h6>
						</div>
						<div class="panel-body">
							<div class="infos-title">
								<!-- 2018年华立优秀员工风采 -->
							</div>
							<div class="infos-content indicator-panel">
								<el-row type="flex" justify="start" style="flex-wrap: wrap;" class="">
									<el-col class="indicator-item" :xl="8" :lg="8" :md="8" :sm="8" :xs="8" v-for="(data, index) in contentData"
									 :key="index">
										<img class="indicator-item__img" :src="data.clogo"></img>
										<p class="indicator-item__text">
											<!-- <span>{{data.title}}：</span> -->
											<span v-html="data.content">
											</span>
										</p>
									</el-col>
									<!-- <el-col class="indicator-item" :xl="8" :lg="8" :md="8" :sm="8" :xs="8">
										<img class="indicator-item__img" src="http://www.dghuafuli.com/uploadfiles/2019/08/201908081616131613.jpg"></img>
										<p class="indicator-item__text">
											<span>李炳发：</span>
											<span>
												人生的精彩是用拼搏和奋斗来换取的
											</span>
										</p>
									</el-col>
									<el-col class="indicator-item" :xl="8" :lg="8" :md="8" :sm="8" :xs="8">
										<img class="indicator-item__img" src="http://www.dghuafuli.com/uploadfiles/2019/08/201908081617301730.jpg"></img>
										<p class="indicator-item__text">
											<span>梁得华：</span>
											<span>
												静下来，铸我实力，拼上去，亮我风采
											</span>
										</p>
									</el-col> -->
								</el-row>
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

	.infos-title {
		height: 1.333333rem;
		font-size: 1.333333rem;
		font-weight: normal;
		font-stretch: normal;
		line-height: 28px;
		letter-spacing: -1px;
		color: #333333;
		text-align: center;
	}

	.infos-content {}

	.indicator-panel {
		margin: 3.75rem 0 3.6875rem 0;

	}

	.indicator-item:nth-child(3N+1) {
		margin-left: 0;
	}

	.indicator-item {
		// max-width: 16.875rem;
		height: 21.875rem;
		box-sizing: border-box;
		width: 330px;
		background-color: #ffffff;
		box-shadow: 0px 0px 50px 0px rgba(89, 89, 89, 0.1);
		margin: 2.1875rem 2.1875rem;



		&__img {
			width: 20.625rem;
			height: 12.5rem;
			background-color: #ffffff;
			box-shadow: 0px 0px 80px 0px rgba(89, 89, 89, 0.1);

		}

		&__text {
			// width: 333px;
			font-size: 1rem;
			font-weight: normal;
			font-stretch: normal;
			line-height: 1.555555rem;
			letter-spacing: -1px;
			color: #333333;
			padding-left: 2.1875rem;
			padding-top: 1.25rem;
			padding-right: 2.1875rem;
			min-height: 8.75rem;
			text-align: left;

			span {
				display: block;
			}
		}
	}


</style>
