<template>
	<view class="ulick-container flex jc-around">
		<image class="ulick-pic" :src="item.cover" mode=""></image>
		<view class="ulick-info">
			<view class="ulick-name txt-hidden">{{item.name}}</view>
			<view class="ulick-star">
				<uni-rate disabled size='10' :value="parseInt(item.score/2)" />
			</view>
			<view class="ulick-des">{{item.basicInfo}}</view>
			<view class="ulick-des">{{item.releaseDate}}</view>
		</view>
		<view class="ulick-control a-center flex">
			<view class="">
				<view class="" @click.stop="clickUp">
					<uni-icons color="#f6ac2d" type="hand-thumbsup" size="20"></uni-icons>
				</view>
				<view class="">
					赞一下
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from "../../uni-ui/uni-icons/uni-icons.vue"
	import uniRate from '../../uni-ui/uni-rate/uni-rate.vue'
	export default {
		props: {
			item: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {

			};
		},
		components: {
			uniRate,
			uniIcons
		},
		methods:{
			clickUp(){
				uni.showToast({
					icon:"success",
					title:"操作成功",
					duration:1000
				})
			}
		}
	}
</script>

<style lang="scss">
	.ulick-container {
		margin: 60upx 0;
	}

	.ulick-pic {
		height: 240upx;
		width: 180upx;
		border-radius: 10upx;
		overflow: hidden;
	}

	.ulick-name {
		font-size: 32upx;
		height: 40upx;
	}

	.ulick-star {
		height: 30upx;
		margin-top: 20upx;
	}

	.ulick-info {
		width: 320upx;
	}

	.ulick-des {
		color: gray;
		font-size: 24upx;
	}

	.ulick-control {
		border-left: 5upx dashed #dbdbda;
		padding-left: 20upx;
		text-align: center;
		color: #f6ac2d;
	}
</style>
