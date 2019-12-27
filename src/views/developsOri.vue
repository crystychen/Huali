<!-- 发展历程 -->
<template>
	<div class="container">
		<el-carousel :height="bannerHeight + 'px'" :autoplay="false" arrow="never" indicator-position="none">
			<el-carousel-item v-for="(item, index) in banner" :key="index">
				<img class="img-responsive" :src="item.url">
			</el-carousel-item>
		</el-carousel>
		<!-- 时间轴 -->
		<div class="text-center panel">
			<h4>致力于成为</h4>
			<h4>国际杰出的装饰复合材料供应商</h4>
		</div>
		<div class="timeling-container">
			<timeline></timeline>
		</div>
	</div>
</template>

<script>
	import carousel from '@/components/carousel.vue';
	import timeline from '@/components/timeline.vue';

	export default {
		name: 'Home',
		components: {
			carousel,
			timeline
		},
		data() {
			return {
				msg: 'Welcome to Your Vue.js App',
				banner: [{
					url: require('../assets/banner3.png'),
				}],
				originImgs: [],
				bannerHeight: 0,
				screenWidth: 0,
				banner3: [
					{
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
				console.log("")
				console.log(e)
				this.$refs.procarousel.setActiveItem(e)
			},
			proChange(e) {
				console.log(e)
				this.proActiveIndex = e
			}
		},
		mounted() {
			// this.$store.state.topNavActive = this.$route.path.slice(-1);  // 活跃菜单与当前路径对应
			this.setSize()
			
			$webfont.load(".container", "ac637fb5c0d94ae1aae2a2869480adf7", "SiYuanRegular");
		},
		watch: {
			// 监测store.state
			'$store.state.devicewidth': 'setSize'
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	/* 图片自适应容器 */
	.img-responsive {
		display: block;
		height: auto;
		width: 100%;
	}
	.panel {
		margin-top: 4.6875rem;
	}
	.text-center {
		text-align: center;

		h4 {
			font-size: 22px;
			font-weight: bold;
			color: #333333;
			line-height: 2;
		}
	}
	.timeling-container {
		padding-bottom: 3.125rem;
	}
</style>
