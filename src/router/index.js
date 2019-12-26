import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/index'
import UserInfo from '@/components/UserInfo'
import intros from '@/views/introduction'
import develops from '@/views/develops'
import culture from '@/views/culture'
import news from '@/views/news'
import product from '@/views/product'
import science from '@/views/science'
import protection from '@/views/protection'
import framework from '@/views/framework'
import honorary from '@/views/honorary'
import video from '@/views/video'
import base from '@/views/base'
import download from '@/views/download'

// 解决两次访问相同路由地址报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
	mode: 'hash',
	routes: [{
			path: '/',
			name: 'Home',
			component: Home
		},
		{
			path: '/intros/:id',
			name: 'intros',
			component: intros
		},
		{
			path: '/framework/:id',
			name: 'framework',
			component: framework
		},
		{
			path: '/honorary/:id',
			name: 'honorary',
			component: honorary
		},
		{
			path: '/video/:id',
			name: 'video',
			component: video
		},
		{
			path: '/base/:id',
			name: 'base',
			component: base
		}, {
			path: '/develops/:id',
			name: 'develops',
			component: develops
		},
		{
			path: '/culture/:id',
			name: 'culture',
			component: culture
		},
		{
			path: '/news/:id',
			name: 'news',
			component: news
		},
		{
			path: '/product/:id',
			name: 'product',
			component: product
		},
		{
			path: '/science/:id',
			name: 'science',
			component: science
		}, {
			path: '/protection',
			name: 'protection',
			component: protection
		},
		{
			path: '/download/:id',
			name: 'download',
			component: download
		},
		{
			path: '/strategy',
			name: 'strategy',
			component: () => import('@/views/talenet-strategy')
		},
		{
			path: '/network',
			name: 'network',
			component: () => import('@/views/network')
		},
		{
			path: '/contact',
			name: 'contact',
			component: () => import('@/views/contact')
		},
		{
			path: '/innovation',
			name: 'innovation',
			component: () => import('@/views/innovation')
		},
		{
			path: '/service/:id',
			name: 'service',
			component: () => import('@/views/service')
		},
		{
			path: '/partner/:id',
			name: 'partner',
			component: () => import('@/views/partner')
		},
		{
			path: '/cooperation',
			name: 'cooperation',
			component: () => import('@/views/cooperation')
		},
		{
			path: '/welfare/:id',
			name: 'welfare',
			component: () => import('@/views/welfare')
		},
		{
			path: '/government/:id',
			name: 'government',
			component: () => import('@/views/government')
		},
		{
			path: '/reports',
			name: 'reports',
			component: () => import('@/views/reports')
		},
		{
			path: '/staff/:id',
			name: 'staff',
			component: () => import('@/views/staff')
		},
		{
			path: '/feedback/:id',
			name: 'feedback',
			component: () => import('@/views/feedback')
		},
		{
			path: '/platform',
			name: 'platform',
			component: () => import('@/views/platform')
		},
		{
			path: '/recruit/:id',
			name: 'recruit',
			component: () => import('@/views/recruit')
		},
		{
			path: '/recruit/:id',
			name: 'recruit',
			component: () => import('@/views/recruit')
		},
		{
			path: '/map/:id',
			name: 'map',
			component: () => import('@/views/map')
		},
		{
			path: '/news-detail/:id',
			name: 'news-detail',
			component: () => import('@/views/news-detail')
		},
	]
})
