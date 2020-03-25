<template>
	<view class="view-container flex a-center">
		<image @longtap="save(url)" class="view-pic" :src="url" mode="widthFix"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: ''
			};
		},
		onLoad(options) {
			this.url = options.url
		},
		methods: {
			save(url) {
				uni.showModal({
					title: '是否保存',
					content: '点击确认保存本照片',
					success: function(res) {
						if (res.confirm) {
							uni.downloadFile({
								url: url, //仅为示例，并非真实的资源
								success: (res) => {
									if (res.statusCode === 200) {
										uni.saveImageToPhotosAlbum({
											filePath: res.tempFilePath,
											success: function() {
												uni.showToast({
													icon: "success",
													title: "保存成功",
													duration: 800
												})
											}
										});
									}
								}
							})
						} else if (res.cancel) {
						}
					}
				});
			}
		},
	}
</script>

<style lang="scss">
	.view-container {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		background-color: black;
	}

	.view-pic {
		width: 100%;
	}
</style>
