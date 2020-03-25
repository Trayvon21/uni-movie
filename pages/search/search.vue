<template>
	<view v-if="flag" class="search-cotainer">
		<view class="searchBar" :style="{marginTop:statusBarHeight+'px'}">
			<uni-search-bar :radius="100" @confirm="search" @cancel="cancel"></uni-search-bar>
		</view>
		<scroll-view scroll-y="true" class="result-main" :style="{height:windowHeight+'px'}">
			<view class="flex flex-wrap">
				<view v-for="item in resultList" :key="item.id" @click="gotoDetail(item.id)">
					<searchBox :item="item"></searchBox>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import searchBox from "../../components/search/searchBox/searchBox.vue"
	import uniSearchBar from "../../components/uni-ui/uni-search-bar/uni-search-bar.vue"
	export default {
		name: "",
		components: {
			uniSearchBar,
			searchBox
		},
		props: {},
		data() {
			return {
				flag: true,
				resultList: null,
				page: 1,
				records: null,
				statusBarHeight: 0,
				windowHeight: 0
			}
		},
		onPullDownRefresh() {
			this.flag = false
			this.page = 1
			this.getData('')
			setTimeout(() => {
				this.flag = true
				uni.stopPullDownRefresh()
			}, 200)

		},
		methods: {
			search(e) {
				this.getData(e.value)
			},
			cancel() {
				this.page = 1
				this.getData('')
			},
			getData(keywords) {
				uni.showLoading({
					title: "加载中..."
				})
				uni.request({
					url: this.$api("/search/list"),
					method: 'POST',
					data: {
						keywords,
						page: this.page,
						pageSize: 50
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: (res) => {
						this.resultList = res.data.data.rows
						this.records = res.data.data.records
					},
					fail() {},
					complete() {
						uni.hideLoading()
					}
				})
			},
			gotoDetail(id) {
				console.log(1);
				uni.navigateTo({
					url: `/pages/detail/detail?id=${id}`
				})
			}
		},
		mounted() {

		},
		onLoad() {
			let that = this
			uni.getSystemInfo({
				success(res) {
					console.log(res);
					if (res.devicePixelRatio) {
						res.statusBarHeight = 0
					}
					that.statusBarHeight = res.statusBarHeight
					that.windowHeight = res.windowHeight - res.statusBarHeight - 52
				}
			})

			this.getData('')

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
	.search-cotainer {}

	.searchBar {
		height: 52px;
	}

	.result-main {
		height: 100%;
	}
</style>
