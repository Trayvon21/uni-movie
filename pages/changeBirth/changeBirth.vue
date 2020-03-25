<template>
	<view>
		<ruiDatePicker class='birth-box flex jc-around' fields="day" start="1900-01-01" :end="end" :value="user.birthday" @change="bindChange"></ruiDatePicker>
		<button type="primary" @click="changeBirth">提交</button>
	</view>
</template>

<script>
	import ruiDatePicker from '@/components/rattenking-dtpicker/rattenking-dtpicker.vue';
	export default {
		data() {
			return {
				user: null,
				type: '',
				showPicker: false,
				end: this.$dayjs(new Date()).format('YYYY-MM-DD')
			};
		},
		components: {
			ruiDatePicker
		},
		onShow() {
			this.user = JSON.parse(uni.getStorageSync('user'))
		},
		methods: {
			bindChange(e) {
				this.user.birthday = e
			},
			changeBirth() {
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
						birthday: this.user.birthday //trailer
					},
					success: (res) => {
						if (res.data.status === 200) {
							uni.showToast({
								title: "上传成功",
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
	.birth-box {
		border: none;
		width: 100%;
		height: 100upx;
	}
</style>
