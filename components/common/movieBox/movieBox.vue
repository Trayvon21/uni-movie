<template>
	<view class="box-container">
		<view class="box-pic">
			<image :src="item.cover"></image>
		</view>
		<view class="box-name txt-hidden">
			{{item.name}}
		</view>
		<view class="box-rate flex a-center">
			<uni-rate size='10' disabled :value="parseInt(item.score/2)" />
			<view class="">
				{{item.score}}
			</view>
		</view>
	</view>
</template>

<script>
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
			uniRate
		}
	}
</script>

<style lang="scss">
	.box-container {
		width: 160upx;
		height: 240upx;
		margin: 10upx;
	}

	.box-pic {
		width: 150upx;
		height: 150upx;
		margin: 5upx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.box-name {
		font-size: 20upx;
		height: 30upx;
	}

	.box-rate {
		margin-top: 10upx;
		height: 30upx;
		text-align: center;
		font-size: 18upx;
	}
</style>
