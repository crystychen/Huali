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
				<el-col :xl="16" :lg="22" :md="24" :sm="24" :xs="24">
					<div class="panel-content">
						<div class="panel-title">
							<h5>
								{{infos.title}}
							</h5>
							<h6>RESEARCH AND PRODUCTION</h6>
						</div>
						<div class="text-content">
							<p class="text" v-html="infos.summary"></p>
							<!-- 	<li>
								<p class="">华立股份科研实力雄厚、生产设施先进、检测设备一流、人员队伍精干，具有专门从事家具封边生产研发的人员数十名。公司设有独立的产品研发中心，并与多家科研机构建立长期合作关系，保证公司产品技术领先，质量稳定。经过近＋多年的发展，公司已形成管理规范，运行良好的组织机构体系。</p>
							</li> -->
						</div>
					</div>
				</el-col>
			</el-row>
			<el-row type="flex" justify="center" v-if="contentData.length">
				<el-col :xl="16" :lg="22" :md="24" :sm="24" :xs="24">
					<el-row type="flex" justify="center">
						<el-col :xl="6" :lg="6" :md="6" :sm="24" :xs="24" v-for="(data, index) in contentData" :key="index" v-if='index < 4'>
							<div class="card ">
								<div class="card-img-wrap">
									<img class="img" :src="data.clogo"></img>
								</div>
								<p class="item-content" v-html="data.content"></p>
							</div>
						</el-col>
						<!-- <el-col :xl="6" :lg="6" :md="6" :sm="24" :xs="24">
							<div class="card">
								<div class="card-img-wrap">
									<img class="img" src="http://www.dghuafuli.com/dgshls201710171772/uploadfiles/image/pic40.jpg"></img>
								</div>
								<p class="item-content">2009年，华立股份获得由中华人民共和国教育部颁发的“科学技术进步奖”</p>
							</div>
						</el-col>
						<el-col :xl="6" :lg="6" :md="6" :sm="24" :xs="24">
							<div class="card ">
								<div class="card-img-wrap">
									<img class="img" src="http://www.dghuafuli.com/dgshls201710171772/uploadfiles/image/pic41.jpg"></img>
								</div>
								<p class="item-content">华立股份获得由中国合格评定国家认可委员会颁发的“国家级实验室”认可证书</p>
							</div>
						</el-col>
						<el-col :xl="6" :lg="6" :md="6" :sm="24" :xs="24">
							<div class="card ">
								<div class="card-img-wrap">
									<img class="img" src="http://www.dghuafuli.com/dgshls201710171772/uploadfiles/image/pic42.jpg"></img>
								</div>
								<p class="item-content">华立股份获得由中国合格评定国家认可委员会颁发的“国家级实验室”认可证书</p>
							</div>
						</el-col> -->
					</el-row>
				</el-col>
			</el-row>
			<div class="panel research" v-if="contentData.length >= 5 ">
				<el-carousel :autoplay="false" height="400px" indicator-position="none" arrow="never">
					<el-carousel-item>
						<!-- <img class="img-responsive" :src="item.url"> -->
						<div class="panel-content-bcg"></div>
						<div class="panel-content">
							<el-row type="flex" justify="center">
								<el-col :span="20">
									<el-row class="panel-body" type="flex" justify="center">
										<el-col :span="16">
											<div class="panel-title" >
												<h5 style="color: #FFFFFF;">
													{{contentData[4].title}}
												</h5>
												<h6 style="color: #FFFFFF;">HUALI INDUSTRIAL MATERIAL LABORATORY</h6>
											</div>
											<div class="text-content" v-html="contentData[4].content">

											</div>
										</el-col>
										<el-col :span="6">
											<img class="img" style="width: 140px;height:180px" :src="contentData[4].clogo"></img>
										</el-col>
									</el-row>
								</el-col>
							</el-row>
						</div>
					</el-carousel-item>
				</el-carousel>
			</div>
			<el-row type="flex" justify="center" class="media-panel">
				<el-col :xl="16" :lg="22" :md="24" :sm="24" :xs="24">
					<div class="media" v-for="(data, index) in contentData" :key="index" v-if='index > 4 && index < 13'>
						<div class="media-text-container">
							<h1 class="main-title">{{data.title}}</h1>
							<p class="main-text elellipse" v-html="data.content">
							</p>
						</div>
						<img class="media-img" :src="data.clogo">
					</div>
				</el-col>
			</el-row>
			<el-row type="flex" justify="center" v-if="contentData.length > 14">
				<el-col :xl="16" :lg="22" :md="24" :sm="24" :xs="24">
					<div class="panel-content">
						<div class="text-content">
							<p class="" v-html="contentData[13].content">
							</p>
						</div>
					</div>
				</el-col>
			</el-row>
			<el-row type="flex" justify="center" class="workshop" v-if="contentData.length > 15">
				<el-col :xl="16" :lg="22" :md="24" :sm="24" :xs="24">
					<div class="workshop-content">
						<el-row type="flex" justify="center" class="">
							<el-col class="" :span="22">
								<el-row type="flex" justify="center" style="flex-wrap: wrap" class="" :gutter="10">
									<el-col class="indicator-item" :xl="8" :lg="8" :md="8" :sm="8" :xs="8" v-for="(data, index) in contentData" :key="index" v-if='index > 13'>
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
										<p>生产工人通过欧洲进口设备对材料进行分切， 做到精准、高效。</p>
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
		name: 'Home',
		components: {
			carousel,
			// left: left
		},
		data() {
			return {
				banner: [{
					url: require('../assets/banner_science.png')
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
			padding: 1.875rem 3.125rem;

			.text {
				font-size: 1.375rem;
			}

			&>p {

				font-size: 22px !important;

			}

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
			font-stretch: normal;
			font-weight: normal;
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

	// 四列
	.card {
		position: relative;

		.card-img-wrap {
			width: 16.875rem;
			height: 22.5rem;
			border: 4px solid #F5F5F5;
			border-radius: 4px;
			margin-right: 1.25rem;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			overflow: hidden;

			// border-right: 10px solid #FFFFFF;
			.img {
				// width: 13.125rem;
				// height: 18.4375rem;
				width: 100%;
				height: 100%;
				background: #CCCCCC;
			}

		}

		.item-content {
			width: 17.375rem;
			text-align: center;
			padding: 1.875rem 1.25rem;
			box-sizing: border-box;
			font-size: 1.125rem;
		}
	}

	// 科研research
	.research {
		background-image: url(../assets/banner2.png);
		position: relative;
		margin-bottom: 0;

		.panel-content-bcg {
			width: 100%;
			height: 100%;
			background: #4A92EF;
			opacity: 0.9;
			position: absolute;
		}

		.panel-content {
			width: 100%;
			height: 100%;
			position: absolute;
			color: #FFFFFF;
			padding: 3.125rem;
			box-sizing: border-box;

			.panel-body {
				margin-top: 1.25rem;
			}
		}
	}

	.media-panel {
		background: #FAFAFA;
		padding: 1.875rem 0;
	}

	.media {
		position: relative;
		overflow: hidden;
		margin: 3.125rem auto;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		height: 21.875rem;

		&:nth-child(even) {
			flex-direction: row-reverse;

			.media-text-container {
				border-radius: 0px 8px 8px 0px;
			}
		}


		.media-img {
			height: 100%;
			width: 50%;
			z-index: 1;
			border-radius: 8px;
		}

		.media-text-container {
			width: 100%;
			max-width: 43.75rem;
			height: 17.5rem;
			background: #4c91ef;
			padding: 2.8125rem 6.25rem;
			color: #fff;
			font-size: 20px;
			box-sizing: border-box;
			border-radius: 8px 0px 0px 8px;

			.main-title {
				  
				font-size: 22px;
				font-weight: normal;
				font-stretch: normal;
				letter-spacing: 0px;
				color: #ffffff;
			}


			.main-text {

				margin-top: 1.125rem;
				// width: 421px;
				// height: 103px;
				 ;
				font-size: 18px;
				font-weight: normal;
				font-stretch: normal;
				line-height: 28px;
				letter-spacing: 0px;
				color: #ffffff !important;
				background: transparent !important;

				span {
					color: #ffffff !important;
					background: transparent !important;
				}
			}
		}
	}

	.workshop-content {
		.indicator-item {
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			align-items: center;
			text-align: center;
			margin: 1.25rem 0;

			h3 {
				  
				font-size: 1.75rem;
				font-weight: normal;
				font-stretch: normal;
				line-height: 1.375rem;
				letter-spacing: -1px;
				color: #333333;
			}

			p {
				 ;
				font-size: 1.125rem;
				font-weight: normal;
				font-stretch: normal;
				letter-spacing: 0px;
				color: #333333;
				margin-top: 1.25rem;
				text-align: left;
				padding: 0 1.875rem;
			}

			&__img {
				// width: 100%;
				width: 23.25rem;
				height: 15.625rem;
				// max-height: 28.1875rem;
				margin-bottom: 2.5rem;
				box-sizing: border-box;
				position: relative;

			}
		}
	}
</style>
