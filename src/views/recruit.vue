<!-- 社会招聘 -->
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
							<h6>SOCIAL RECRUITMENT</h6>
						</div>
						<div class="panel-body collapse">
							<div class="collapse-item collapse-header">
								<span>招聘职位</span>
								<span>工作地点</span>
								<span>招聘人数</span>
								<span>发布时间</span>
								<span>&nbsp; </span>
							</div>
							<el-collapse accordion>
								<el-collapse-item v-for="(data, index) in contentData" :key="index">
									<template slot="title">
										<div class="collapse-item">
											<span>{{data.content.title}}</span>
											<span>{{data.items[0].title}}</span>
											<span>{{data.items[1].title}}</span>
											<span>{{data.items[2].title}}</span>
											<span @click="delivery()">
												<router-link to="/feedback/53">
													投递简历
												</router-link>
											</span>
										</div>
									</template>
									<div class="collapse-content">
										<p v-html="contentData[0].content.content"></p>
									</div>
								</el-collapse-item>
								<!-- 								<el-collapse-item>
									<template slot="title">
										<div class="collapse-item">
											<span>流程管理部经理</span>
											<span>广东省东莞市常平镇松柏塘村</span>
											<span>1</span>
											<span>2018-05-25</span>
											<span @click="delivery(23)">投递简历</span>
										</div>
									</template>
									<div class="collapse-content">
										与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
										在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
									</div>
								</el-collapse-item> -->
							</el-collapse>
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
					url: require('../assets/banner_welfare.png')
				}],
				bannerHeight: 0,
				screenWidth: 0,
				id: 0,
				contents: "", // 内容
				pcontentData: "", // 内容数据数组 
				infos: "", // 栏目信息
				pinfos: "", // 父元素
				contentData: [], // 拼接数组（展现）
			}
		},
		methods: {
			setSize: function() {
				let screenWidth = this.$store.state.devicewidth;
				this.bannerHeight = 480 / 1920 * screenWidth;
			},
			// 投递简历
			delivery(e) {
				console.log(e)
			},
			getData(id) {
				let url = "/api/contentCategory/category/"
				this.$axios({
					method: 'get',
					url: url + id,
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
						this.pcontentData = this.contents.data;
						this.pcontentData.map((element, index) => {
							this.getSubContent(element.id);
						})
					}
				}, response => {
					console.log("error");
				});
			},
			getSubContent(id) {
				let url = "/api/banner/content/"
				this.$axios.get(url + id).then(res => {
					console.log(res.data);
					if (res.data.code == "00") {
						let subInfos = res.data.data;
						console.log("subInfos", subInfos)
						let arr = [];
						// let isChecked = this.checkIndexInArray(subInfos.content.id, this.contentData);
						// if (isChecked) {
						// 	return;
						// }
						arr.push(subInfos);
						this.contentData = this.contentData.concat(arr);
					}
				}, response => {
					console.log("error");
				});
			},
			setId() {
				this.id = this.$route.params.id
			},
			// 检查是否在数组中
			checkIndexInArray(id, arr) {

				for (var i = 0; i < arr.length; i++) {
					if (arr[i].content.id == id) {
						return true;
					}
				}
				return false
			},
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
			padding: 0 3.125rem;

		}

		.panel-body {
			padding: 1.875rem 0;
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

	.collapse {
		.collapse-header {
			background-color: #ce1d44;
			color: #FFFFFF;
			border: none;
			margin-bottom: 1.25rem;

			&.collapse-item {
				background-color: #ce1d44;
				color: #FFFFFF;

				span:nth-of-type(1) {
					width: 18.75rem;

					&::before {
						content: "";
						height: 1.625rem;
						width: 2px;
						background: #e5e5e5;
						position: absolute;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
					}
				}

				span {
					&:last-child::after {
						content: "";
						height: 1.625rem;
						width: 2px;
						background: #e5e5e5;
						position: absolute;
						right: 0;
						top: 50%;
						transform: translateY(-50%);
					}
				}
			}
		}

		.collapse-item {
			height: 60px;
			padding: 0 1.875rem;
			box-sizing: border-box;

			span:nth-of-type(1) {
				width: 18.75rem;

				&::before {
					content: "";
					height: 1.625rem;
					width: 0px;
					background: #e5e5e5;
					position: absolute;
					left: 0;
					top: 50%;
					transform: translateY(-50%);
				}
			}

			span:nth-of-type(2) {
				width: 21.875rem;
			}

			span:nth-of-type(3) {
				width: 8.125rem;
			}

			span:nth-of-type(4) {
				width: 11rem;
			}

			span {
				display: inline-block;
				text-align: center;
				line-height: 60px;
				position: relative;
				flex: 1;
				min-width: 5.555555rem;

				&::before {
					content: "";
					height: 1.625rem;
					width: 2px;
					background: #e5e5e5;
					position: absolute;
					left: 0;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}
	}

	//  覆盖ui
	.collapse /deep/ .el-collapse-item__header {
		border: 1px solid #EBEEF5;
	}

	.collapse /deep/ .el-collapse-item__header.is-active {
		background-color: #f5f5f5;
	}

	.collapse /deep/ .el-collapse-item__wrap {
		border: 1px solid #EBEEF5;
	}

	.collapse-content {
		padding: 2.25rem 2.6875rem 2.4375rem 3.125rem;
		box-sizing: border-box;
	}

	// {
	// 	padding: 2.25rem 2.6875rem 2.4375rem 3.125rem;
	// }
</style>
