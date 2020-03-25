<template>
	<view v-if="flag">
		<!-- 轮播图 -->
		<swiper v-if="carouselList" class="swiper" :indicator-dots="true" :autoplay="true" :interval="2000" :duration="500">
			<swiper-item v-for="item in carouselList" :key="item.id">
				<image :src="item.image" mode="" class="swaiper-pic" @click="gotoDetail(item.movieId)"></image>
			</swiper-item>
		</swiper>
		<!-- 热门超英 -->
		<view class="">热门超英</view>
		<scroll-view scroll-x v-if="hotList" class="">
			<view class="flex flex-nowrap">
				<view v-for="item in hotList" :key="item.id" @click="gotoDetail(item.id)">
					<movieBox :item="item" />
				</view>
			</view>
		</scroll-view>
		<view class="">热门预告</view>
		<view class="flex flex-wrap jc-around">
			<view v-for="item in trailerList" :key="item.id" class="player-container">
				<video class="player-video" :id="item.id" :src="item.trailer" :poster="item.poster" @play="clickVideo(item.id)" />
			</view>
		</view>
		<view class="">猜你喜欢</view>
		<view v-for="item in UlickList" :key="item.id" @click="gotoDetail(item.id)">
			<uLickBox :item="item"></uLickBox>
		</view>
	</view>
</template>

<script>
	import movieBox from '../../components/common/movieBox/movieBox.vue'
	import uLickBox from '../../components/index/uLickBox/uLickBox.vue'
	export default {
		data() {
			return {
				carouselList: null,
				UlickList: null,
				hotList: null,
				trailerList: null,
				videoContext: null,
				flag: true
			}
		},
		components: {
			movieBox,
			uLickBox
		},
		onLoad() {
			this.getCarouse();
			this.getUlick();
			this.getHotList('trailer');
			this.getHotList('superhero');
		},
		onPullDownRefresh() {
			this.flag = false

			this.getCarouse();
			this.getUlick();
			this.getHotList('trailer');
			this.getHotList('superhero');
			setTimeout(() => {
				this.flag = true
				uni.stopPullDownRefresh()
			}, 200)

		},
		methods: {
			getCarouse() {
				uni.showLoading({
					title: "加载中..."
				})
				uni.request({
					url: this.$api("index/carousel/list"),
					method: 'POST',
					success: (res) => {
						this.carouselList = res.data.data
					},
					fail() {},
					complete() {
						uni.hideLoading()
					}
				})
			},
			getUlick() {
				uni.showLoading({
					title: "加载中..."
				})
				uni.request({
					url: this.$api("index/guessULike"),
					method: 'POST',
					success: (res) => {
						this.UlickList = res.data.data
					},
					fail() {},
					complete() {
						uni.hideLoading()
					}
				})
			},
			getHotList(type) {
				uni.showLoading({
					title: "加载中..."
				})
				uni.request({
					url: this.$api("index/movie/hot"),
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: {
						type //trailer
					},
					success: (res) => {
						type === 'trailer' ? this.trailerList = res.data.data : this.hotList = res.data.data
					},
					fail() {},
					complete() {
						uni.hideLoading()
					}
				})
			},
			clickVideo(id) {
				if (this.videoContext) {
					this.videoContext.pause()
				}
				this.videoContext = uni.createVideoContext(id)
			},
			gotoDetail(id) {
				uni.navigateTo({
					url: `/pages/detail/detail?id=${id}`
				})
			}
		}
	}
</script>

<style>
	.swiper {
		width: 100%;
		height: 440upx;
	}

	.swaiper-pic {
		width: 100%;
		height: 440upx;
	}

	.player-container {
		width: 340upx;
		height: 300upx;
		background-color: black;
		margin-bottom: 20upx;
	}

	.player-video {
		width: 100%;
		height: 100%;
	}
</style>
