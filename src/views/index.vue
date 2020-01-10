<template>
	<div class="container" id="index-container">
		<carousel :banner="banner" :bannerHeight="bannerHeight"></carousel>
		<!-- 三列 -->
		<el-row type="flex" class="gray-bcg" justify="center">
			<el-col :lg="24" :md="24" :sm="24" :xs="24" class="wrap items-wrap">
				<el-row type="flex" class="items" justify="start" style="flex-wrap: wrap;" v-if="contentData.length">
					<el-col :xl="8" :lg="8" :md="8" :sm="24" :xs="24" class="item" v-for="(data, index) in contentData" :key="index"
					 v-if="index < 3">
						<img class="item-img" :src="data.clogo" alt="">
						<div class="item-content">
							<div class="text-top">{{data.title}}</div>
							<div class="text-bottom" v-html="data.content"></div>
						</div>
					</el-col>
				</el-row>
			</el-col>
		</el-row>
		<!-- 关于华立两列 -->
		<el-row :type="'flex'" :justify="'center'" class="gray-bcg" v-if="contentData.length >= 4">
			<el-col :xl="16" :lg="22" :md="24" :sm="24" :xs="24">
				<!-- /intros/9 -->
				<el-row class="grid-content-about bg-purple">
					<router-link :to="contentData[3].link" class="grid-content-about">
						<!-- contentData[3].clogo -->
						<img class="grid-content-img" src="../../static/imgs/index_about.png" alt="">
						<div class="text-container">
							<div class="panel-title">
								<h1>{{contentData[3].title}}</h1>
								<h3>ABOUT HUALI</h3>
							</div>
							<p class="main-text elellipse" v-html="contentData[3].content">
							</p>
							<P class="">
								<p class="">
									<p class="operation-btn">了解更多&nbsp;</p>
								</p>
							</P>
						</div>
					</router-link>
				</el-row>
			</el-col>
		</el-row>
		<!-- 四行四列导航菜单 -->
		<el-row type="flex" justify="center">
			<!-- class="grid navs" -->
			<!-- <el-col > -->
			<el-row type="flex" justify="center" class="grid navs col-grid">
				<div class="grid-item-wrap" v-for="(item, index) in navImgs" :key="index" @mouseover="mouseoverImg(index)"
				 @mouseout="mouseoutImg(index)">
					<div class="grid-item">
						<router-link :to='item.url' class="column" style="">
							<img class="grid-item__img font_family" :class='item.class' :src="item.img"></img>
							<div style="text-align: center">
								<h4>{{item.title}}</h4>
								<h5>{{item.subtitle}}</h5>
							</div>
						</router-link>
					</div>
				</div>
			</el-row>
			<!-- </el-col> -->
		</el-row>
		<!-- 产品中心 -->
		<el-row type="flex" justify="center" class="panel product">
			<el-col :xl="16" :lg="22" :md="24" :sm="24" :xs="24" style="width: 70rem;">
				<el-carousel :autoplay="false" height="33.333333rem" indicator-position="outside" arrow="always" ref="procarousel"
				 @change="proChange">
					<!-- v-for="(item, index) in banner3" :key="index" -->
					<el-carousel-item v-for="(proBanner, index) in procontents" :key="index">
						<router-link :to="'/product/'+proinfos.children[proActiveIndex].id">
							<div class="panel-content">
								<el-row type="flex" justify="center">
									<!-- wrap -->
									<el-col class="panel-wrap " style="width: 63.333333rem;">
										<div class="panel-title panel-title-wrap">
											<h5>
												产品中心
											</h5>
											<h6>PRODUCT CENTER</h6>
										</div>
										<el-row class="panel-body" type="flex" justify="center">
											<div class="text-container-wrap">
												<div class="text-container">
													<h4>{{proBanner.title}}</h4>
													<p v-html="proBanner.content"></p>
													<!-- <p class="main-text elellipse">华立股份是国内首家突破德国技术垄断，生产有自主知识产权封边产品的厂家</p>
												<h4>应用范围</h4>
												<p class="main-text elellipse">华立股份是国内首家突破德国技术垄断</p> -->
													<P class="">
														<p class="operation-btn">了解更多&nbsp;</p>
													</P>
												</div>
											</div>
										</el-row>
										<div class="img-wrap">
											<img class="img " :src="proBanner.clogo"></img>
										</div>
									</el-col>
								</el-row>
							</div>
						</router-link>
					</el-carousel-item>
				</el-carousel>
			</el-col>
		</el-row>
		<!-- 产品中心触发器 -->

		<el-row type="flex" justify="center" class="product-indicator">
			<el-col :xl="16" :lg="22" :md="24" :sm="24" :xs="24" class="wrap">
				<!-- <div class="panel-content "> -->
				<!-- 					<el-row type="flex" justify="center" class="">
						<el-col class="" :span="20"> -->
				<el-row type="flex" justify="center">
					<el-col class="indicator-item " v-bind:class="{ active: proActiveIndex == index }" @mouseover.native="changeProSwiper(index)"
					 :xl="8" :lg="8" :md="8" :sm="8" :xs="8" v-for="(pro, index) in proinfos.children" :key="index">
						<img v-if="proActiveIndex == index  && index == 0" class="indicator-item__img font_family icon-img-icon" src="../../static/imgs/index_icon/pro_1.png">
						</img>
						<img v-if="proActiveIndex != index && index == 0" class="indicator-item__img font_family icon-img-icon" src="../../static/imgs/index_icon/unpro_1.png">
						</img>
						<img v-if="proActiveIndex == index  && index == 1" class="indicator-item__img font_family icon-img-icon" src="../../static/imgs/index_icon/pro_2.png">
						</img>
						<img v-if="proActiveIndex != index && index == 1" class="indicator-item__img font_family icon-img-icon" src="../../static/imgs/index_icon/unpro_2.png">
						</img>
						<img v-if="proActiveIndex == index  && index == 2" class="indicator-item__img font_family icon-img-icon" src="../../static/imgs/index_icon/pro_3.png">
						</img>
						<img v-if="proActiveIndex != index && index == 2" class="indicator-item__img font_family icon-img-icon" src="../../static/imgs/index_icon/unpro_3.png">
						</img>
						<h3>{{pro.title}}</h3>
						<!-- <h5>EDGE BANDING</h5> -->
					</el-col>
				</el-row>
				<!-- 			</el-col>
					</el-row> -->
				<!-- </div> -->
			</el-col>
		</el-row>
		<!-- 科研与环保 -->
		<el-row type="flex" justify="center" class="panel research-wrap">
			<div class="research-bcg"></div>
			<el-col :xl="16" :lg="22" :md="24" :sm="24" :xs="24" style="max-width: 70rem;">
				<div class="research">
					<el-carousel :autoplay="false" height="400px" indicator-position="none" arrow="always" v-if="contentData.length >= 5 ">
						<el-carousel-item v-for="(data, index) in contentData" :key="index" v-if='index >= 4'>
							<!-- :to="data.link" -->
							<router-link to="/science/15">
								<!-- <img class="img-responsive" :src="item.url"> -->
								<div class="panel-content">
									<el-row type="flex" justify="center">
										<el-col class="panel-wrap wrap">
											<div class="panel-title">
												<h5>
													科研与环保
												</h5>
												<h6>RESEARCH</h6>
											</div>
											<el-row class="panel-body" type="flex" justify="start">
												<!-- <el-col :span="16"> -->
												<!-- <p>{{contentData[5].title}}</p> -->
												<p class="text-container" v-html="data.content"></p>
												<!-- </el-col> -->
												<!-- <el-col :span="6"> -->
												<img class="img" style="" :src="data.clogo"></img>
												<!-- </el-col> -->
											</el-row>
										</el-col>
									</el-row>
								</div>
							</router-link>
						</el-carousel-item>
					</el-carousel>
				</div>
			</el-col>
		</el-row>
		<!-- 合作伙伴 -->
		<el-row type="flex" justify="center" class="panel company">
			<el-col :xl="16" :lg="22" :md="24" :sm="24" :xs="24" style="">
				<div class="panel">
					<div class="panel-content">
						<el-row type="flex" justify="center">
							<el-col class="wrap">
								<div class="panel-title">
									<h5>
										合作伙伴
									</h5>
									<h6>PARTNER</h6>
								</div>
								<el-row class="panel-body partner-body" type="flex" justify="start">
									<el-col v-for="(item, index) in partners" :key="index" @mouseover.native="mouseoverPartImg(index)"
									 @mouseout.native="mouseoutPartImg(index)" class="partner-body-item ">
										<!-- el-col-sm-4-8 el-col-md-4-8 el-col-lg-4-8 el-col-xl-4-8 -->
										<a href="https://www.baidu.com/" target="_blank">
											<img class="img-responsive" style="width: 143px;height:83px" :src="item.img"></img>
										</a>
									</el-col>
								</el-row>
							</el-col>
						</el-row>
					</div>

				</div>
			</el-col>
		</el-row>
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
						cimg: require('../assets/banner13.png')
					},
					{
						cimg: require('../assets/banner14.jpg')

					},
					{
						cimg: require('../assets/banner15.jpg')

					},
					{
						cimg: require('../assets/banner16.jpg')

					},
					{
						cimg: require('../assets/banner17.jpg')

					},
					{
						cimg: require('../assets/banner18.jpg')

					},
					{
						cimg: require('../assets/banner19.jpg')

					},
					{
						cimg: require('../assets/banner20.jpg')

					}
				],
				navImgs: [{
						class: 'icon-img-icon',
						title: '公司概况',
						subtitle: "COMPANY PROFILE",
						img: 'static/imgs/index_icon/unselected_1.png',
						url: "/intros/9"
					},
					{
						class: 'icon-img-icon',
						title: '发展历程',
						subtitle: "HISTORY OF DEVELOPMENT",
						img: 'static/imgs/index_icon/unselected_2.png',
						url: "/framework/11"
					},
					{
						class: 'icon-img-icon',
						title: '企业文化',
						subtitle: "CORPORATE CULTURE",
						img: 'static/imgs/index_icon/unselected_3.png',
						url: "/culture/12"
					},
					{
						class: 'icon-img-icon',
						title: '公司架构',
						subtitle: "COMPANY STRUCTURE",
						img: 'static/imgs/index_icon/unselected_4.png',
						url: "/framework/79"
					},
					{
						class: 'icon-img-icon',
						title: '荣誉资质',
						subtitle: "HONORARY QUALIFICATIONS",
						img: 'static/imgs/index_icon/unselected_5.png',
						url: "/honorary/21"
					},
					{
						class: 'icon-img-icon',
						title: '华立视频',
						subtitle: "HUALI VIDEO",
						img: 'static/imgs/index_icon/unselected_6.png',
						url: "/video/38"
					},
					{
						class: 'icon-img-icon',
						title: '全景漫游',
						subtitle: "PANORAMIC ROAMING",
						img: 'static/imgs/index_icon/unselected_7.png',
						url: "/video/81"
					},
					{
						class: 'icon-img-icon',
						title: '华立基地',
						subtitle: "HUALI BASE",
						img: 'static/imgs/index_icon/unselected_8.png',
						url: "/base/49"
					}
				],
				originImgs: [],
				bannerHeight: 1000,
				screenWidth: 0,
				banner3: [{
						url: require('../assets/banner1.png'),
						content: ""
					},
					{
						url: require('../assets/banner2.png'),

					},
					{
						url: require('../assets/banner3.png'),

					}
				],
				proActiveIndex: 0,
				partners: [],
				id: 0,
				contents: "", // 内容
				contentData: "", // 内容数据数组 
				infos: "", // 栏目信息
				proinfos: "", // 产品中心信息
				procontents: [], // 产品中心内容
			}
		},
		methods: {
			setSize: function() {
				this.bannerHeight = 480 / 1920 * this.screenWidth;
			},
			mouseoverImg(e) {
				console.log(e)
				this.navImgs[e].img = "static/imgs/index_icon/selected_" + (e + 1) + ".png";

			},
			mouseoutImg(e) {
				console.log(e)
				this.navImgs[e].img = "static/imgs/index_icon/unselected_" + (e + 1) + ".png";
			},
			mouseoverPartImg(e) {
				console.log(e)
				console.log(this.partners)
				this.partners[e].img = "static/imgs/part_logo/彩色logo_" + (e + 1) + ".png";

			},
			mouseoutPartImg(e) {
				console.log(e)
				console.log(this.partners)
				this.partners[e].img = "static/imgs/part_logo/灰色LOGO_" + (e + 1) + ".png";
			},
			//  产品中心切换swiper
			changeProSwiper(e) {
				console.log("啊哈发货方")
				console.log(e)
				this.$refs.procarousel.setActiveItem(e)
			},
			proChange(e) {
				console.log(e)
				this.proActiveIndex = e
			},
			getBannerData() {
				this.$axios.get('/api/banner/list/1/1').then(res => {
					console.log(res.data);
					if (res.data.code == "00") {
						this.banner = res.data.data;
					}
				}, response => {
					console.log("error");
				});
			},
			postData() {
				let data = {
					userId: this.userId,
					token: this.token
				}
				// this.qs.stringify({ //这里是发送给后台的数据
				// 	userId: this.userId,
				// 	token: this.token,
				// })
				this.$axios({
					method: 'post',
					url: '/api/test.json',
					data: data
				}).then(response => {
					console.log(response.data);
				}, response => {
					console.log("error");
				});
			},
			getPartners() {
				let arr = []
				for (let i = 0; i < 15; i++) {
					let obj = {}
					obj.img = '/static/imgs/part_logo/灰色LOGO_' + (i + 1) + '.png';
					arr.push(obj)
				}
				this.partners = arr
			},
			getContentData() {
				let id = this.$store.state.activeMenuId;
				let url = "/api/contentCategory/category/";
				if (!id) {
					return;
				}
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
						console.log("contentData:", this.contentData)
					}
				}, response => {
					console.log("error");
				});
			},
			getProductsData(id) {
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
						this.proinfos = infos;
						infos.children.map((element, index) => {
							this.getSubPros(element.id)
						})
						// this.procontents = res.data.data.contents.data;
						// this.contentData = this.contents.data;
					}
				}, response => {
					console.log("error");
				});
			},
			getSubPros(id) {
				let url = "/api/contentCategory/category/";
				this.$axios.get(url + id, {
					params: {
						limit: 1,
						page: 1
					}
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "00") {
						let infos = res.data.data.contents.data;
						this.procontents = this.procontents.concat(infos)
						console.log("infos", infos)
					}
				}, response => {
					console.log("error");
				});
			}
		},
		mounted() {
			// this.$store.state.topNavActive = this.$route.path; // 活跃菜单与当前路径对应
			this.$store.state.topNavActive = "/Home"; // 活跃菜单与当前路径对应
			let [...imgs] = this.navImgs
			this.originImgs = imgs;
			// 首次加载时,需要调用一次
			this.screenWidth = window.innerWidth;
			this.setSize();
			console.log("resize index")
			// 窗口大小发生改变时,调用一次
			window.onresize = () => {
				this.screenWidth = window.innerWidth;
				this.setSize();
			}

			this.getBannerData();
			this.getPartners();
			this.getContentData(); // 获取首页内容
			this.getProductsData(2);

		},
		watch: {
			// 监测store.state
			'$store.state.devicewidth': 'setSize',
			'$store.state.activeMenuId': 'getContentData',
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
		// font-family: SourceHanSansCN-Regular;
		// font-family: "SiYuanRegular";
	}

	/* 图片自适应容器 */
	.img-responsive {
		display: block;
		height: auto;
		width: 100%;
	}

	.wrap {
		// max-width: 61.555555rem;
		width: 63.333333rem;
	}

	.items-wrap {
		width: 61.111111rem;
	}

	.items {
		background: #fff;
		border-radius: 10px;
		position: relative;
		top: -4rem;
		z-index: 2;
		box-sizing: border-box;

		.item {
			// width: 33.3%;
			/* height: 200px; */
			padding: 1.875rem 1.25rem;
			// padding-right: 1.25rem;
			box-sizing: border-box;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			border-right: 1px solid #d4d4d4;

			&:last-child {
				border: none;
			}

		}

		.item-img {
			width: 7.722222rem;
			height: 7.722222rem;
		}

		.item-content {
			padding-left: 0.555555rem;
			flex: 1;

			.text-top {
				margin-bottom: 1rem;

				font-size: 1.222222rem;
				font-weight: bold;
				font-stretch: normal;
			}

			.text-bottom {
				color: #888888;
				line-height: 1.8;
				font-size: 1rem;
			}
		}
	}


	@media (max-width: 992px) {

		.items-wrap {
			margin: 0 2%;
		}

		.items {
			top: 0;
			margin: 10px 0;

			.item {
				border: none;
				border-bottom: 1px solid #d4d4d4;
			}
		}
	}

	.gray-bcg {
		background: #FAFAFA;
	}

	.grid-content-about {
		background: #FAFAFA;
		position: relative;
		overflow: hidden;
		width: 63.333333rem;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		.grid-content-img {
			// height: 100%;
			height: 29.444444rem;
			width: 32.666666rem;
			// max-width: 32.666666rem;
			box-sizing: border-box;
		}

		.text-container {
			// width: 50%;
			width: 30.555555rem;
			height: 29.444444rem;
			background: #4c91ef;
			padding: 4rem;
			color: #fff;
			font-size: 1.111111rem;
			box-sizing: border-box;
			font-family: SourceHanSansCN-Regular;

			h1 {
				// font-size: 36px;
				font-size: 2rem;
				height: 1.944444rem;
				font-family: SourceHanSansCN-Bold;
				// font-weight: bold;
				font-stretch: normal;
				line-height: 1.555555rem;
				letter-spacing: 0px;
				color: #ffffff;
			}

			h3 {
				height: 1.166666rem;
				font-family: SourceHanSansCN-Bold;
				font-size: 1.555555rem;
				// font-weight: normal;
				font-stretch: normal;
				line-height: 1.555555rem;
				letter-spacing: -1px;
				color: #ffffff;
			}

			.main-text {
				margin-top: 30px;
				font-size: 1.222222rem;
				width: 19.888888rem;
				min-height: 11.833333rem;
				// font-family: SourceHanSansCN-Normal;
				font-size: 1.222222rem;
				font-weight: normal;
				font-stretch: normal;
				line-height: 1.777777rem;
				letter-spacing: 0px;
				color: #ffffff;
			}

			.operation-btn {
				// margin-top: 70px;
				position: absolute;
				bottom: 2.777777rem;
				z-index: 1;
				display: inline-block;
				font-family: SourceHanSansCN-Regular;
				font-size: 1.333333rem;
				letter-spacing: 0px;
				color: #ffffff;

				&:after {
					content: "";
					position: absolute;
					bottom: 0;
					left: 0;
					z-index: -1;
					height: 6px;
					width: 96%;
					background: #CD1E46;
				}

				&:before {
					content: "→";
					position: absolute;
					top: 2px;
					left: 100%;
					z-index: 1;
					height: 6px;
					width: 96%;
					color: #FFFFFF;
				}
			}
		}
	}

	@media (max-width: 992px) {

		.grid-content-about {
			.grid-content-img {
				height: 100%;
				width: 50%;
			}

			.text-container {
				padding: 10px;

				.main-text {
					margin-top: 10px;
				}

				.operation-btn {
					bottom: 10px;
				}
			}
		}



	}

	.col-grid {
		// max-width: 62.666666rem;
		width: 63.666666rem;
	}

	// 导航菜单
	.grid.navs {
		// display: flex;
		// flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		// justify-content: flex-start;
		margin: 4rem auto;
		font-family: SourceHanSansCN-Regular;

		.grid-item-wrap:nth-child(4N) {
			padding-right: 0;
		}

		.grid-item-wrap {
			padding: 1.055555rem;
			box-sizing: border-box;
			padding-left: 0;
			padding-top: 0;
		}

		.grid-item {
			width: 15rem;
			height: 16.666666rem;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
			border: 1px solid #D4D4D4;
			// padding: 1.25rem 0;
			// margin: 0.555555rem;
			// margin-left: 0;
			// margin-top: 0;
			border-radius: 5px;

			h4 {
				font-size: 1.333333rem;
				font-family: SourceHanSansCN-Bold;
			}

			h5 {
				margin-top: 0.777777rem;
				font-size: 1rem;
			}

			.column {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
			}

			&:hover {
				// width: 16.875rem;
				// height: 18.75rem;
				color: #fff;
				background: #4c91ef;
				border: none;
				box-shadow: 0px 0px 0px 0px rgba(74, 146, 239, .3), //左边阴影
					0 0px 0px 0px #EDF4FD, //顶部阴影
					0 4px 10px 5px rgba(74, 146, 239, .5), //底部阴影
					0px 0px 0px 0px rgba(74, 146, 239, .3); //右边阴影

				.grid-item__img {
					color: #fff;
					font-size: 7rem;
				}

				a {
					color: #fff;
				}
			}

			&__img {
				font-size: 6rem;
				width: 6.4375rem;
				height: 6.25rem;
			}
		}
	}

	// 产品中心
	.product /deep/ .el-carousel__arrow--left {
		left: 0;
	}

	.product /deep/ .el-carousel__arrow--right {
		right: 0;
	}

	.product /deep/ .el-carousel__arrow {
		background-color: transparent;
		color: #4993EF;
		font-size: 2.777777rem;
		text-align: center;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.product /deep/ .el-carousel__item {
		overflow: visible;
	}

	/* 覆盖ele-ui默认样式 指示器样式 */
	.product /deep/ .el-carousel__button {
		width: 10px;
		height: 10px;
		border: 1px solid #000000;
		border-radius: 50%;
		background-color: transparent;
		opacity: 1;
	}

	.product /deep/ .el-carousel__indicator.is-active button {
		opacity: 1;
		background: #000;
		border: 1px solid #000;
	}

	.product /deep/ .el-carousel__indicators--outside {
		// margin-top: 1.666666rem;
	}

	.panel.product {
		margin: 0 auto;
	}

	.product {
		background: #FAFAFA;

		.panel-body {
			// background: #4A92EF;
		}

		.panel-wrap {
			position: relative;
		}

		.text-container-wrap {
			width: 100%;
			background: #4c91ef;
			padding: 4rem;
			box-sizing: border-box;
			border-radius: 10px;
			height: 20rem;
		}

		.text-container {
			// width: 300px;
			width: 21vw;
			color: #fff;

			.main-text {
				margin: 10px 0;
			}

			.operation-btn {
				margin-top: 4.375rem;
				position: absolute;
				bottom: 2.777777rem;
				width: auto;
				display: inline-block;
				z-index: 1;
				font-family: SourceHanSansCN-Regular;

				&:after {
					content: "";
					position: absolute;
					bottom: 2px;
					left: 0;
					z-index: -1;
					height: 6px;
					width: 96%;
					background: #CD1E46;
				}

				&:before {
					content: "→";
					position: absolute;
					top: 2px;
					left: 100%;
					z-index: 1;
					height: 6px;
					width: 96%;
					color: #FFFFFF;
				}
			}
		}

		.img-wrap {
			position: absolute;
			right: 0;
			top: 0px;
			width: 29rem;
			height: 29rem;
			border-radius: 10px;
			overflow: hidden;

			.img {
				width: 100%;
				height: 100%;
			}
		}
	}

	@media only screen and (max-width: 1200px) {
		.product /deep/ .el-carousel__indicators--outside {
			margin-top: 0;
		}
	}


	.product-indicator {
		background: #FAFAFA;
		padding: 3.125rem 0 5rem 0;
		// font-family: SourceHanSansCN-Regular;
		font-family: SourceHanSansCN-Bold;

		.indicator-item {
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
			border: 1px solid #c3c3c3;
			padding: 0.777777rem 0;
			margin-right: 0.777777rem;
			border-radius: 5px;
			// max-width: 20.555555rem;
			width: 20.555555rem;
			height: 9.444444rem;

			// 
			&.active {
				color: #fff;
				background: #4c91ef;
				border: none;
				box-shadow: 0px 0px 0px 0px rgba(74, 146, 239, .3), //左边阴影
					0 0px 0px 0px #EDF4FD, //顶部阴影
					0 4px 8px 4px rgba(74, 146, 239, .5), //底部阴影
					0px 0px 0px 0px rgba(74, 146, 239, .3); //右边阴影

				&:after {
					content: " ";
					// background: #4A92EF;
					width: 0;
					height: 0;
					border-left: 20px solid transparent;
					border-right: 20px solid transparent;
					border-bottom: 20px solid #4A92EF;
					position: absolute;
					top: -10px;

				}
			}

			&__img {
				font-size: 3.75rem;
				margin: 10px;
			}
		}

		.indicator-item:last-child {
			margin-right: 0;
		}
	}

	// 科研與環保 research
	.research-wrap {
		background-image: url(../assets/research-bcg.png);

		.research-bcg {
			width: 100%;
			height: 100%;
			opacity: 0.8;
			position: absolute;
			z-index: 0;
		}
	}

	.research {
		position: relative;
		min-height: 27.777777rem;
		// .panel-content-bcg {
		// 	width: 100%;
		// 	height: 100%;
		// 	opacity: 0.9;
		// 	position: absolute;
		// }

		.panel-content {
			width: 100%;
			height: 100%;
			position: absolute;
			color: #FFFFFF;
			padding: 3.125rem;
			box-sizing: border-box;

			.panel-body {
				margin-top: 1.666666rem;
				padding-left: 5rem;

				.text-container {
					// flex: 1;
					width: 35.111111rem;
				}

				.img {
					margin-left: 3.888888rem;
					width: 7.777777rem;
					height: 10rem
				}
			}
		}
	}

	.research /deep/ .el-carousel__arrow--left {
		left: 0;
	}

	.research /deep/ .el-carousel__arrow--right {
		right: 0;
	}

	.research /deep/ .el-carousel__arrow {
		background-color: transparent;
		font-size: 50px;
	}

	.panel {
		// margin: 30px 0;
	}

	.panel-content {
		padding: 3.125rem;

		.panel-body {
			margin-top: 1.25rem;
		}
	}

	.panel-title {
		font-size: 2rem;

		h5,
		h6 {
			line-height: 1.4;
			// font-family: SourceHanSansCN-Regular;
			font-family: SourceHanSansCN-Bold;
		}

		.subtitle {
			font-size: 30px;
		}
	}

	// 合作伙伴
	.partner-body {
		flex-wrap: wrap;
		width: 63.333333rem;

		.partner-body-item {
			border-right: 1px solid #CCCCCC;
			border-bottom: 1px solid #CCCCCC;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;
			padding: 1.111111rem;
			width: 12.666666rem;
			height: 7.222222rem;
		}

		.partner-body-item:nth-child(5n) {
			border-right: none;
		}

		.partner-body-item:nth-child(5n+1):nth-last-child(-n+5),
		.partner-body-item:nth-child(5n+1):nth-last-child(-n+5)~.partner-body-item {
			border-bottom: none;
		}
	}

	@media only screen and (min-width:768px) {

		.el-col-sm-4-8 {

			width: 20%
		}

		.el-col-sm-offset-4-8 {

			margin-left: 20%
		}

		.el-col-sm-pull-4-8 {

			position: relative;

			right: 20%
		}

		.el-col-sm-push-4-8 {

			position: relative;

			left: 20%
		}

		.operation-btn {
			margin-top: 10px;
		}
	}

	@media only screen and (min-width:992px) {

		.el-col-md-4-8 {

			width: 20%
		}

		.el-col-md-offset-4-8 {

			margin-left: 20%
		}

		.el-col-md-pull-4-8 {

			position: relative;

			right: 20%
		}

		.el-col-md-push-4-8 {

			position: relative;

			left: 20%
		}

		.operation-btn {
			margin-top: 10px !important;
		}

	}

	@media only screen and (min-width:1200px) {

		.el-col-lg-4-8 {

			width: 20%
		}

		.el-col-lg-offset-4-8 {

			margin-left: 20%
		}

		.el-col-lg-pull-4-8 {

			position: relative;

			right: 20%
		}

		.el-col-lg-push-4-8 {

			position: relative;

			left: 20%
		}

	}

	@media only screen and (min-width:1920px) {

		.el-col-xl-4-8 {

			width: 20%
		}

		.el-col-xl-offset-4-8 {

			margin-left: 20%
		}

		.el-col-xl-pull-4-8 {

			position: relative;

			right: 20%
		}

		.el-col-xl-push-4-8 {

			position: relative;

			left: 20%
		}

	}
</style>
