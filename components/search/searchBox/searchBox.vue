<template>
	<view class="result-container">
		<image class="search-pic" :src="item.cover" mode=""></image>
		<view class="search-name">
			{{item.name}}
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

<style>
	.result-container {
		width: 200upx;
		height: 360upx;
		margin:0 25upx;
	}

	.search-pic {
		width: 200upx;
		height: 260upx;
	}

	.search-name {
		font-size: 26upx;
	}
</style>
