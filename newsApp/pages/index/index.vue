<template>
	<view class="index">
		<myHeader @change="getNavId"></myHeader>
		<myNewsList class="myNewsList" @change="getNewsList" :news="news" ref="newsListRef">
		</myNewsList>

		<addNews></addNews>

	</view>
</template>

<script>
	import {
		unify
	} from "@/service/api/unify.js"
	export default {
		data() {
			return {
				nid: -1,
				news: [],
				maxIndex: null,
				pageSize: 8,
				pageIndex: 0
			}
		},
		onReachBottom() {
			if (this.pageIndex < this.maxIndex) {
				this.pageIndex++
				this.getNewsList()
			}
		},
		methods: {
			async getNavId(nid = -1) {
				console.log("nid",nid);
				this.pageIndex = 0
				this.nid = nid
				this.news = []
				this.$refs.newsListRef.loading = 0
				let countres // 数据长度
				let data = {
					conut: true,
					name: "news",
					data: {}
				}
				if (this.nid == -1) data.all = true
				else {
					data.data.strict = {
						nid: this.nid
					}
				}
				countres = await unify(data)
				this.maxIndex = Math.floor(countres.data[0].rows / 8 + 1)
				this.getNewsList()
			},
			async getNewsList() {
				let res
				let data = {
					name: "news",
					pageSize: this.pageSize,
					pageIndex: this.pageIndex,
					data: {
						
					}
				}
				if (this.nid == -1) data.top = true
				else {
					data.data.strict = {
						nid: this.nid
					}
				}
				res = await unify(data)
				if (res.code == 400) {
					this.$refs.newsListRef.loading = 2
				} else this.news = [...this.news, ...res.data]
			}
		}
	}
</script>

<style lang="less" scoped>
	.myNewsList {
		margin-top: 88rpx;
	}

	.loading {
		margin-top: 88rpx;
		text-align: center;
		font-size: 30px
	}
</style>
