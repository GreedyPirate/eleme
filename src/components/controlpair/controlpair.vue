<template>
	<div class="pair-wrapper">
		<div class="sub icon-remove_circle_outline" @click="subOne" v-show="food.count>0">
		</div>
		<div class="count" v-show="food.count>0">{{food.count}}</div>
		<div class="add icon-add_circle" @click="addOne"></div>
	</div>
</template>
<script type="text/ecmascript-6">
	import Vue from 'vue'

    export default {
    	props:{
    		food:{
    			type:Object
    		}
    	},
    	methods:{
    		addOne() {
    			if (!event._constructed) {
		          return;
		        }
    			if(!this.food.count){
    				// 第一次点击，为food添加count属性
    				Vue.set(this.food,'count',1);
    			}else{
    				this.food.count++;
    			}
    		},
    		subOne() {
    			if (!event._constructed) {
		          return;
		        }
		        // 减号不做判断
    			this.food.count--;
    		}
    	}
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
	.pair-wrapper
		font-size 0
		.sub,.add
			display inline-block
			padding 6px
			font-size 24px
			line-height 24px
			color rgb(0,160,220)
		.count
			display inline-block
			width 12px
			padding-top 6px
			line-height 24px
			text-align center
			vertical-align top
			font-size 10px
			color rgb(147,153,159)
</style>
