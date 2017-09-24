<template>
	<div class="cart-container">
		<div class="cart-left">
			<div class="icon">
				<div class="icon-wrapper" :class="{'highlight':totalPrice>0}">
					<i class="icon-shopping_cart" :class="{'highlight':totalPrice>0}"></i>
					<div class="count" v-show="totalCount>0">{{totalCount}}</div>
				</div>
			</div>
			<div class="price">￥{{totalPrice}}</div>
			<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
		</div>
		<div class="cart-right">
			<div class="minPrice" :class="priceStyle">
				{{priceContent}}
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
			},
			selectedFoods:{
				type:Array,
				default(){
					return [];
				}
			}
		},
		computed:{
			totalPrice() {
				let total = 0;
				this.selectedFoods.forEach((foods) => {
					total += foods.price * foods.count;
				});
				return total;
			},
			totalCount() {
				let total = 0;
				this.selectedFoods.forEach((foods) => {
					total += foods.count;
				});
				return total;
			},
			priceContent() {
				if(this.totalCount === 0){
					return `￥${this.minPrice}元起送`;
				}else if(this.totalPrice < this.minPrice){
					let needMoney = this.minPrice - this.totalPrice;
					return `还差${needMoney}元起送`;
				}else{
					return '去结算';
				}
			},
			priceStyle() {
				if(this.totalPrice < this.minPrice){
					return 'not-enough';
				}else{
					return 'enough';
				}
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
					&.highlight
						background-color rgb(0,160,220)
					.icon-shopping_cart
						line-height 44px
						font-size 24px
						color #80858a
						&.highlight
							color #FFF
					.count
						position absolute
						top 0
						right 0
						width 24px
						height 16px
						border-radius 16px
						line-height 16px
						text-align center
						background-color rgb(240,20,20)
						box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
						font-size 9px
						color #FFF
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
				font-size 12px
				font-weight 700
				color rgba(255,255,255,0.4)
				&.not-enough
					background-color #2b333b
				&.enough
					background-color #00b43c
					color #FFF
</style>
