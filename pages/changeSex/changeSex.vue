<template>
	<view>
		<radio-group class="" @change="changeSex">
			<label class="flex jc-around sex-radio">
				<view>
					<radio value="1" :checked="sex===1" /><text>男</text>
				</view>
				<view>
					<radio value="0" :checked="sex===0" /><text>女</text>
				</view>
			</label>
		</radio-group>
		<button type="primary" @click="updateSex">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: null,
				sex: null
			};
		},
		onLoad() {
			this.user = JSON.parse(uni.getStorageSync('user'))
			this.sex = this.user.sex
		},
		methods: {
			changeSex(e) {
				this.user.sex = e.detail.value
			},
			updateSex() {
				this.$api.changeUserInfo({
					userId: this.user.id,
					sex: this.user.sex
				}).then(res => {
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
				})
			}
		}
	}
</script>

<style lang="scss">
	.sex-radio {
		margin-top: 50upx;
		height: 100upx;
	}

	radio {
		padding: 0 20upx;
	}
</style>
