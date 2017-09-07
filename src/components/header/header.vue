<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img :src="seller.avatar" width="64" height="64">
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="brand-name">{{seller.name}}</span>
				</div>
				<div class="desc">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<!-- v-if防止异步请求为undefined 
				<div v-if="seller.supports" v-for="item in seller.supports" class="support">
					<span class="sup-icon"></span>
					<span class="sup-text">{{item.description}}</span>
				</div>-->
				<div v-if="seller.supports" class="supports">
					<span class="sup-icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="sup-text">{{seller.supports[0].description}}</span>
				</div>
			</div>
		</div>
		<div class="bulletin-wrapper">
			
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
    export default {
    	props:{
    		seller:{
    			type:Object
    		}
    	},
    	created() {
    		this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    	}
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin"

	.header
		color:#fff
		background:#000
		.content-wrapper
			padding:24px 12px 18px 24px
			font-size:0
			.avatar
				// 并排用inline-block，为了解决空白，设置父元素font-size为0，同时调整子元素font-size
				display:inline-block
				vertical-align:top
				img
					border-radius:2px
			.content
				margin-left:16px
				display:inline-block
				.title
					margin:2px 0 8px 0
					.brand
						display:inline-block
						width:30px
						height:18px
						vertical-align: top	// 顶部对齐
						bg-img('img/brand')	// 传相对路径就行,webpack自动转base64
						background-size:30px 18px
						background-repeat:no-repeat
					.brand-name
						margin-left:6px
						font-size:16px // 字体也除以2了
						line-height:18px
				.desc
					margin-bottom:10px
					font-size:12px
					line-height:12px
					color:rgb(255,255,255)
				.supports
					.sup-icon
						display:inline-block
						width:12px
						height:12px
						vertical-align:top // 是字补上来了
						margin-right:4px
						background-size:12px 12px
						background-repeat:no-repeat
						&.decrease
							bg-img('img/decrease_1')
						&.discount
							bg-img('img/discount_1')
						&.guarantee
							bg-img('img/guarantee_1')
						&.invoice
							bg-img('img/invoice_1')
						&.special
							bg-img('img/special_1')
					.sup-text
						font-size:10px
						line-height:12px
						color:#FFF;
						
</style>
