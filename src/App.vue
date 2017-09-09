<template>
	<div>
		<!-- :seller就是v-bind:seller,向子组件传数据 -->
		<v-header :seller="seller"></v-header>
	    <div class="tab border-1px">
	    	<div class="tab-item">
	    		<router-link to="/goods">商品</router-link>
	    	</div>
	    	<div class="tab-item">
	    		<router-link to="/ratings">评论</router-link>
	    	</div>
	    	<div class="tab-item">
	    		<router-link to="/seller">商家</router-link>
	    	</div>
	    </div>
	     <router-view></router-view>
	</div>
</template>

// 使用es6语法报错，必须加type
<script type="text/ecmascript-6">
	import header from './components/header/header.vue';

	// 定义返回状态玛的语义化变量
	const REQ_OK = 0, REQ_ERR = 1;

	export default {
		// 相当于在data对象里增加一个属性
		data() {
			return {
				seller:{}
			};
		},
		created() {
			this.$http.get('/api/seller').then((response) => {
				var data = response.body;
				if(data.errno === REQ_OK){
					this.seller = data.data;
					console.log(this.seller);
				}
			});
		},
	    components: {
	      'v-header': header
	    }
	};
</script>

// 一开始死活加载不出样式，是因为没有加 lang="stylus" rel="stylesheet/stylus"
<style lang="stylus" rel="stylesheet/stylus">

	@import 'common/stylus/index.styl'

	.tab
		display:flex
		width:100%
		height:40px
		line-height:40px
		border-1px(rgba(7,17,27,0.1))
		.tab-item
			flex:1
			text-align:center
			& > a
				display:block
				font-size:14px
				color:rgb(77,85,93)
				&.active
					color: rgb(240, 20, 20)
				
</style>
