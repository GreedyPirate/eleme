<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li v-for="(item,index) in goods" class="cate-item" :class="{current:currentIndex === index}" @click="selectMenu(index)">
					<span class="cate-text">
						<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foodWrapper">
			<ul>
				<li v-for="item in goods" class="food-list-hook">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li class="food-item border-1px" v-for="food in item.foods">
							<div class="icon">
								<img width="57" height="57" :src="food.icon">
							</div>
							<div class="detail">
								<h2 class="name">{{food.name}}</h2><span class="desc">{{food.description}}</span>
								<div class="extra">
									<span class="count">月售{{food.sellCount}}份</span><span class="praise">好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
								</div>
							</div>
							<div class="control">
								<controlpair :food="food"></controlpair>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<cart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectedFoods="selectedFoods"></cart>
	</div>
</template>
<script type="text/ecmascript-6">
	import BScroll from "better-scroll"
	import cart from "@/components/cart/cart"
	import controlpair from '@/components/controlpair/controlpair'

	const REQ_OK = 0, REQ_ERR = 1;

    export default {
		props:{
			// 从App.vue的router-view里传进来的
			seller:{
				type:Object
			}
		},
		components:{
			cart,
			controlpair
		},
		data() {
			return {
				goods:[],
				listHeights:[],
				scrollY:0
			};
		},
		computed:{
			currentIndex() {
				for(let i=0, len=this.listHeights.length; i<len; i++){
					let floor = this.listHeights[i];
					let ceiling = this.listHeights[i+1];
					if(this.scrollY >= floor && this.scrollY < ceiling){
						return i;
					}
				}
				return 0;
			},
			selectedFoods() {
				let foodArr = [];
				// 怎么去获取被选中的foods，food改变引起goods集合改变
				this.goods.forEach((good) => {
					// 这里的数据结构有点复杂，认真看如何循环
					good.foods.forEach((food) => {
						if(food.count){
							foodArr.push({
								price:food.price,
								count:food.count // count属性在controlpair里添加的
							});
						}
					})
				});
				return foodArr;
			}
		},
		created() {
    		this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
			this.$http.get('/api/goods').then((response) => {
				var data = response.body;
				if(data.errno === REQ_OK){
					this.goods = data.data;
					console.log(this.goods);
					this.$nextTick(() => {
						this._initScoll();
						this._calcHeight();
					})
				}
			});
		},
		methods:{
			// 点击左侧菜单栏
			selectMenu(index) {
				// 可以阻止默认的点击事件
				if (!event._constructed) {
		          return;
		        }
				let foodList = this.$refs.foodWrapper.getElementsByClassName("food-list-hook");
				let foodElement = foodList[index];
				this.foodScroll.scrollToElement(foodElement,300);
				console.log('xx');
			},
			// 初始化滚动条，必须放到nextTick里，vue是异步刷新dom，此时没有获取到宽高
			_initScoll () {
				this.menuScroll = new BScroll(this.$refs.menuWrapper,{
					click: true
				});

				this.foodScroll = new BScroll(this.$refs.foodWrapper,{
					// 实时派发 scroll 事件.
					click: true,
					probeType: 3
				});
				this.foodScroll.on('scroll', (pos) => {
		        	this.scrollY = Math.abs(Math.round(pos.y));
		        });

			},
			// 将每一个分类的高度保存到数组中
			_calcHeight() {
				let foodList = this.$refs.foodWrapper.getElementsByClassName("food-list-hook");
				let height = 0;
				this.listHeights.push(height);
				for(let i = 0, len = foodList.length; i<len; i++){
					let item = foodList[i]
					height += item.clientHeight;
					// 获取的是一个递增的height数组
					this.listHeights.push(height);
				}
			}
		}
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl'
	.goods
		display flex
		position absolute
		top 174px
		bottom 46px
		width 100%
		overflow hidden
		.menu-wrapper
			flex 0 0 80px
			width 80px // 兼容安卓
			background-color #f3f5f7
			.cate-item
				display table
				height 54px
				width 56px
				line-height 14px
				padding 0 12px
				&.current
					position: relative
					z-index: 10
					margin-top: -1px
					background: #fff
					font-weight: 700
					.cate-text
						border-none()
				.icon
					display:inline-block
					width:12px
					height:12px
					vertical-align:top // 是字补上来了
					margin-right:2px
					background-size:12px 12px
					background-repeat:no-repeat
					&.decrease
						bg-img('img/decrease_3')
					&.discount
						bg-img('img/discount_3')
					&.guarantee
						bg-img('img/guarantee_3')
					&.invoice
						bg-img('img/invoice_3')
					&.special
						bg-img('img/special_3')
				.cate-text
					display table-cell
					width 100%
					vertical-align middle
					font-size 12px
					border-1px(rgba(7,17,27,0.1))
		.foods-wrapper
			flex 1
			overflow auto
			font-size 0
			.title
				height 26px
				padding-left 13px
				line-height 26px
				border-left 2px solid #D9DDE1
				background-color #F3F5F7
				font-size 12px
				color rgb(147,153,159)
			.food-item
				display flex
				margin 18px
				padding-bottom 18px
				border-1px(rgba(7,17,27,0.1))
				&:last-child
					margin-bottom 0
					border-none()
				.icon
					flex 0 0 57px
					margin-right 10px
				.detail
					flex 1
					.name
						margin-top 2px
						margin-bottom 8px
						font-size 14px
						line-height 14px
						color rgb(7,17,27)
					.desc,.extra
						font-size 10px
						line-height 10px
						color rgb(147,153,159)
					.extra
						margin-top 8px
						.count
							margin-right 12px
				.control
					postion absolute
					right 0
					bottom 12px
				.price
					font-weight 700
					line-height 24px
					.now
						font-size 14px
						margin-right 8px
						color rgb(240, 20, 20)
					.old
						text-decoration: line-through
						font-size 10px
</style>
