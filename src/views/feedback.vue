<!-- 留言反馈 -->
<template>
	<div class="container">
		<el-carousel :height="bannerHeight + 'px'" :autoplay="false" arrow="never" indicator-position="none">
			<el-carousel-item v-for="(item, index) in banner" :key="index">
				<img class="img-responsive" :src="item.url">
			</el-carousel-item>
		</el-carousel>
		<div class="panel">
			<el-row type="flex" justify="center" style="align-items: center;">
				<!-- <el-col class="row" :xl="18" :lg="22" :md="24" :sm="24" :xs="24"> -->
				<div class="form">
					<form class="" @submit.prevent="formSubmit">
						<div class="form-inline">
							<div class="form-group">
								<label for="name">姓名</label>
								<input class="input" name="name" type="text" v-model="formMess.name" />
							</div>
							<div class="form-group">
								<label for="name">电话</label>
								<input class="input" name="mobile" type="tel" v-model="formMess.mobile" />
							</div>
						</div>
						<div class="form-group">
							<label for="name">邮箱</label>
							<input class="input" name="email" type="email" v-model="formMess.email" />
						</div>
						<div class="form-group">
							<label for="name">留言内容</label>
							<textarea class="textarea" name="remark" rows="3" v-model="formMess.remark"></textarea>
						</div>
						<button class="btn" @click="">
							<span class="btn-text">确认提交</span>
						</button>
					</form>
				</div>
				<div class="message panel-title">
					<div class="main-title">留言反馈</div>
					<div class="subtitle">MESSAGE FEEDBACK</div>
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
				proActiveIndex: 0,
				formMess: {
					"name": "",
					"email": "",
					"remark": "",
					"mobile": ""
				}

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
			},
			formSubmit() {
				let url = "/api/msgfeedback/add";
				// let formData = new FormData();
				// for (var key in this.formMess) {
				// 	formData.append(key, this.formMess[key]);
				// }
				// 
				// console.log("forma", formData)
				console.log("this.formMess", this.formMess)
				// return;
				this.$axios.get(url, {
					params: this.formMess
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "00") {
						this.formMess = {
							"name": "",
							"email": "",
							"remark": "",
							"mobile": ""
						}
					}
				}, response => {
					console.log("error");
				});
			},
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
		font-size: 1rem;
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

		.form {
			padding: 3.125rem 4.375rem;
			width: 880px;
			height: 608px;
			background-color: #ffffff;
			box-shadow: 0px 10px 57px 3px rgba(7, 93, 222, 0.15);
			box-sizing: border-box;

			.form-inline {
				display: flex;
				flex-direction: row;
				align-items: center;

				.form-group {
					margin-right: 3.75rem;

					.input {
						width: 280px;
					}
				}
			}
		}

		.message {
			width: 320px;
			height: 320px;
			background-color: #4b91ef;
			box-shadow: 0px 10px 57px 3px rgba(7, 93, 222, 0.15);
			position: relative;
			left: -3.875rem;
		}

	}

	.form-group {
		margin: 0.9375rem 0;

		label {
			display: block;
			height: 18px;
			;
			font-size: 1rem;
			font-weight: normal;
			font-stretch: normal;
			line-height: 28px;
			letter-spacing: -1px;
			color: #555555;
			margin-bottom: 0.625rem;
		}

		.input {
			width: 38.75rem;
			height: 60px;
			background-color: #f5f6f8;
			border-radius: 6px;
			border: none;
			padding: 0 10px;
		}

		.textarea {
			width: 38.75rem;
			height: 8.75rem;
			background-color: #f5f6f8;
			border-radius: 6px;
			border: none;
			padding: 10px;
		}
	}

	.btn {
		width: 210px;
		height: 50px;
		background-color: #4b91ef;
		box-shadow: 6px 8px 25px 0px rgba(7, 93, 222, 0.25);
		border-radius: 25px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border: none;
		// margin: 3.125rem 0;
	}

	.btn-text {
		width: 5.333333rem;
		font-size: 1.333333rem;
		font-weight: bold;
		line-height: 1.555555rem;
		letter-spacing: 0px;
		color: #ffffff;
		text-shadow: 0px 0px 10px rgba($color: #ffffff, $alpha: 0.75);
	}

	.panel-title {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.main-title {
			// width: 133px;
			height: 1.833333rem;
			font-size: 1.888888rem;
			font-weight: bold;
			line-height: 1;
			letter-spacing: 0px;
			color: #ffffff;
			font-family: SourceHanSansCN-Bold;
		}

		.subtitle {
			// width: 186px;
			height: 0.833333rem;
			font-size: 1.111111rem;
			font-weight: bold;
			line-height: 1;
			letter-spacing: -1px;
			color: #ffffff;
			margin-top: 0.666666rem;
			font-family: SourceHanSansCN-Bold;
		}
	}

	.infos-title {
		height: 24px;

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
			font-size: 1rem;
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
			font-size: 1.111111rem;
			box-sizing: border-box;
			border-top-left-radius: 4px;
			border-bottom-left-radius: 4px;

			h1 {
				// width: 131px;
				height: 21px;

				font-size: 1.222222rem;
				font-weight: normal;
				font-stretch: normal;
				letter-spacing: 0px;
				color: #ffffff;
			}


			.main-text {
				// width: 445px;
				height: 410px;
				;
				font-size: 1rem;
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
