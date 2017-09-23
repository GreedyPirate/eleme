<template>
	<div class="cart-container">
		<div class="cart-left">
			<div class="icon">
				<div class="icon-wrapper">
					<i class="icon-shopping_cart"></i>
				</div>
			</div>
			<div class="price">￥0</div>
			<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
		</div>
		<div class="cart-right">
			<div class="minPrice">
				￥{{minPrice}}元起送
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
    export default {
		props:{
			// App.vue->goods.vue->cart.vue
			deliveryPrice:{
				type:Number,
				default:0
			},
			minPrice:{
				type:Number,
				default:0
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	.cart-container
		position fixed
		left 0px
		bottom 0px
		width 100%
		height 48px
		display flex
		z-index 100
		.cart-left
			flex 1
			// 下面都是inline-block，解决空隙
			font-size 0
			background-color #141d27
			.icon
				display inline-block
				position relative
				top -10px
				width 56px
				height 56px
				border-radius 50%
				margin 0 12px
				padding 6px
				box-sizing border-box
				background-color #141d27
				.icon-wrapper
					width 100%
					height 100%
					text-align center
					border-radius 50%
					background-color #2b343c
				.icon-shopping_cart
					line-height: 44px;
					font-size 24px
					color #80858a
			.price
				display inline-block
				vertical-align top
				margin-top 12px
				padding-right 12px
				box-sizing border-box
				line-height 24px
				border-right 1px solid rgba(255,255,255,0.1)
				font-size 16px
				font-weight 700
				color rgba(255,255,255,0.4)
			.desc 
				display inline-block
				vertical-align top
				margin-left 12px
				margin-top 12px
				font-size 10px
				line-height 24px
				color rgba(255,255,255,0.4)
		.cart-right
			flex 0 0 105px
			width 105px	
			.minPrice
				width 100%
				height 48px
				text-align center
				line-height 48px
				background-color #2b333b
				font-size 12px
				font-weight 700
				color rgba(255,255,255,0.4)
</style>
