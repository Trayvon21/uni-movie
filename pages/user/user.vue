<template>
	<view v-if="user" class="user-container">
		<view class="user-control">
			<view class="flex jc-between">
				<view class="">
					头像
				</view>
				<view class="flex a-center">
					<image class="user-pic" :src="user.faceImage" mode="" />
					<uni-icons type="forward" color="#ededed" size="30"></uni-icons>
				</view>
			</view>
			<view class="flex jc-between">
				<view class="">
					昵称
				</view>
				<view class="flex a-center">
					<view>{{user.nickname}}</view>
					<uni-icons type="forward" color="#ededed" size="30"></uni-icons>
				</view>
			</view>
			<view class="flex jc-between">
				<view class="">
					生日
				</view>
				<view class="flex a-center">
					<view>{{user.birthday}}</view>
					<uni-icons type="forward" color="#ededed" size="30"></uni-icons>
				</view>
			</view>
			<view class="flex jc-between">
				<view class="">
					性别
				</view>
				<view class="flex a-center">
					<view>{{user.sex===1?'男':user.sex===0?'女':'保密'}}</view>
					<uni-icons type="forward" color="#ededed" size="30"></uni-icons>
				</view>
			</view>
		</view>

		<view class="user-button">
			<button type="default">清理缓存</button>
			<button type="default" @click="exit">退出登录</button>
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
				user: null
			}
		},
		methods: {
			exit() {
				uni.showLoading({
					title: "加载中..."
				})
				uni.request({
					url: this.$api("/user/logout"),
					data: {
						userId: this.user.id
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					method: 'POST',
					success: (res) => {

						if (res.data.status === 200) {
							uni.showToast({
								title: res.data.msg,
								duration: 800
							})
							setTimeout(() => {
								uni.removeStorageSync('user')
								uni.switchTab({
									url: "../index/index"
								})
							}, 800)
						} else {
							uni.showToast({
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
		},
		mounted() {

		},
		onLoad() {
			if (uni.getStorageSync('user')) {
				this.user = JSON.parse(uni.getStorageSync('user'))
				console.log(uni.getStorageSync('user'));
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
	.user-container {
		.user-control {
			margin: 0 20upx;

			>view {
				height: 90upx;
				align-items: center;
			}
		}
	}

	.user-pic {
		height: 80upx;
		width: 80upx;
	}

	.user-button {
		position: absolute;
		bottom: 0;
		height: 184upx;
		width: 100%;
	}
</style>
