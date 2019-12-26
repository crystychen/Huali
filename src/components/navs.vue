<template>
	<div>
		<nav id="nav" ref="nav">
			<div class="nav-item nav-item-logo logo">
				<img src="http://via.placeholder.com/88x46">
			</div>
			<div v-for="item in bookCatas" class="nav-item">
				<a v-if="item.url!=''" :href="item.url">{{ item.booktype }}</a>
				<a v-else href="##">{{ item.booktype }}</a>
				<ul v-if="item.url==''" class="dropdown">
					<li v-for="li in item.ul">
						<a v-if="li.url!=''" :href="li.url">{{ li.bookname }}</a>
					</li>
				</ul>
			</div>
		</nav>
		<button type="button" class="nav-btn" id="nav-btn" @click="clickNavBtn">
			<span></span>
			<span></span>
			<span></span>
		</button>
	</div>
</template>

<script>
	var status = 0; //当前隐藏还是显示状态,默认隐藏
	const nav = document.getElementById('nav');
	//淡入
	function fedeIn(opc, elem) //opc: opcity当前值,elem: 当前动画对象
	{
		elem.style.opacity = 0;
		elem.style.display = 'block';
		var upInterval = setInterval(function() {
			opc += 0.05;
			elem.style.opacity = opc;
			if (opc >= 1) {
				clearInterval(upInterval);
			}
		}, 50);
	}
	//淡出
	function fedeOut(opc, elem) //opc: opcity当前值,elem: 当前动画对象
	{
		elem.style.opacity = 1;
		var downInterval = setInterval(function() {
			opc -= 0.05;
			elem.style.opacity = opc;
			if (opc <= 0) {
				clearInterval(downInterval);
				elem.style.display = 'none';
			}
		}, 50);
	}
	export default {
		name: 'Navs',
		components: {
			// left: left
		},
		props: {
			
		},
		data() {
			return {
				bookCatas: [{
						'booktype': '经管',
						'url': 'http://book.dangdang.com/01.25.htm'
					},
					{
						'booktype': '文艺',
						'url': '',
						'ul': [{
								'bookname': '文学',
								'url': 'http://book.dangdang.com/01.05.htm'
							},
							{
								'bookname': '传记',
								'url': 'http://book.dangdang.com/01.38.htm'
							},
							{
								'bookname': '青春文学',
								'url': 'http://book.dangdang.com/01.01.htm'
							}
						]
					},
					{
						'booktype': '小说',
						'url': 'http://e.dangdang.com/classification_list_page.html?category=XS2&dimension=dd_sale&order=0'
					},
					{
						'booktype': '励志',
						'url': 'http://book.dangdang.com/01.21.htm'
					},
					{
						'booktype': '人文社科',
						'url': '',
						'ul': [{
								'bookname': '军事',
								'url': 'http://book.dangdang.com/01.27.htm'
							},
							{
								'bookname': '历史',
								'url': 'http://book.dangdang.com/01.36.htm'
							},
							{
								'bookname': '古籍',
								'url': 'http://book.dangdang.com/01.32.htm'
							}
						]
					},
					{
						'booktype': '科技',
						'url': '',
						'ul': [{
								'bookname': '计算机/网络',
								'url': 'http://book.dangdang.com/01.54.htm'
							},
							{
								'bookname': '科普读物',
								'url': 'http://book.dangdang.com/01.52.htm'
							},
							{
								'bookname': '建筑',
								'url': 'http://book.dangdang.com/01.55.htm'
							},
							{
								'bookname': '农业/林业',
								'url': 'http://category.dangdang.com/cp01.66.00.00.00.00.html'
							}
						]
					}
				],
			}
		},
		methods: {
			setSize: function() {
				this.bannerHeight = 638 / 1920 * this.screenWidth;
			},
			clickNavBtn() {
				if (status == 0) {
					status = 1;
					fedeIn(0, this.$refs.nav);

				} else {
					status = 0;
					fedeOut(1, this.$refs.nav)
				}
			}
		},
		mounted() {
			let [...imgs] = this.navImgs
			this.originImgs = imgs;
			// 首次加载时,需要调用一次
			this.screenWidth = window.innerWidth;
			this.setSize();

			window.onresize = function() { //窗口缩放触发事件
				this.screenWidth = window.innerWidth;
				this.setSize();
				var width = document.body.clientWidth //获取屏幕宽度
				if (width >= 768) {
					nav.style.display = 'flex';
					nav.style.opacity = 1;
				} else {
					nav.style.display = 'none';
					status = 0;
				}
			}

		}
	}
