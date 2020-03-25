<template>
	<view class="pic-container flex a-center t-center">
		<image class="pic-view" v-if="picUrl" :src="picUrl.tempFiles[0].path" mode=""></image>
		<view v-else class="pic-msg">
			* 请从相册中选择等比宽高的照片噢~
		</view>
		<view class="pic-bottom flex jc-around">
			<view @click="chooseImage">重新选择</view>
			<view @click="updatePic">确认上传</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				picUrl: null,
				user: null
			};
		},
		onLoad() {
			this.user = JSON.parse(uni.getStorageSync('user'))
			uni.showModal({
				title: '选取本地照片',
				content: '点击确认选取照片',
				success: (res) => {
					if (res.confirm) {
						this.chooseImage()
					}
				}
			})
		},
		methods: {
			chooseImage() {
				uni.chooseImage({
					count: 1, //默认9
					sourceType: ['album'], //从相册选择
					success: (res) => {
						this.picUrl = res
					},
					fail: (err) => {
						console.log(err);
					},
					complete: () => {}
				});
			},
			updatePic() {
				if (!this.user || !this.picUrl) {
					uni.showToast({
						icon: "none",
						title: "图片不存在或信息不完整",
						duration: 800
					})
					return
				}
				uni.showLoading({
					title: "加载中..."
				})
				uni.uploadFile({
					url: `${this.$api('/user/uploadFace')}&userId=${this.user.id}`, //仅为示例，非真实的接口地址
					filePath: this.picUrl.tempFiles[0].path,
					name: 'file',
					header: {
						"headerUserId": this.user.id,
						"headerUserToken": this.user.userUniqueToken
					},
					formData: {},
					success: (uploadFileRes) => {
						const res = JSON.parse(uploadFileRes.data)
						if (res.status === 200) {
							uni.showToast({
								title: "上传成功",
								duration: 800
							})
							setTimeout(() => {
								this.picUrl = null
								uni.setStorageSync('user', JSON.stringify(res.data))
								uni.navigateTo({
									url: "/pages/user/user"
								})
							}, 800)
						} else if (res.status === 502) {
							uni.showToast({
								icon: "none",
								title: res.msg,
								duration: 800
							})
							uni.removeStorageSync('user')
							setTimeout(() => {
								uni.navigateTo({
									url: "/pages/login/login"
								})
							}, 800)
						} else {
							uni.showToast({
								icon: "none",
								title: res.msg,
								duration: 800
							})
						}
					},
					fail: (err) => {
						uni.showToast({
							icon: "none",
							title: err,
							duration: 800
						})
					},
					complete: () => {
						uni.hideLoading()
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.pic-container {
		background: #000000;
		position: absolute;
		width: 100%;
		top: 0;
		bottom: 0;
	}

	.pic-msg {
		color: gray;
		font-size: 28upx;
		width: 100%;
	}

	.pic-view {
		margin: 0 auto;
		width: 80%;
	}

	.pic-bottom {
		color: white;
		background: #000000;
		font-size: 28upx;
		padding: 10upx;
		width: 100%;
		position: absolute;
		bottom: 0;
		border-top: 1upx solid #ededed;
	}
</style>
