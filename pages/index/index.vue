<template>
	<view v-if="flag">
		<!-- 轮播图 -->
		<swiper v-if="carouselList" class="swiper" :indicator-dots="true" :autoplay="true" :interval="2000" :duration="500">
			<swiper-item v-for="item in carouselList" :key="item.id">
				<image :src="item.image" mode="" class="swaiper-pic" @click="gotoDetail(item.movieId)"></image>
			</swiper-item>
		</swiper>
		<!-- 热门超英 -->
		<view class="index-title flex a-center">
			<image class="index-icon" src="../../static/imgs/hot.png" mode="" />
			热门超英</view>
		<scroll-view scroll-x v-if="hotList" class="">
			<view class="flex flex-nowrap">
				<view v-for="item in hotList" :key="item.id" @click="gotoDetail(item.id)">
					<movieBox :item="item" />
				</view>
			</view>
		</scroll-view>
		<view class="index-title flex a-center">
			<image class="index-icon" src="../../static/imgs/tags.png" mode="" />热门预告</view>
		<view class="flex flex-wrap jc-around">
			<view v-for="item in trailerList" :key="item.id" class="player-container">
				<video class="player-video" :id="item.id" :src="item.trailer" :poster="item.poster" @play="clickVideo(item.id)" />
			</view>
		</view>
		<view class="index-title flex a-center">
			<image class="index-icon" src="../../static/imgs/recommend.png" mode="" />猜你喜欢</view>
		<view class="" v-if="UlickList">
			<view v-for="item in UlickList" :key="item.id" @click="gotoDetail(item.id)">
				<uLickBox :item="item"></uLickBox>
			</view>
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
			this.getUlick();
			setTimeout(() => {
				this.flag = true
				uni.stopPullDownRefresh()
			}, 200)

		},
		methods: {
			getCarouse() {
				this.$api.getCarouse().then(res => {
					if (res.data.status === 200) {
						this.carouselList = res.data.data
					}
				})
			},
			getUlick() {
				this.$api.getUlick().then(res => {
					if (res.data.status === 200) {
						this.UlickList = res.data.data
					}
				})
			},
			getHotList(type) {
				this.$api.getHotList({
					type: type
				}).then(res => {
					if (res.data.status === 200) {
						type === 'trailer' ? this.trailerList = res.data.data : this.hotList = res.data.data
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

	.index-title {
		margin: 10upx;
		font-size: 28upx;
	}

	.index-icon {
		width: 40upx;
		height: 40upx;
		padding: 10upx;
	}

	.player-video {
		width: 100%;
		height: 100%;
	}
</style>
