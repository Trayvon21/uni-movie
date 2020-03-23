<template>
	<view>
		<!-- 轮播图 -->
		<swiper v-if="carouselList" class="swiper" :indicator-dots="true" :autoplay="true" :interval="2000" :duration="500">
			<swiper-item v-for="item in carouselList" :key="item.id">
				<image :src="item.image" mode="" class="swaiper-pic"></image>
			</swiper-item>
		</swiper>
		<!-- 热门超英 -->
		<view class="">热门超英</view>
		<scroll-view scroll-x v-if="hotList" class="">
			<view class="flex flex-nowrap">
				<movieBox v-for="item in hotList" :key="item.id" :item="item"></movieBox>
			</view>
		</scroll-view>
		<view class="">热门预告</view>
		<view class="flex flex-wrap jc-around">
			<trailerPlaye v-for="item in trailerList" :key="item.id" :item="item"></trailerPlaye>
		</view>
		<view class="">猜你喜欢</view>
		<view class="">
			<uLickBox v-for="item in UlickList" :key="item.id" :item="item"></uLickBox>
		</view>
	</view>
</template>

<script>
	import movieBox from '../../components/common/movieBox/movieBox.vue'
	import trailerPlaye from '../../components/index/trailerPlaye/trailerPlaye.vue'
	import uLickBox from '../../components/index/uLickBox/uLickBox.vue'
	export default {
		data() {
			return {
				carouselList: null,
				UlickList: null,
				hotList: null,
				trailerList: null
			}
		},
		components: {
			movieBox,
			trailerPlaye,
			uLickBox
		},
		onLoad() {
			this.getCarouse();
			this.getUlick();
			this.getHotList('trailer');
			this.getHotList('superhero');
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
					fail() {

					},
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
					fail() {

					},
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
					fail() {

					},
					complete() {
						uni.hideLoading()
					}
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
</style>
