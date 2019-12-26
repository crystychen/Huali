<!-- 联系方式 -->
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
								联系方式
							</h5>
							<h6>CONTACT</h6>
						</div>
						<div class="panel-body">
							<div class="infos-content">
								<li>联系部门：公司证券部</li>
								<li>投资者专线：0769-83338072</li>
								<li>投资者信箱：investor@dghuafuli.com</li>
								<li>公司地址：广东省东莞市常平镇松柏塘村南花园路1号</li>
								<li>邮政编码：523561</li>
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
					url: require('../assets/banner_contact.png'),
				}],
				bannerHeight: 0,
				screenWidth: 0,
				banner3: [{
						url: require('../assets/banner1.png'),
					},
					{
						url: require('../assets/banner2.png'),

					},
					{
						url: require('../assets/banner3.png'),

					}
				],
				proActiveIndex: 0
			}
		},
		methods: {
			setSize: function() {
				let screenWidth = this.$store.state.devicewidth;
				this.bannerHeight = 480 / 1920 * screenWidth;
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
			}
		},
		mounted() {
			this.$store.state.topNavActive = this.$route.path; // 活跃菜单与当前路径对应
			this.setSize();

		},
		watch: {
			// 监测store.state
			'$store.state.devicewidth': 'setSize'
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
		margin: 6.25rem auto;

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
			font-stretch: normal;
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

	.panel-body {
		 ;
		font-size: 22px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 32px;
		letter-spacing: 0px;
		color: #333333;
		padding: 2.5rem 3.25rem;
		padding-bottom: 0;
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
		 ;
		font-size: 22px;
		font-weight: normal;
		letter-spacing: 0px;

		li {
			line-height: 32px;
			letter-spacing: 0px;
			color: #333333;
		}
	}
</style>