</script>

<style scoped>
	* {
		box-sizing: border-box;
	}

	html,
	body,
	div,
	ul,
	li,
	a {
		padding: 0;
		border: 0;
		margin: 0;
	}

	a {
		text-decoration: none;
		color: #000;
	}

	ul {
		clear: both;
		text-decoration: none;
		white-space: nowrap;
	}

	li {
		list-style: none;
	}

	.logo img {
		height: 46px;
		width: auto;
	}

	nav {
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: center;
		padding: 0 30px;
		background: darkgray;
	}

	nav>.nav-item {
		position: relative;
		padding: 20px 30px 20px 0;
	}

	nav .nav-item a {
		display: inline-block;
		width: 100%;
	}

	nav>.nav-item>a:visited {
		color: #000;
	}

	nav>.nav-item>a:hover,
	nav>.nav-item>a:focus {
		color: #fff;
	}

	nav>.nav-item>.dropdown {
		position: absolute;
		top: 50px;
		/*需根据需求来做调整*/
		left: 0;
		/* display: none; */
		border-radius: 3px;
		border: 1px solid darkgray;
	}

	@media all and (min-width: 768px) {
		nav>.nav-item>.dropdown {
			padding-top: 20px;
		}
	}

	nav>.nav-item:hover .dropdown {
		display: block;
	}

	.dropdown li a {
		padding: 10px 30px;
	}

	.dropdown>li>a:hover {
		color: darkgray;
	}

	nav .nav-item-form {
		flex: 1;
		-webkit-flex: 1;
		text-align: right;
		padding-right: 0;
	}

	nav form input,
	nav form button {
		padding: 6px 10px 6px;
	}

	.nav-btn {
		display: none;
		position: absolute;
		top: 15px;
		right: 15px;
		z-index: 99999;
		padding: 5px 5px 3px;
		cursor: pointer;
	}

	.nav-btn span {
		display: block;
		width: 15px;
		height: 2px;
		background: #000;
		margin-bottom: 2px;
	}

	@media all and (max-width: 768px) {
		nav {
			position: absolute;
			display: none;
			width: 100%;
			top: 0;
			right: 0;
			z-index: 99998;
			padding: 0 15px 30px;
		}

		nav>.nav-item {
			width: 100%;
		}

		nav form {
			flex: 1;
			text-align: left;
		}

		nav>.nav-item>.dropdown {
			position: relative;
			top: 0;
			left: 0;
			display: block;
			height: 0;
			overflow: hidden;
		}

		.dropdown li {
			padding: 10px 0px;
			font-size: 13px;
		}

		.dropdown li a {
			padding: 0;
		}

		nav>.nav-item {
			padding: 20px 0 0;
		}

		.dropdown>li>a:hover {
			color: dimgray;
		}

		nav>.nav-item:hover .dropdown {
			height: auto;
		}

		.nav-btn {
			display: inline-block;
		}
	}
</style>
<!-- const navBtn = document.getElementById('nav-btn');
const nav = document.getElementById('nav');
var status = 0; //当前隐藏还是显示状态,默认隐藏 -->
<!-- //淡入
// function fedeIn(opc, elem) //opc: opcity当前值,elem: 当前动画对象
// {
// elem.style.opacity = 0;
// elem.style.display = 'block';
// var upInterval = setInterval(function() {
// opc += 0.05;
// elem.style.opacity = opc;
// if (opc >= 1) {
// clearInterval(upInterval);
// }
// }, 50);
// }
// //淡出
// function fedeOut(opc, elem) //opc: opcity当前值,elem: 当前动画对象
// {
// elem.style.opacity = 1;
// var downInterval = setInterval(function() {
// opc -= 0.05;
// elem.style.opacity = opc;
// if (opc <= 0) { // clearInterval(downInterval); // elem.style.display='none' ; // } // }, 50); // } //
navBtn.onclick=function() { // if (status==0) { // status=1; // fedeIn(0, nav); // // } else { // status=0; //
 fedeOut(1, nav) // } // } // // window.onresize=function() { //窗口缩放触发事件 // var width=document.body.clientWidth
 //获取屏幕宽度 // if (width>= 768) {
	// nav.style.display = 'flex';
	// nav.style.opacity = 1;
	// } else {
	// nav.style.display = 'none';
	// status = 0;
	// }
	// }
