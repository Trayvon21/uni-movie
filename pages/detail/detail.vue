<template>
	<view v-if="details">
		<view class="">
			<video class="detail-video" :src="details.trailer" :poster="details.poster" controls></video>
		</view>
		<view class="detail-main">
			<view class="flex jc-around a-center detail-desc">
				<image @click="$gotoView(details.cover)" class="detail-pic" :src="details.cover" mode=""></image>
				<view class="detail-info">
					<view class="detail-name">{{details.name}}</view>
					<view>{{details.basicInfo}}</view>
					<view>{{details.originalName}}</view>
					<view>{{details.releaseDate}}</view>
					<view class="flex jc-around a-center">
						<view class="">
							<view class="detail-scoretitle">综合评分</view>
							<view class="detail-score">{{score}}</view>
						</view>
						<view class="">
							<uni-rate class="detail-rate" size='10' disabled :value="parseInt(score/2)" />
							<view class="">{{details.prisedCounts}}人点赞</view>
						</view>

					</view>
				</view>
			</view>
			<view class="desc">
				<view class="detail-title">
					剧情介绍：
				</view>
				<view class="detail-intro">
					{{details.plotDesc}}
				</view>
			</view>
			<view class="" v-if="directors||actors">
				<view class="detail-title">
					演职人员
				</view>
				<scroll-view scroll-x="true" width="100%">
					<view class="flex flex-nowrap">
						<view v-for="item in directors" :key="item.id">
							<castBox :item="item"></castBox>
						</view>
						<view v-for="item in actors" :key="item.id">
							<castBox :item="item"></castBox>
						</view>
					</view>

				</scroll-view>
			</view>
			<view class="" v-if="plotPics.length">
				<view class="detail-title">
					剧照
				</view>
				<view class="flex flex-wrap detail-plotPics">
					<view class="" v-for="item in plotPics" :key="item.id">
						<image @click="$gotoView(item)" class="detail-plotPic" :src="item" mode=""></image>
					</view>
				</view>
			</view>

		</view>

	</view>
</template>

<script>
	import uniRate from '../../components/uni-ui/uni-rate/uni-rate.vue'
	import castBox from '../../components/detail/castBox/castBox.vue'
	export default {
		name: "",
		components: {
			castBox,
			uniRate

		},
		props: {},
		data() {
			return {
				plotPics: null,
				details: null,
				directors: null,
				actors: null,
				score: 0
			}
		},
		methods: {
			getData(id) {
				uni.showLoading({
					title: "加载中..."
				})
				uni.request({
					url: this.$api(`/search/trailer/${id}/`),
					method: 'POST',
					success: (res) => {
						this.details = res.data.data
						this.score = res.data.data.score
						this.plotPics = JSON.parse(res.data.data.plotPics)
					},
					fail() {},
					complete() {
						uni.hideLoading()
					}
				})
			},
			getCast(id, role) {
				uni.showLoading({
					title: "加载中..."
				})
				uni.request({
					url: this.$api(`/search/staff/${id}/${role}`),
					method: 'POST',
					success: (res) => {
						role === 1 ? this.directors = res.data.data : this.actors = res.data.data
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
		onLoad(options) {
			// options.id = 'marvel-1011'
			this.getData(options.id)
			this.getCast(options.id, 1)
			this.getCast(options.id, 2)
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
	.detail-video {
		width: 100%;
		height: 450upx;
	}

	.detail-main {
		margin: 0 45upx;
	}

	.detail-desc {
		margin: 100upx 0;
	}

	.detail-pic {
		height: 300upx;
		width: 260upx;
		margin-right: 40upx;
	}

	.detail-name {
		font-size: 32upx;
		font-weight: 700;
		color: black;
	}

	.detail-scoretitle {
		font-size: 32upx;
		color: black;
	}

	.detail-score {
		text-align: center;
		font-size: 30upx;
		color: #f6ab87;
	}

	.detail-rate {
		margin-top: 60upx;
	}

	.detail-info {
		font-size: 28upx;
		color: #d1d1d1;
	}

	.detail-title {
		margin-top: 20upx;
		padding-top: 20upx;
		border-top: 1upx solid #ededed;
	}

	.detail-intro {
		font-size: 28upx;
	}

	.detail-plotPic {
		margin: 20upx;
		width: 180upx;
		height: 220upx;
	}
</style>
