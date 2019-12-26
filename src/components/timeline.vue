<template>
	<section id="cd-timeline" class="cd-container">
		<div class="cd-timeline-block">
			<div class="cd-timeline-img cd-picture">
				<div class="point"></div>
			</div><!-- cd-timeline-img -->

			<div class="cd-timeline-content">
				<div class="media-content" style="">
					<h2>1995</h2>
					<p>1995年谭洪汝先生创立东莞市华立实业有限公司</p>
				</div>
				<!-- <a href="#" class="cd-read-more">阅读更多</a> -->
				<img style="" class="media-img" src="../../build/logo.png"></img>
				<!-- <span class="cd-date">Jan 14</span> -->
			</div> <!-- cd-timeline-content -->
		</div> <!-- cd-timeline-block -->
		<div class="cd-timeline-block">
			<div class="cd-timeline-img cd-picture">
				<div class="point"></div>
			</div><!-- cd-timeline-img -->
		
			<div class="cd-timeline-content">
				<div class="media-content" style="">
					<h2>1995</h2>
					<p>1995年谭洪汝先生创立东莞市华立实业有限公司</p>
				</div>
				<!-- <a href="#" class="cd-read-more">阅读更多</a> -->
				<img style="" class="media-img" src="../../build/logo.png"></img>
				<!-- <span class="cd-date">Jan 14</span> -->
			</div> <!-- cd-timeline-content -->
		</div> <!-- cd-timeline-block -->
		<div class="cd-timeline-block">
			<div class="cd-timeline-img cd-picture">
				<div class="point"></div>
			</div><!-- cd-timeline-img -->
		
			<div class="cd-timeline-content">
				<div class="media-content" style="">
					<h2>1995</h2>
					<p>1995年谭洪汝先生创立东莞市华立实业有限公司</p>
				</div>
				<img style="" class="media-img" src="../../build/logo.png"></img>
			</div> <!-- cd-timeline-content -->
		</div> <!-- cd-timeline-block -->
		<div class="extra">
			FUTURE
		</div>
	</section> <!-- cd-timeline -->
</template>

