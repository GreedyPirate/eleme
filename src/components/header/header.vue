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
				<!-- v-if防止异步请求为undefined -->
				<div v-if="seller.supports" class="supports">
					<span class="sup-icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="sup-text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div v-if="seller.supports" class="support-count" @click="showDetail">
				<span class="count">{{seller.supports.length}}个</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div class="bulletin-wrapper">
			<span class="bulletin-icon"></span><span class="bulletin-text">{{seller.bulletin}}</span>
			<span class="icon-keyboard_arrow_right"></span>
		</div>
		<div class="back-avatar">
			<img :src="seller.avatar" width="100%" height="100%">
		</div>
		 <transition name="fade">
			<div class="seller-detail" v-show="detail">
				<div class="detail-wrapper clearfix">
					<div class="detail-main">
						<h1 class="name">{{seller.name}}</h1>
						<div class="star-wrapper">
							<star :size="48" :score="seller.score"></star>
						</div>
						<div>
							<detailTitle :text="'优惠信息'"></detailTitle>
						</div>
						<ul class="supports" v-if="seller.supports">
							<li class="supports-item" v-for="item in seller.supports">
								<span class="icon" :class="classMap[item.type]"></span>
								<span class="content">{{item.description}}</span>
							</li>
						</ul>
						<div>
							<detailTitle :text="'商家公告'"></detailTitle>
						</div>
						<div class="bulletin">
							<div class="content">
								{{seller.bulletin}}
							</div>
						</div>
					</div>
				</div>
				<div class="detail-close" @click="hideDetail">
					<i class="icon-close"></i>
				</div>
			</div>
		</transition>
	</div>
</template>

<script type="text/ecmascript-6">
	import detailTitle from '@/components/header/title'
	import star from '@/components/star/star'

    export default {
    	props:{
    		seller:{
    			type:Object
    		}
    	},
    	data() {
    		return {
    			detail:false
    		}
    	},
    	created() {
    		this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    	},
		methods:{
			showDetail() {
				this.detail = true;
			},
			hideDetail() {
				this.detail = false;
			}
		},
		components:{
			star,
			detailTitle
		}
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin"

	.header
		position:relative
		color:#fff
		background:rgba(7,17,27,0.5) // 给back-avatar半透明背景
		overflow :hidden // 去除溢出的阴影
		.content-wrapper
			position:relative
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
						font-weight: bold
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
			.support-count
				position:absolute
				right:-7px
				bottom:9px
				padding:0 16px
				height:48px
				line-height:48px
				border-radius:28px
				background-color:rgba(0,0,0,0.2)
				color:#FFF
				text-align: center
				font-size:20px
				transform: scale(0.5)
    			transform-origin: 0% 0%				
				.count
					font-size:10px
					vertical-align: top
				.icon-keyboard_arrow_right
					margin-left:2px
					font-size:10px
					line-height:24px
		.bulletin-wrapper
			position:relative
			height:28px
			line-height:28px
			padding:0 22px 0 12px
			white-space:nowrap
			overflow:hidden
			text-overflow:ellipsis
			background-color:rgba(7,17,27,0.2)
			// font-size:0 会让省略号消失
			.bulletin-icon
				display:inline-block
				width:22px
				height:12px
				margin-top:8px
				vertical-align: top
				bg-img('img/bulletin')
				background-size: 22px 12px
				background-repeat:no-repeat
			.bulletin-text
				margin:0 4px
				vertical-align: top
				font-size:12px
			.icon-keyboard_arrow_right
				position:absolute
				font-size:10px
				top:8px
				right:12px
		.back-avatar
			position:absolute
			top:0
			left:0
			z-index:-1 
			width:100% // 撑满整个header
			height:100%
			filter:blur(10px) // 模糊效果
		.seller-detail
			position fixed
			top:0
			left:0
			z-index 100
			width:100%
			height:100%
			overflow :auto
			backdrop-filter:blur(10px) // ios下可以实现模糊背景
			background-color:rgba(7,17,27,0.8)
			&.fade-enter-active, &.fade-leave-active 
				transition: opacity .5s
			&.fade-enter, .fade-leave-to 
				opacity: 0
			.detail-wrapper
				min-height 100%
				width 100%
				.detail-main
					margin-top 64px
					padding-bottom 64px
					.name
						text-align center
						line-height 16px
						font-size 16px
						font-weight 700
					.star-wrapper
						margin-top 16px
						padding 2px 0 // 设计稿高度48px, 图片高度20，(48/2 - 20)/2
						text-align center
					.title
						display flex
						width 80%
						margin 28px auto 24px auto
						.line
							flex 1
							position relative
							top -6px // 线在字体垂直居中，上移7px，6px+border-bottom
							border-bottom 1px solid rgba(255,255,255,0.2)
						.text
							font-size 14px
							line-height 14px
							font-weight 700
							padding 0 12px
					.supports
						width 80%
						margin 0 auto
						font-size 0
						.supports-item
							margin-bottom 12px
							padding 0 12px
							&:last-child
								margin-bottom 0
						.icon
							display inline-block
							margin-right 6px
							width 16px
							height 16px
							vertical-align top
							background-size 16px 16px
							background-repeat no-repeat
							&.decrease
								bg-img('img/decrease_2')
							&.discount
								bg-img('img/discount_2')
							&.guarantee
								bg-img('img/guarantee_2')
							&.invoice
								bg-img('img/invoice_2')
							&.special
								bg-img('img/special_2')
						.content
							font-weight 200
							font-size 12px
							line-height 16px
					.bulletin
						width 80%
						margin 0 auto
						.content
							padding 0 12px
							font-size 12px
							line-height 24px
							font-weight 200
			.detail-close
				position relative
				width 32px
				height 32px
				margin -64px auto 0 auto
				clear:both
				font-size 32px
												
</style>
