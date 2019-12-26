<template>
	<div class="tab-content">
		<el-row class="content-list" type="flex" justify="flex-start">
			<el-col v-for="(project, index) in data.data" :key="index" class="card-container" :xl="8" :lg="8">
				<div class="card">
					<img class="card-img" :src="project.clogo"></img>
					<div class="card-content">
						<div class="card-content__title">
							{{project.title}}
						</div>
						<div class="card-content__body">
							{{project.summary}}
						</div>
					</div>
					<div class="card-btn" @click="viewMore(project.id)">More →</div>
				</div>
			</el-col>
		</el-row>
		<div class="pagination-wrap" style="" v-if="data.count">
			<div class="pagination">
				<div class="pagination__btn" @click="clickOne">首页</div>
				<el-pagination class="" :current-page.sync="currentPage" @current-change="pageChange" background layout="prev, pager, next"
				 :page-size="pageSize" :total="data.count">
				</el-pagination>
				<div class="pagination__btn" @click="clickLast">末页</div>
			</div>
		</div>
		<div v-else>暂无记录</div>
	</div>
</template>

<script>
	export default {
		name: 'cardContent',
		props: {
			data: {
				type: Object,
				// 对象或数组且一定会从一个工厂函数返回默认值
				default: function() {
					return {}
				}
			},

		},
		data() {
			return {
				msg: 'Welcome to Your Vue.js App',
				// bannerHeight: 1000,
				screenWidth: 0,
				pageSize: 3,
				currentPage: 1,
			}
		},
		methods: {
			// 查看更多
			viewMore(e) {
				console.log("查看更多", e);
				this.$emit('bindMore', e); // 向父组件传递事件
			},
			// 分页
			pageChange(e) {
				console.log("cardContent",e)
				this.currentPage = e;
				this.$emit('pageChange', e); // 向父组件传递事件
			},
			clickOne() {
				this.currentPage = 1;
				this.$emit('clickOnePage', this.currentPage); // 向父组件传递事件
			},
			clickLast() {
				this.currentPage = Math.ceil(this.data.count / this.pageSize);
				this.$emit('clickLastPage', this.currentPage); // 向父组件传递事件
			},
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
			cursor: pointer;
		}
	}
	
	//  分页组件覆盖
	.pagination-wrap /deep/ .el-pagination {
		padding: 10px 5px;
		padding-bottom: 20px;
	}
	
	.pagination-wrap /deep/ .el-pager li {
		min-width: 40px;
		height: 40px;
		line-height: 40px;
	}
	
	.pagination-wrap /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
		background-color: #409EFF;
		color: #FFF;
		border-radius: 50%;
		font-size: 22px;
		font-weight: normal;
		box-shadow: 0 4px 10px 6px #CAE2F9;
	}
	
	.pagination-wrap /deep/ .el-pagination.is-background .el-pager li {
		color: #D5D5D5;
		font-size: 22px;
		font-weight: normal;
		margin: 0 4px;
		background: none;
	}
	
	.pagination-wrap /deep/ .el-pagination .btn-next,
	.pagination-wrap /deep/ .el-pagination .btn-prev {
		background: none;
	}
	
	.pagination-wrap /deep/ .el-pagination .btn-next .el-icon,
	.pagination-wrap /deep/ .el-pagination .btn-prev .el-icon {
		display: block;
		font-size: 34px;
		font-weight: 100;
		color: #D5D5D5;
	}
	
	.pagination-wrap {
		text-align: center;
		// margin: 2.5rem 0;
	}
	
	.pagination {
		display: inline-flex;
		align-items: center;
	
		&__btn {
			border: 2px solid #D4D4D4;
			border-radius: 50px;
			font-size: 20px;
			color: #D5D5D5;
			padding: 6px 12px;
			letter-spacing: 2px;
			margin-bottom: 20px;
			;
	
		}
	}
</style>
