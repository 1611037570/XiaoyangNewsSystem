<template>
	<view class="">
		<myUser></myUser>
		<view class="info">
			<view class="like" @click="like">我的收藏</view>
			<view class="history" @click="history">历史浏览</view>
		</view>

		<addNews></addNews>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			like() {
			if (uni.getStorageSync("uid")) {
				uni.navigateTo({
					url: "/pages/news/newsList?title=likes"
				})
			} else {
				uni.showToast({
					title: "请先登录",
					icon: "error"
				})
			}
			},
			history() {
			uni.navigateTo({
				url: "/pages/news/newsList?title=history"
			})
			}
		}
	}
</script>

<style lang="less">
	.info {
		position: relative;

		.like,
		.history {
			position: absolute;
			top: 0;
			width: 50%;
			height: 100px;
			line-height: 100px;
			text-align: center;
		}

		.like {
			left: 0;

		}

		.history {
			right: 0;
		}
	}
</style>
