<template>
	<div class="subTabs">
		<el-tabs class="subTabs" v-model="activeName" type="card" @tab-click="handleTabClick" v-if="tabData.length">
			<el-tab-pane :label="tab.title" :name="String(tab.id)" v-for="(tab, index) in tabData" :key="index">
				<!-- <span slot="label">企业新闻</span> -->
				<!-- <card-content :data="subContentData" @bindMore="viewMore"></card-content> -->
			</el-tab-pane>
			<!-- 			<el-tab-pane label="PVC封边条" name="PVC">
				<card-content></card-content>
			</el-tab-pane>
			<el-tab-pane label="HM纸塑封边条" name="HM">
				<card-content></card-content>
			</el-tab-pane>
			<el-tab-pane label="PP封边条" name="PP">
				<card-content></card-content>
			</el-tab-pane>
			<el-tab-pane label="3D封边条" name="3D">
				<card-content></card-content>
			</el-tab-pane>
			<el-tab-pane label="激光/热风封边条" name="JR">
				<card-content></card-content>
			</el-tab-pane> -->
		</el-tabs>
		<card-content :data="contentData" @bindMore="viewMore" @clickLastPage="clickLast" @clickOnePage="clickOne" @pageChange="pageChange"></card-content>
	</div>
</template>

<script>
	import cardContent from '@/components/cardContent.vue';
	export default {
		name: 'customTab',
		components: {
			cardContent
		},
		props: {
			contentData: {
				type: Object,
				// 对象或数组且一定会从一个工厂函数返回默认值
				default: function() {
					return {}
				}
			},
			// activeName: {
			// 	type: String,
			// 	default: function() {
			// 		return ""
			// 	}
			// },
			tabData: {
				type: Array,
				default: function() {
					return []
				}
			}
		},
		computed: {
			// activeName: function () {
			//   return
			// }
		},
		data() {
			return {
				msg: 'Welcome to Your Vue.js App',
				// bannerHeight: 1000,
				screenWidth: 0,
				activeName: 0,
				tabId: 0,
				pageSize: 3
			}
		},
		methods: {
			// 查看更多
			viewMore(e) {
				// console.log("查看更多", e);
				this.$emit('bindMore', e); // 向父组件传递事件
			},
			handleTabClick(tab) {
				console.log("subTabClick", tab)
				console.log(tab);
				let name = tab.name;
				// 分页器重置
				this.currentPage = 1;
				// 数据重置并请求
				this.getSubContent(name);
				this.$store.state.activeProsId = String(name);
				this.$emit('subTabClick', tab);
			},
			getSubContent(id) {
				let url = '/api/contentCategory/category/';
				this.$axios.get(url + id, {
					params: {
						limit: this.pageSize,
						page: this.currentPage
					}
				}).then(res => {
					console.log(res.data);
					if (res.data.code == "00") {
						let infos = res.data.data.info;
						this.contentData = res.data.data.contents;
						// if (!infos.children.length) {
						// 	this.subTabs = [] 
						// 	return;
						// }
						// this.subTabs = infos.children; // tab数组 [ info.children]
						// this.infos = infos;
						// this.contents = res.data.data.contents;
						// this.activeFirstName = String(infos.id);
						// 通过父元素查询子节点
						// this.summary = content.summary
						// this.getParentData(infos.pid)
					}
				}, response => {
					console.log("error");
				});
			},
			// 分页
			pageChange(e) {
				console.log("tabs",e)
				console.log("activeName",this.activeName);
				this.currentPage = e;
				this.getSubContent(this.$store.state.activeProsId)
				
			},
			clickOne(e) {
				this.currentPage = e;
				console.log("tabs One", e)
				this.getSubContent(this.$store.state.activeProsId)
			},
			clickLast(e) {
				console.log("tabs Last", e)
				this.currentPage = e;
				this.getSubContent(this.$store.state.activeProsId)
			},
			setTabData() {

			},
			setContent() {

			}
		},
		mounted() {
			// 首次加载时,需要调用一次
			// this.screenWidth = window.innerWidth;
			// this.setSize();
			// // 窗口大小发生改变时,调用一次
			// window.onresize = () => {
			//   this.screenWidth = window.innerWidth;
			//   this.setSize();
			// }
			// this.activeName  = String(this.tabData.children[0].id);
			console.log("tabData", this.tabData)
			console.log("contentData", this.contentData)
		},
		watch: {
			"tabData": 'setTabData',
			"contentData": 'setContent'

		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.tab-content {
		.content-list {
			margin: 30px 0 50px 0;
			box-sizing: border-box;
		}
	}

	.card-container {
		margin: 20px;

		&:first-child {
			margin-left: 0;
		}

		&:last-child {
			margin-right: 0;
		}
	}

	.card {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		background: #FFFFFF;
		border-radius: 4px;
		box-shadow: -6px 0px 20px 10px #F9F9F9, //左边阴影
			0 -20px 60px 10px #F7F7F7, //顶部阴影
			0 20px 60px 10px #F7F7F7, //底部阴影
			6px 0px 20px 10px #F9F9F9; //右边阴影
		padding: 30px;



		&-img {
			width: 14.375rem;
			height: 14.375rem;
			border-radius: 6px;
			background: #4A92EF;
			margin: 20px 0 30px 0;
		}

		&-content {
			height: 11.25rem;
			flex: 1;
			text-align: center;
			padding: 0 1.25rem;

			&__title {
				font-weight: bold;
				font-size: 18px;
			}

			&__body {
				flex: 1;
				padding: 12px 0 20px 0;
				color: #797979;
				line-height: 1.8;
			}
		}

		.card-btn {
			color: #CD1E44;
			font-size: 18px;
		}
	}

	// 修改element ui样式
	// 	/* tab样式 */
	.subTabs /deep/ .el-tabs__nav-scroll {
		padding: 0 2.5rem;
	}

	.subTabs /deep/ .el-tabs--card>.el-tabs__header .el-tabs__item {
		margin: 20px 20px;
		border: none;
		font-weight: bold;
		font-size: 20px;
		width: auto;
		display: inline-block;
		height: 3.125rem;
		line-height: 3.125rem;
		text-shadow: none;
	}

	.subTabs /deep/ .el-tabs--card>.el-tabs__header .el-tabs__item:first-child {
		margin-left: 0;
	}

	.subTabs /deep/ .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
		background: #4B94EE;
		color: #FFFFFF;
		border-radius: 6px;
		box-shadow: 0px 4px 15px 4px #B4CFF5; //1.水平阴影  2.垂直阴影 3.模糊距离，改虚实 4.阴影尺寸
	}

	.subTabs /deep/ .el-tabs--card>.el-tabs__header {
		border: none;
		background: #FFFFFF;
		border-radius: 4px;
		box-shadow: -6px 0px 20px 10px #F9F9F9, //左边阴影
			0 -20px 60px 10px #FDFDFD, //顶部阴影
			0 20px 60px 10px #FDFDFD, //底部阴影
			6px 0px 20px 10px #F9F9F9; //右边阴影
		// box-shadow: 10px 10px 15px 20px #FAFAFA; //1.水平阴影  2.垂直阴影 3.模糊距离，改虚实 4.阴影尺寸
	}

	.subTabs /deep/ .el-tabs--card>.el-tabs__header .el-tabs__nav {
		border: none;
	}

	.subTabs /deep/ .el-tabs__content {
		// padding: 20px 0;
		overflow: visible;
	}

	.subTabs /deep/ .el-tabs__nav-next,
	.subTabs /deep/ .el-tabs__nav-prev {
		line-height: 80px;
	}
</style>
