<template>
	<view>
		<input type="text" class="nickname-input t-center" v-model="user.nickname" />
		<button type="primary" @click="changeNickname">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: null
			};
		},
		onShow() {
			this.user = JSON.parse(uni.getStorageSync('user'))
		},
		methods: {
			changeNickname() {
				uni.showLoading({
					title: "加载中..."
				})
				uni.request({
					url: this.$api("/user/modifyUserinfo"),
					method: 'POST',
					header: {
						"headerUserId": this.user.id,
						"headerUserToken": this.user.userUniqueToken
					},
					data: {
						userId: this.user.id,
						nickname: this.user.nickname //trailer
					},
					success: (res) => {
						if (res.data.status === 200) {
							uni.showToast({
								title: "修改成功",
								duration: 800
							})
							setTimeout(() => {
								uni.setStorageSync('user', JSON.stringify(res.data.data))
								uni.navigateTo({
									url: "/pages/user/user"
								})
							}, 800)
						} else if (res.data.status === 502) {
							uni.showToast({
								icon: "none",
								title: res.data.msg,
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
								title: res.data.msg,
								duration: 800
							})
						}
					},
					fail() {},
					complete() {
						uni.hideLoading()
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.nickname-input {
		height: 80upx;
		width: 100%;
	}
</style>
