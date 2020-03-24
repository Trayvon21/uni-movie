<template>
	<view class="">
		<view class="my-bg flex a-center">
			<view class="my-login flex a-center" @click="gotoLogin">
				<image class="my-pic" src="https://avatars0.githubusercontent.com/u/57336267?s=460&u=d9836824b273cfc72214fdc353ee0f3bf5acc0fb&v=4"
				 mode="" />
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
			}
		},
		mounted() {

		},
		onLoad() {},
		onShow() {

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
.my-pic{
	width: 100upx;
	height: 100upx;
	border-radius: 50%;
	margin-right: 30upx;
}
	.my-login {
		position: absolute;
		right: 50upx;
		font-size: 40upx;
		
	}
</style>
