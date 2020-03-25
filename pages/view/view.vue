<template>
	<view class="view-container flex a-center">
		<image @longtap="openPopup" class="view-pic" :src="url" mode="widthFix"></image>
		<uni-popup ref="popup" type="bottom">
			<view style="background-color: #FFFFFF;">
				<button type="default" @click="save()">保存图片到本地</button>
				<button type="default" @click="closePopup">取消</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "../../components/uni-ui/uni-popup/uni-popup.vue"
	export default {
		data() {
			return {
				url: ''
			};
		},
		onLoad(options) {
			console.log(options.url);
			this.url = options.url
		},
		components: {
			uniPopup
		},
		methods: {
			openPopup() {
				// #ifdef APP-PLUS || MP-WEIXIN
				this.$refs.popup.open()
				// #endif
			},
			closePopup() {
				this.$refs.popup.close()
			},
			save() {
				this.closePopup()
				uni.downloadFile({
					url: this.url, //仅为示例，并非真实的资源
					success: (res) => {
						if (res.statusCode === 200) {
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: () => {
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
