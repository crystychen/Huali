<!-- 页脚 -->
<template>
	<el-footer :height="'auto'" class="footer">
		<el-row type="flex" justify="center">
			<el-col class="wrap">
				<el-row type="flex" justify="center" style="flex-wrap: wrap;" >
					<el-col :span="6" v-for="(item,index) in menu" :key="index" v-if="item.children.length">
						<div class="footer-title">
							{{item.title}}
							<i class="caret"></i>
						</div>
						<li v-for="child in item.children"  :index="'/'+String(child.id)"  :key="child.id" @click="clickMenu(child)">
							<!-- <a :href="child.link" v-if="child.link.length">{{child.title}}</a> -->
							<!-- :to="'/'+String(child.id)" -->
							<router-link :to="'/'+child.link+'/'+child.id">{{child.title}}</router-link>
						</li>
					</el-col>
				</el-row>
			</el-col>
		</el-row>

		<el-row type="flex" justify="center">
			<el-col :span="12">
				<div class="line"></div>
			</el-col>
		</el-row>
		<el-row type="flex" justify="center" class="website-row" style="">
			<!-- <div class="" > -->
			{{linkData.recordNum}}&nbsp;&nbsp;{{linkData.name}}
			<!-- </div> -->
		</el-row>
	</el-footer>
</template>
<script>
	export default {
		name: 'Footer',
		props: {
			menu: {
				type: Array,
				default: function() {
					return []
				}
			},
			linkData: {
				type: Object,
				default: function() {
					return {}
				}
			}
		},
		data() {
			return {

			}
		},
		methods: {
			clickMenu(e) {
				let type = e.type; // type: 0(栏目)， 4(图片)，3(产品)
				this.$store.state.topNavActive = "/" + String(e.id) || "/";
				this.$emit('getContent', e);
			},
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.footer {
		font-family: SourceHanSansCN-Regular;
	}
	.wrap {
		max-width: 60rem;
		/* width: 62.222222rem; */
	}

	.el-footer {
		width: 100%;
		background: #FAFAFA;
		padding: 0;
		font-size: 1rem;
		display: flex;
		flex-direction: column;
		/* align-items: center; */
		justify-content: center;
	}

	.footer-title {
		font-weight: bold;
		font-size: 18px;
		margin: 20px 0;
	}

	.footer-title>.caret {
		width: 8px;
		height: 8px;
		line-height: 100%;
		display: inline-block;
		border-top: 1px solid #000000;
		border-right: 1px solid #000000;
		transform: rotate(45deg);
		margin-left: -2px;
	}

	.footer-title.row {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: space-between;
	}

	.logo-icon {
		width: 30px;
		height: 30px;
	}

	.line {
		width: 100%;
		height: 30px;
		border-bottom: 1px solid #d4d4d4;
		position: relative;
		left: -10px;
	}

	.website-row {
		color: #646465;
		margin: 0;
		background: #CCCCCC;
		height: 3.333333rem;
		line-height: 3.333333rem;
		text-align: center;
		font-size: 14px;
	}
</style>
