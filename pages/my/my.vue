<template>
	<view class="">
		<view class="my-bg flex a-center">
			<view class="my-login flex a-center" v-if="user" @click="gotoUser">
				<image class="my-pic" :src="user.faceImage" mode="" />
				<view class="">
					{{user.nickname}}
				</view>
			</view>
			<view class="my-login flex a-center" @click="gotoLogin" v-else>
				<image class="my-pic" src="../../static/imgs/icon.jpg" mode="" />
				<view class="">
					注册/登录
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		name: "",
		components: {

		},
		props: {},
		data() {
			return {
				user: null
			}
		},
		methods: {
			gotoLogin() {
				uni.navigateTo({
					url: "/pages/login/login"
				})
			},
			gotoUser() {
				uni.navigateTo({
					url: "/pages/user/user"
				})
			}
		},
		mounted() {

		},
		onLoad() {},
		onShow() {
			if (uni.getStorageSync('user')) {
				this.user = JSON.parse(uni.getStorageSync('user'))
			} else {
				this.user = null
			}
		},
		filters: {

		},
		computed: {

		},
		watch: {

		},
		directives: {

		}
	}
</script>

<style scoped lang="scss">
	.my-bg {
		position: relative;
		width: 100%;
		height: 300upx;
		background: url(../../static/imgs/login.jpg);
	}

	.my-pic {
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
		margin-right: 30upx;
	}

	.my-login {
		position: absolute;
		left: 40upx;
		font-size: 40upx;
	}
</style>
