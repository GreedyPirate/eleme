<template>
	<div class="rating-star" :class='starType'>
		<span class="star-item" v-for="item in itemStyles" :class="item"></span>
	</div>
</template>
<script type="text/ecmascript-6">
	const START_ON = 'on';
	const START_HALF = 'half';
	const START_OFF = 'off';
	const START_LEN = 5; 

    export default {
    	props:{
    		score:{
    			type:Number
    		},
    		size:{
    			type:Number
    		}
    	},
    	computed:{
    		starType() {
				return 'start-' + this.size;
    		},
    		itemStyles() {
				let result = [];
				// 计算评分，形如1, 1.5, 2, 2.5
				let niceRating = Math.floor(this.score * 2) / 2;
				// 是否有半星
				let hasHalf = niceRating % 1 !== 0;
				// 计算满星个数
				let fullStar = Math.floor(niceRating);
				
				for(var i=0; i<fullStar; i++){
					result.push(START_ON);
				}

				if(hasHalf){
					result.push(START_HALF);
				}

				while(result.length < START_LEN){
					result.push(START_OFF);
				}

				return result;
    		}
    	}
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin"
	
	.rating-star
		font-size 0
		.star-item
			display inline-block
			background-repeat no-repeat
		&.start-48
			.star-item
				width 20px
				height 20px
				margin-right 22px
				background-size 20px 20px
				&:last-child 
					margin-right 0px
				&.on
					bg-img('img/star48_on')  
				&.off  			
					bg-img('img/star48_off')
				&.half
					bg-img('img/star48_half')
		&.start-36
			.star-item
				width 15px
				height 15px
				margin-right 6px
				background-size 15px 15px
				&:last-child 
				margin-right 0px
				&.on
					bg-img('img/star48_on')  
				&.off  			
					bg-img('img/star48_off')
				&.half
					bg-img('img/star48_half')
		&.start-24
			.star-item
				width 10px
				height 10px
				margin-right 3px
				background-size 10px 10px
				&:last-child 
					margin-right 0px
				&.on
					bg-img('img/star48_on')  
				&.off  			
					bg-img('img/star48_off')
				&.half
					bg-img('img/star48_half')
</style>
