<template>
	<view class="login-container flex a-center jc-around">
		<view class="">
			<view>
				<image class="login-pic" src="../../static/imgs/icon.jpg" mode="" />
			</view>
			<view class="flex input-box">
				账号:
				<input placeholder="请输入用户名" type="text" v-model='username' />
			</view>
			<view class="flex input-box">
				密码:
				<input placeholder="请输入密码" type="password" v-model="password" @confirm="login" />
			</view>
			<!--  #ifdef APP-PLUS	 -->
			<view class="thirdparty">
				第三方登录
			</view>
			<view class="">
				<uni-icons class="login-icon" type="weixin" size="30" @click="appUnionLogin('weixin')"></uni-icons>
				<uni-icons class="login-icon" type="weibo" size="30" @click="appUnionLogin('sinaweibo')"></uni-icons>
				<uni-icons class="login-icon" type="qq" size="30" @click="appUnionLogin('qq')"></uni-icons>
			</view>
			<!--  #endif -->

		</view>

	</view>
</template>

<script>
	import uniIcons from '../../components/uni-ui/uni-icons/uni-icons.vue'
	export default {
		name: "",
		components: {
			uniIcons
		},
		props: {},
		data() {
			return {
				username: '',
				password: ''
			}
		},
		methods: {
			login() {
				this.$api.login({
					username: this.username,
					password: this.password
				}).then(res => {
					if (res.data.status === 200) {
						uni.setStorageSync('user', JSON.stringify(res.data.data))
						uni.showToast({
							title: '登录成功',
							duration: 500,
							icon: "success"
						})
						setTimeout(() => {
							uni.navigateTo({
								url: "/pages/user/user"
							})
						}, 500)
					} else {
						uni.showToast({
							title: `${res.data.msg}`,
							duration: 500,
							icon: "none"
						})
					}
				})
			},

			// #ifdef APP-PLUS
			appUnionLogin(type) {
				const that = this
				uni.login({
					provider: type,
					success: (res) => {
						// 授权登陆成功之后 获取 用户信息
						uni.getUserInfo({
							provider: type,
							success: (info) => {
								const userInfo = info.userInfo
								let face = ''
								let nickname = ''
								let openIdOrUid = ''
								if (type === 'weixin') {
									face = userInfo.avatarUrl
									nickname = userInfo.nickName
									openIdOrUid = userInfo.openId
								} else if (type === 'qq') {
									face = userInfo.figureurl_qq_2
									nickname = userInfo.nickName
									openIdOrUid = userInfo.openId
								} else if (type === 'sinaweibo') {
									face = userInfo.avatar_large
									nickname = userInfo.nickname
									openIdOrUid = userInfo.id
								}
								uni.showLoading({
									title: "加载中..."
								})
								this.$api.appUnionLogin(type, {
									face,
									nickname,
									openIdOrUid
								}).then(res => {
									uni.setStorageSync('user', JSON.stringify(res.data.data))
									uni.showToast({
										title: '登录成功',
										duration: 500,
										icon: "success"
									})
									setTimeout(() => {
										uni.navigateTo({
											url: "/pages/user/user"
										})
									}, 500)
								})
							}
						})
					}
				})
			},
			// #endif
		},
		onUnload() {
			uni.switchTab({
				url: '/pages/my/my'
			})
		},
	}
</script>

<style scoped lang="scss">
	.login-container {
		padding-top: 200upx;
		text-align: center;
	}

	.login-pic {
		width: 200upx;
		height: 200upx;
		border-radius: 50%;
		margin-bottom: 100upx;
	}

	.login-icon {
		margin: 40upx 20upx;
	}

	.input-box {
		padding: 20upx;
		border-bottom: 1upx solid #ededed;
	}

	.thirdparty {
		font-size: 24upx;
		margin-top: 50upx;
		margin-bottom: 20upx;
	}
</style>