<script>
	export default {
		name: 'timeline',
		props: ['banner', 'bannerHeight', 'arrow', 'indicatorPosition'],
		data() {
			return {
				msg: 'Welcome to Your Vue.js App',
				screenWidth: 0,
			}
		},
		methods: {

		},
		mounted() {

		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	/* 	html * {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	*,
	*:after,
	*:before {
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		list-style: none;
		border: none;
	}

	body {
		font-size: 100%;
		font-family: "Microsoft yahei", serif;
		color: #7f8c97;
		background-color: #e9f0f5;
	} */

	/* 	a {
		color: #acb7c0;
		text-decoration: none;
		font-family: "Microsoft yahei", sans-serif;
	} */

	/* 	img {
		max-width: 100%;
	} */

	/* 	h1,
	h2 {
		font-family: "Microsoft yahei", sans-serif;
		font-weight: bold;
	} */

	/* -------------------------------- 
		
		Modules - reusable parts of our design
		
		-------------------------------- */
	.cd-container {
		/* this class is used to give a max-width to the element it is applied to, and center it horizontally when it reaches that max-width */
		width: 90%;
		max-width: 1170px;
		margin: 0 auto;
	}

	.cd-container::after {
		/* clearfix */
		content: '';
		display: table;
		clear: both;
	}

	/* -------------------------------- 
		
		Main components 
		
		-------------------------------- */
	/* 	header {
		height: 200px;
		line-height: 200px;
		text-align: center;
		background: #303e49;
	}

	header h1 {
		color: #ffffff;
		font-size: 18px;
		font-size: 1.125rem;
	} 
	*/

	@media only screen and (min-width: 1170px) {
		header {
			height: 300px;
			line-height: 300px;
		}

		header h1 {
			font-size: 24px;
			font-size: 1.5rem;
		}
	}

	#cd-timeline {
		position: relative;
		padding: 2em 0;
		margin-top: 2em;
		margin-bottom: 2em;
	}

	#cd-timeline::before {
		/* this is the vertical line */
		content: '';
		position: absolute;
		top: 0;
		left: 12px;
		height: 100%;
		width: 1px;
		background: #d4d4d4;
	}

	#cd-timeline::after {
		/* this is the vertical line */
		content: '';
		position: absolute;
		top: -15px;
		left: 5px;
		height: 15px;
		width: 15px;
		border-radius: 50%;
		box-sizing: border-box;
		border: 1px solid #CCCCCC;
	}
	#cd-timeline::after::after {
		/* this is the vertical line */
		content: '*';
		position: absolute;
		bottom: -12px;
		left: 5px;
		height: 14px;
		width: 14px;
		color: #CCCCCC;
		background: red;
		border-radius: 50%;
		box-sizing: border-box;
		border: 1px solid #CCCCCC;
	}
	
	.extra {
		position: absolute;
	}

	@media only screen and (min-width: 1170px) {
		#cd-timeline {
			margin-top: 3em;
			margin-bottom: 3em;
		}

		#cd-timeline::before {
			left: 50%;
			margin-left: -2px;
		}

		#cd-timeline::after {
			left: 50%;
			margin-left: -9px;
		}
		
		.extra {
			left: 50%;
			bottom: -30px;
			/* margin-left: -40px; */
			transform: translateX(-50%);
			color: #D4D4D4;
			font-size: 0.875rem;
		}
	}

	.cd-timeline-block {
		position: relative;
		margin: 2em 0;
	}

	.cd-timeline-block:after {
		content: "";
		display: table;
		clear: both;
	}

	.cd-timeline-block:first-child {
		margin-top: 0;
	}

	.cd-timeline-block:last-child {
		margin-bottom: 0;
	}

	@media only screen and (min-width: 1170px) {
		.cd-timeline-block {
			margin: 4em 0;
		}

		.cd-timeline-block:first-child {
			margin-top: 0;
		}

		.cd-timeline-block:last-child {
			margin-bottom: 0;
		}
	}

	.cd-timeline-img {
		position: absolute;
		top: 0;
		left: 0;
		border-radius: 50%;
		border: 1px solid #CE1F47;
		padding: 2px;
		margin-left: 4px;
	}

	.cd-timeline-img .point {
		display: block;
		width: 10px;
		height: 10px;
		position: relative;
		border-radius: 50%;
		background: #CE1F47;
	}


	@media only screen and (min-width: 1170px) {
		.cd-timeline-img {
			left: 50%;
			margin-left: -10px;
			-webkit-transform: translateZ(0);
			-webkit-backface-visibility: hidden;
		}

		.cssanimations .cd-timeline-img.is-hidden {
			visibility: hidden;
		}

		.cssanimations .cd-timeline-img.bounce-in {
			visibility: visible;
			-webkit-animation: cd-bounce-1 0.6s;
			-moz-animation: cd-bounce-1 0.6s;
			animation: cd-bounce-1 0.6s;
		}
	}

	@-webkit-keyframes cd-bounce-1 {
		0% {
			opacity: 0;
			-webkit-transform: scale(0.5);
		}

		60% {
			opacity: 1;
			-webkit-transform: scale(1.2);
		}

		100% {
			-webkit-transform: scale(1);
		}
	}

	@-moz-keyframes cd-bounce-1 {
		0% {
			opacity: 0;
			-moz-transform: scale(0.5);
		}

		60% {
			opacity: 1;
			-moz-transform: scale(1.2);
		}

		100% {
			-moz-transform: scale(1);
		}
	}

	@keyframes cd-bounce-1 {
		0% {
			opacity: 0;
			-webkit-transform: scale(0.5);
			-moz-transform: scale(0.5);
			-ms-transform: scale(0.5);
			-o-transform: scale(0.5);
			transform: scale(0.5);
		}

		60% {
			opacity: 1;
			-webkit-transform: scale(1.2);
			-moz-transform: scale(1.2);
			-ms-transform: scale(1.2);
			-o-transform: scale(1.2);
			transform: scale(1.2);
		}

		100% {
			-webkit-transform: scale(1);
			-moz-transform: scale(1);
			-ms-transform: scale(1);
			-o-transform: scale(1);
			transform: scale(1);
		}
	}

	.cd-timeline-content {
		position: relative;
		margin-left: 60px;
		background: #ffffff;
	}

	.cd-timeline-content:after {
		content: "";
		display: table;
		clear: both;
	}

	.cd-timeline-content p {
		margin: 1em 0;
		line-height: 1.6;
		font-size: 13px;
		font-size: 0.8125rem;
	}

	.cd-timeline-content .media-content {
		padding: .8em 1em;
		float: right;
		text-align: right;
		max-width: 18.75rem;
		h2 {
			font-size: 3rem;
			font-weight: bold;
			font-family: "bodoni mt black";
			color: #333333;
		}
		p {
			font-size: 1.125rem;
			color: #333333;
		}
	}

	.cd-timeline-content .media-img {
		width: 9.375rem;
		height: 9.375rem;
		border-radius: 50%;
		float: left;
		/* background: #D4D4D4; */
	}


	@media only screen and (min-width: 768px) {
		.cd-timeline-content h2 {
			font-size: 48px;
			font-size: 3rem;
		}

		.cd-timeline-content p {
			font-size: 18px;
			font-size: 1.125rem;
		}

	}

	@media only screen and (min-width: 1170px) {
		.cd-timeline-content {
			margin-left: 0;
			width: 48%;
		}

		.cd-timeline-content::before {
			top: 24px;
			left: 100%;
			border-color: transparent;
			border-left-color: #ffffff;
		}

		.cd-timeline-block:nth-child(even) .cd-timeline-content {
			float: right;
		}

	/* 	.cd-timeline-block:nth-child(even) .cd-timeline-content::before {
			top: 24px;
			left: auto;
			right: 100%;
			border-color: transparent;
			border-right-color: #ffffff;
		} */

		.cd-timeline-block:nth-child(even) .cd-timeline-content .media-img {
			float: right;
		}
		.cd-timeline-block:nth-child(even) .cd-timeline-content .media-content {
			float: left;
			text-align: left;
		}


		.cssanimations .cd-timeline-content.is-hidden {
			visibility: hidden;
		}

		.cssanimations .cd-timeline-content.bounce-in {
			visibility: visible;
			-webkit-animation: cd-bounce-2 0.6s;
			-moz-animation: cd-bounce-2 0.6s;
			animation: cd-bounce-2 0.6s;
		}
	}

	@media only screen and (min-width: 1170px) {

		/* inverse bounce effect on even content blocks */
		.cssanimations .cd-timeline-block:nth-child(even) .cd-timeline-content.bounce-in {
			-webkit-animation: cd-bounce-2-inverse 0.6s;
			-moz-animation: cd-bounce-2-inverse 0.6s;
			animation: cd-bounce-2-inverse 0.6s;
		}
	}

	@-webkit-keyframes cd-bounce-2 {
		0% {
			opacity: 0;
			-webkit-transform: translateX(-100px);
		}

		60% {
			opacity: 1;
			-webkit-transform: translateX(20px);
		}

		100% {
			-webkit-transform: translateX(0);
		}
	}

	@-moz-keyframes cd-bounce-2 {
		0% {
			opacity: 0;
			-moz-transform: translateX(-100px);
		}

		60% {
			opacity: 1;
			-moz-transform: translateX(20px);
		}

		100% {
			-moz-transform: translateX(0);
		}
	}

	@keyframes cd-bounce-2 {
		0% {
			opacity: 0;
			-webkit-transform: translateX(-100px);
			-moz-transform: translateX(-100px);
			-ms-transform: translateX(-100px);
			-o-transform: translateX(-100px);
			transform: translateX(-100px);
		}

		60% {
			opacity: 1;
			-webkit-transform: translateX(20px);
			-moz-transform: translateX(20px);
			-ms-transform: translateX(20px);
			-o-transform: translateX(20px);
			transform: translateX(20px);
		}

		100% {
			-webkit-transform: translateX(0);
			-moz-transform: translateX(0);
			-ms-transform: translateX(0);
			-o-transform: translateX(0);
			transform: translateX(0);
		}
	}

	@-webkit-keyframes cd-bounce-2-inverse {
		0% {
			opacity: 0;
			-webkit-transform: translateX(100px);
		}

		60% {
			opacity: 1;
			-webkit-transform: translateX(-20px);
		}

		100% {
			-webkit-transform: translateX(0);
		}
	}

	@-moz-keyframes cd-bounce-2-inverse {
		0% {
			opacity: 0;
			-moz-transform: translateX(100px);
		}

		60% {
			opacity: 1;
			-moz-transform: translateX(-20px);
		}

		100% {
			-moz-transform: translateX(0);
		}
	}

	@keyframes cd-bounce-2-inverse {
		0% {
			opacity: 0;
			-webkit-transform: translateX(100px);
			-moz-transform: translateX(100px);
			-ms-transform: translateX(100px);
			-o-transform: translateX(100px);
			transform: translateX(100px);
		}

		60% {
			opacity: 1;
			-webkit-transform: translateX(-20px);
			-moz-transform: translateX(-20px);
			-ms-transform: translateX(-20px);
			-o-transform: translateX(-20px);
			transform: translateX(-20px);
		}

		100% {
			-webkit-transform: translateX(0);
			-moz-transform: translateX(0);
			-ms-transform: translateX(0);
			-o-transform: translateX(0);
			transform: translateX(0);
		}
	}
</style>
