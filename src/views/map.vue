<!-- 联系方式（地图） -->
<template>
	<div class="container">
		<el-carousel :height="bannerHeight + 'px'" :autoplay="false" arrow="never">
			<el-carousel-item v-for="(item, index) in banner" :key="index">
				<img class="img-responsive" :src="item.url">
			</el-carousel-item>
		</el-carousel>
		<div class="panel">
			<el-row type="flex" justify="center">
				<!-- <el-col class="row" :xl="18" :lg="22" :md="24" :sm="24" :xs="24"> -->
					<div class="media-left">
						<!-- 				<div class="list active">
							东莞市华立实业股份有限公司
						</div> -->
						<div class="list" :class="{'active': activeIndex == index}" v-for="(data, index) in contentData" :key="index"
						 @click="changeList(index)">
							{{data.title}}
						</div>
						<!-- <div class="list">
							华立股份运营中心
						</div>
						<div class="list">
							华立股份运营中心
						</div>
						<div class="list">
							华立股份运营中心
						</div> -->
					</div>
					<div class="media-right">
						<!-- $ref="map" -->
						<div class="map" id="map">
							<a href="https://map.baidu.com" target="_blank">
								<img  style="width: 100%" :src="data.clogo" v-if="activeIndex == index" v-for="(data, index) in contentData" :key="index"></img>
							</a>
						</div>
						<div class="media-bottom">
							<p v-html="data.content" v-if="activeIndex == index" v-for="(data, index) in contentData" :key="index"></p>
						</div>
					</div>
				<!-- </el-col> -->
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
					url: require('../assets/banner_contact.png')
				}],
				bannerHeight: 0,
				screenWidth: 0,
				id: 0,
				contents: "", // 内容
				contentData: "", // 内容数据数组 
				infos: "", // 栏目信息
				activeIndex: 0
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
			},
			// 切换左边栏目
			changeList(e) {
				this.activeIndex = e
			},
			initMap() {
				// var map = new BMap.Map("map"); // 创建Map实例
				// map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
				// //添加地图类型控件
				// map.addControl(new BMap.MapTypeControl({
				// 	mapTypes: [
				// 		BMAP_NORMAL_MAP,
				// 		BMAP_HYBRID_MAP
				// 	]
				// }));
				// map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
				// map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
				let map = new BMap.Map(this.$refs.map); // 创建Map实例 
				map.centerAndZoom(new BMap.Point(121.484222, 31.242478), 11); // 初始化地图,设置中心点坐标和地图级别 
				map.addControl(
					new BMap.MapTypeControl({
						//添加地图类型控件 
						mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
					})
				);
				map.setCurrentCity("上海"); // 设置地图显示的城市 此项是必须设置的 
				map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
			}
		},
		mounted() {
			// this.$store.state.topNavActive = this.$route.path; // 活跃菜单与当前路径对应
			this.setSize();
			let id = this.$route.params.id;
			this.id = id;
			this.getData(id);

			// this.initMap();

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
		margin: 5.625rem auto;

		.row {
			display: flex;
			flex-direction: row;
			align-items: center;
		}

		.media-right {
			width: 56.25rem;
			// height: 608px;
			background-color: #ffffff;
			box-shadow: 0px 10px 57px 3px rgba(7, 93, 222, 0.15);
			border-radius: 0px 8px 8px 8px;

			.map {
				height: 31.25rem;
				overflow: hidden;
				border: solid 10px #FFFFFF;
			}

			.media-bottom {
				padding: 1.875rem 3.125rem;
			}
		}

		.media-left {
			width: 21.25rem;
			// height: 320px;
			// box-shadow: 0px 10px 57px 3px rgba(7, 93, 222, 0.15);
			position: relative;
			overflow: visible;
			border-radius: 8px 0px 0px 8px;

			.list {
				width: 100%;
				height: 4.375rem;
				line-height: 4.375rem;
				border-radius: 8px 0px 0px 8px;
				  
				font-size: 1.333333rem;
				font-weight: normal;
				font-stretch: normal;
				letter-spacing: -1px;
				color: #333333;
				text-align: center;
				cursor: pointer;

				&.active {
					color: #FFFFFF;
					background-color: #4b91ef;
					box-shadow: 0px 10px 18px 2px rgba(7, 93, 222, 0.35);
				}
			}
		}

	}

	.panel-title {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.main-title {
			// width: 133px;
			height: 33px;
			  
			font-size: 34px;
			font-weight: normal;
			font-stretch: normal;
			line-height: 28px;
			letter-spacing: 0px;
			color: #ffffff;
		}

		.subtitle {
			// width: 186px;
			height: 15px;
			  
			font-size: 20px;
			font-weight: normal;
			font-stretch: normal;
			line-height: 28px;
			letter-spacing: -1px;
			color: #ffffff;
		}
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

	.infos-content {}

	.indicator-panel {
		margin: 3.75rem 0 3.6875rem 0;

	}

	.indicator-item {
		// max-width: 16.875rem;
		height: 21.875rem;

		box-sizing: border-box;
		width: 330px;
		background-color: #ffffff;
		box-shadow: 0px 0px 50px 0px rgba(89, 89, 89, 0.1);

		&__img {
			width: 20.625rem;
			height: 12.5rem;
			background-color: #ffffff;
			box-shadow: 0px 0px 80px 0px rgba(89, 89, 89, 0.1);

		}

		&__text {
			// width: 333px;
			 ;
			font-size: 18px;
			font-weight: normal;
			font-stretch: normal;
			line-height: 28px;
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

	.video {
		width: 100%;
		height: 100%;
		background: #CCCCCC;
	}

	.carousel-item-img {
		background: #FAFAFA;
		position: relative;
		overflow: hidden;
		margin: o auto;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;

		.grid-content-img {
			height: 100%;
			width: 50%;
			z-index: 1;
		}

		.text-container {
			width: 100%;
			max-width: 43.75rem;
			height: 100%;
			background: #4c91ef;
			padding: 2.8125rem 6.25rem;
			color: #fff;
			font-size: 20px;
			box-sizing: border-box;
			border-top-left-radius: 4px;
			border-bottom-left-radius: 4px;

			h1 {
				// width: 131px;
				height: 21px;
				  
				font-size: 22px;
				font-weight: normal;
				font-stretch: normal;
				letter-spacing: 0px;
				color: #ffffff;
			}


			.main-text {
				// width: 445px;
				height: 410px;
				 ;
				font-size: 18px;
				font-weight: normal;
				font-stretch: normal;
				line-height: 28px;
				letter-spacing: 0px;
				color: #ffffff;
				margin-top: 1.125rem;
			}

			.operation-btn {
				margin-top: 70px;
				position: relative;
				width: auto;
				display: inline-block;
				z-index: 1;
				font-size: 1.375rem;

				&:after {
					content: " ";
					position: absolute;
					bottom: 2px;
					left: 0;
					z-index: -1;
					height: 6px;
					width: 96%;
					background: #CD1E46;
				}
			}
		}
	}
</style>
