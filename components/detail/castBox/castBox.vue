<template>
	<view class="cast-container">
		<image @click="$gotoView(item.photo)" class="cast-pic" :src="item.photo" mode=""></image>
		<view class="cast-name txt-hidden">
			{{item.name}}
		</view>
		<view class="cast-actname txt-hidden">
			{{item.role===1?item.actName:`饰演:${item.actName}`}}
		</view>
	</view>
</template>

<script>
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
		}
	}
</script>

<style lang="scss">
	.cast-container{
		width: 120upx;
		height: 240upx;
		margin:0 30upx;
	}
	.cast-pic {
		width: 120upx;
		height: 160upx;
	}

	.cast-name {
		font-size: 24upx;
	}

	.cast-actname {
		font-size: 20upx;
		color: #d1d1d1;
	}
</style>
