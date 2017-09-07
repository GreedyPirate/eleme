// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import seller from '@/components/seller/seller';
import goods from '@/components/goods/goods';
import ratings from '@/components/ratings/ratings';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueResource);

// 下面这行注释是eslint的局部语法，表示new一个匿名对象
/* eslint-disable no-new */

const routes = [
	{
	  path: '/', // 默认到goods
	  component: goods
	}, {
	  path: '/goods',
	  component: goods
	}, {
	  path: '/ratings',
	  component: ratings
	}, {
	  path: '/seller',
	  component: seller
	}
];

const router = new VueRouter({
  linkActiveClass: 'active',
  routes
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
