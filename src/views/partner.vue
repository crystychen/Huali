<!-- 合作伙伴 -->
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
							<h6>PARTNERS</h6>
						</div>
						<div class="text-content" v-if="contentData.length">
							<p v-html="contentData[0].content"></p>
							<!-- 							<li>
								<p class="">
									让客户满意就是我们的一切，华立股份携手与客户共创未来！
								</p>
							</li>
							<li>
								<p class="">
									公司凭借强硬的实力、先进创新的生产能力及完善的服务体系，先后与索菲亚、欧派、好莱客、全友、健威、宜家等公司建立了长期战略合作关系！
								</p>
							</li> -->
						</div>
					</div>
				</el-col>
			</el-row>
			<el-row type="flex" justify="center">
				<el-col :xl="16" :lg="22" :md="24" :sm="24" :xs="24">
					<div class="panel-content">
						<el-row class="panel-body partner-body" type="flex" justify="start">
							<el-col v-for="(item, index) in partners" :key="index" @mouseover.native="mouseoverPartImg(index)"
							 @mouseout.native="mouseoutPartImg(index)" class="partner-body-item el-col-sm-4-8 el-col-md-4-8 el-col-lg-4-8 el-col-xl-4-8">
								<a href="https://www.baidu.com" target="_blank">
									<img class="img-responsive" style="width: 143px;height:83px" :src="item.img"></img>
								</a>
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
				msg: 'Welcome to Your Vue.js App',
				banner: [{
					url: require("../assets/banner_service.jpg")
				}],
				bannerHeight: 0,
				screenWidth: 0,
				partners: [],
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
			mouseoverPartImg(e) {
				console.log(e)
				console.log(this.partners)
				this.partners[e].img = "/static/imgs/part_logo/彩色logo_" + (e + 1) + ".png";

			},
			mouseoutPartImg(e) {
				console.log(e)
				console.log(this.partners)
				this.partners[e].img = "/static/imgs/part_logo/灰色LOGO_" + (e + 1) + ".png";
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
			this.getPartners()

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
				list-style: none;
				 ;
				font-size: 22px;
				font-weight: normal;
				font-stretch: normal;
				line-height: 32px;
				letter-spacing: 0px;
				color: #333333;
				margin: 0;
				max-width: 64.375rem;

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
				width: 6.5rem;
				height: 5.875rem;
			}
		}

		.item-title {
			height: 27px;
			  
			font-size: 28px;
			font-weight: normal;
			font-stretch: normal;
			line-height: 22px;
			letter-spacing: -1px;
			color: #333333;
			margin-top: 2.75rem;
		}

		.item-content {
			// width: 17.375rem;
			text-align: left;
			// padding: 1.875rem 1.25rem;
			box-sizing: border-box;
			 ;
			font-size: 18px;
			font-weight: normal;
			font-stretch: normal;
			line-height: 30px;
			letter-spacing: 0px;
			color: #333333;
			margin-top: 1.25rem;
		}
	}

	// 合作伙伴
	.partner-body {
		flex-wrap: wrap;

		.partner-body-item {
			border-right: 1px solid #CCCCCC;
			border-bottom: 1px solid #CCCCCC;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;
			padding: 20px;

			&:hover {
				cursor: pointer;
			}
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
