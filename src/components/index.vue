<template>
	<div class="container">
		<carousel></carousel>
		<!-- 三列 -->
		<el-row type="flex" class="" justify="center">
			<el-col :xl="16" :lg="22" :md="24" :sm="24" :xs="24">
				<el-row type="flex" class="items" justify="center">
					<el-col :xl="8" class="item">
						<img class="item-img" src="../assets/index_01.png" alt="">
						<div class="item-content">
							<div class="text-top">3D封边条</div>
							<div class="text-bottom">采用底层印刷，与面材过渡自然，封边整体效果完美</div>
						</div>
					</el-col>
					<el-col :xl="8" class="item">
						<img class="item-img" src="../assets/index_02.png" alt="">
						<div class="item-content">
							<div class="text-top">激光热风封边条</div>
							<div class="text-bottom">国内首家推出，主要用于ABS材料，厚度1mm以上效果更佳。 </div>
						</div>
					</el-col>
					<el-col :xl="8" class="item">
						<img class="item-img" src="../assets/index_03.png" alt="">
						<div class="item-content">
							<div class="text-top">PP封边条</div>
							<div class="text-bottom">PP是聚丙烯塑料简称，一般用于生产塑料杯、吸管、薄膜等</div>
						</div>
					</el-col>
				</el-row>
			</el-col>
		</el-row>
		<!-- 关于华立两列 -->
		<el-row :type="'flex'" :justify="'center'">
			<el-col :xl="16" :lg="22" :md="24" :sm="24" :xs="24">
				<el-row class="grid-content-about bg-purple">
					<img class="grid-content-img" src="../assets/index_about.png" alt="">
					<div class="text-container">
						<h1>关于华立</h1>
						<h3>ABOUT HUALI</h3>
						<p class="main-text elellipse">华立股份是国内首家突破德国技术垄断，生产有自主知识产权封边产品的厂家，拥有业内最全面的CNAS认证材料科学实验室，形成了包括环保型无铅配方、宽幅挤出及三辊压光技术、全面应用水溶性油墨、自动配色系统、等离子涂布等多项印刷核心技术体系...</p>
						<P class="operation-btn">了解更多&nbsp;→</P>
					</div>
				</el-row>
			</el-col>
		</el-row>
		<!-- 四行四列导航菜单 -->
		<el-row type="flex" justify="center">
			<!-- class="grid navs" -->
			<el-col :xl="16" :lg="20" :md="22" :sm="24" :xs="24" :span="24" class="col-grid">
				<el-row type="flex" justify="center" class="grid navs">
					<div class="grid-item" v-for="(item, index) in navImgs" :key="index" @mouseover="mouseoverImg(index)" @mouseout="mouseoutImg(index)">
						<i class="grid-item__img font_family" :class='item.class'></i>
						<!-- <img class="grid-item__img"
                 :src="item.url"
                 alt=""> -->
						<div style="text-align: center">
							<h4>{{item.title}}</h4>
							<h5>{{item.subtitle}}</h5>
						</div>
					</div>
				</el-row>
			</el-col>
		</el-row>
		<carousel></carousel>
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
						url: require('../assets/banner1.png'),
					},
					{
						url: require('../assets/banner2.png'),

					},
					{
						url: require('../assets/banner3.png'),

					},
					{
						url: require('../assets/banner4.jpg'),

					},
					{
						url: require('../assets/banner5.png'),
					}
				],
				navImgs: [{
						class: 'icon-img-icon',
						title: '公司概况',
						subtitle: "COMPANYPROFILE"
					},
					{
						class: 'icon-img-icon',
						title: '发展历程',
						subtitle: "COMPANYPROFILE"
					},
					{
						class: 'icon-img-icon',
						title: '企业文化',
						subtitle: "COMPANYPROFILE"
					},
					{
						class: 'icon-img-icon',
						title: '公司架构',
						subtitle: "COMPANYPROFILE"
					},
					{
						class: 'icon-img-icon',
						title: '荣誉资质',
						subtitle: "COMPANYPROFILE"
					},
					{
						class: 'icon-img-icon',
						title: '华立视频',
						subtitle: "COMPANYPROFILE"
					},
					{
						class: 'icon-img-icon',
						title: '全景漫游',
						subtitle: "COMPANYPROFILE"
					},
					{
						class: 'icon-img-icon',
						title: '华立基地',
						subtitle: "COMPANYPROFILE"
					}
				],
				originImgs: [],
				bannerHeight: 1000,
				screenWidth: 0,
			}
		},
		methods: {
			setSize: function() {
				this.bannerHeight = 638 / 1920 * this.screenWidth;
			},
			mouseoverImg(e) {
				console.log(e)
				this.navImgs[e].url = require('../assets/banner2.png');
				console.log(this.originImgs[e]);

			},
			mouseoutImg(e) {
				console.log(e)
				console.log(this.originImgs[e]);
				this.navImgs[e] = this.originImgs[e];
			}
		},
		mounted() {
			let [...imgs] = this.navImgs
			this.originImgs = imgs;
			// 首次加载时,需要调用一次
			this.screenWidth = window.innerWidth;
			this.setSize();
			// 窗口大小发生改变时,调用一次
			window.onresize = () => {
				this.screenWidth = window.innerWidth;
				this.setSize();
			}
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

	/* 图片自适应容器 */
	.img-responsive {
		display: block;
		height: auto;
		width: 100%;
	}

	.items {
		background: #fff;
		border-radius: 10px;
		position: relative;
		top: -4rem;
		z-index: 2;
		box-sizing: border-box;

		.item {
			width: 33.3%;
			/* height: 200px; */
			margin: 1.875rem 1.25rem;
			padding-right: 1.25rem;
			box-sizing: border-box;
			display: flex;
			flex-direction: row;
			justify-content: row;
			align-items: center;
			border-right: 1px solid #d4d4d4;

			&:last-child {
				border: none;
			}

		}

		.item-img {
			width: 7.5rem;
			height: 7.5rem;
		}

		.item-content {
			// height: 7.5rem;
			padding-left: 10px;
			padding-right: 40px;

			.text-top {
				font-size: 20px;
				font-weight: bold;
				margin-bottom: 1rem;
			}

			.text-bottom {
				color: #888888;
				line-height: 1.8;
			}
		}
	}

	.grid-content-about {
		position: relative;
		overflow: hidden;

		.grid-content-img {
			height: 100%;
			width: 50%;
		}

		.text-container {
			width: 50%;
			position: absolute;
			height: 100%;
			right: 0;
			top: 0;
			background: #4c91ef;
			padding: 4rem;
			color: #fff;
			font-size: 20px;
			box-sizing: border-box;

			h1 {
				font-size: 34px;
			}

			h3 {
				font-size: 26px;
			}

			.main-text {
				margin-top: 30px;
			}

			.operation-btn {
				margin-top: 70px;
				position: relative;
				width: auto;
				display: inline-block;
				z-index: 1;

				&:after {
					content: " ";
					position: absolute;
					bottom: 2px;
					left: 0;
					z-index: -1;
					width: 100%;
					height: 6px;
					background: #CD1E46;
				}
			}
		}
	}
	// 导航菜单
	.grid.navs {
		// display: flex;
		// flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		margin: 4rem auto;

		.grid-item {
			width: 16rem;
			height: 18rem;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
			border: 1px solid #c3c3c3;
			padding: 1.25rem 0;
			margin: 0.56rem;
			border-radius: 5px;

			&:hover {
				color: #fff;
				background: #4c91ef;

				.grid-item__img {
					color: #fff;
					font-size: 7rem;
				}
			}

			&__img {
				// width: 120px;
				// height: 120px;
				// background: #4c91ef;
				font-size: 6rem;
			}
		}
	}
</style>
