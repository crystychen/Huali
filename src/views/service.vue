<!-- 华立服务 -->
<template>
	<div class="container">
		<el-carousel :height="bannerHeight + 'px'" :autoplay="false" arrow="never">
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
							<h6>HUALI SERVICE</h6>
						</div>
						<div class="text-content" v-if="contentData.length">
							<p class="" v-html="contentData[0].content">
							</p>
						</div>
					</div>
				</el-col>
			</el-row>
			<el-row type="flex" justify="center">
				<el-col :xl="16" :lg="22" :md="24" :sm="24" :xs="24">
					<el-row type="flex" justify="space-around">
						<el-col :xl="6" :lg="6" :md="6" :sm="24" :xs="24" v-for="(data, index) in contentData" :key="index" v-if='index > 0'>
							<div class="card">
								<div class="card-img-wrap">
									<img class="img" :src="data.clogo"></img>
								</div>
								<p class="item-title">{{data.title}}</p>
								<p class="item-content" v-html="data.content"></p>
							</div>
						</el-col>
<!-- 						<el-col :xl="6" :lg="6" :md="6" :sm="24" :xs="24">
							<div class="card">
								<div class="card-img-wrap">
									<img class="img" src="http://www.dghuafuli.com/dgshls201710171772/uploadfiles/image/pic57.jpg"></img>
								</div>
								<p class="item-title">售中服务</p>
								<p class="item-content">由专业的销售人员全程来跟进与贵单位的协调工作，以确保产品的运送及安装的准确；同时为贵公司提供快捷运送服务；协助处理并解决合作过程中的所有问题。</p>
							</div>
						</el-col>
						<el-col :xl="6" :lg="6" :md="6" :sm="24" :xs="24">
							<div class="card">
								<div class="card-img-wrap">
									<img class="img" src="http://www.dghuafuli.com/dgshls201710171772/uploadfiles/image/pic58.jpg"></img>
								</div>
								<p class="item-title">售后服务</p>
								<p class="item-content">如果出现售后问题保证售后服务人员24小时内到达现场，5天以内解决质量问题</p>
							</div>
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
					url: require('../assets/banner_service.jpg'),
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
			padding: 0 3.125rem;
			// .panel-body {
			// 	margin-top: 1.25rem;
			// }
		}

		.text-content {
			padding: 2.5rem 3.3125rem;

			li {
				text-indent: 30px;
				display: block;
				position: relative;
				margin: 1rem 0;
				list-style: none;

				p::before {
					content: "";
					position: absolute;
					left: 10px;
					// color: red;
					top: 14px;
					width: 6px;
					height: 6px;
					border-radius: 50%;
					background: #CD1E42;
					transform: translateY(-50%);
				}
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

	// 四列
	.card {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;

		.card-img-wrap {
			// width: 16.875rem;
			// height: 22.5rem;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			// border-right: 10px solid #FFFFFF;
			.img {
				background: #CCCCCC;
				width: auto;
				height: auto;
				max-width: 9rem;
			}
		}

		.item-title {
			font-size: 1.555555rem;
			font-weight: bold;
			font-stretch: normal;
			line-height: 1.222222rem;
			letter-spacing: -1px;
			color: #333333;
			margin-top: 2.75rem;
		}

		.item-content {
			// width: 17.375rem;
			text-align: left;
			// padding: 1.875rem 1.25rem;
			box-sizing: border-box;
			font-size: 1rem;
			font-weight: normal;
			font-stretch: normal;
			line-height: 30px;
			letter-spacing: 0px;
			color: #333333;
			margin-top: 1.25rem;
		}
	}
</style>
