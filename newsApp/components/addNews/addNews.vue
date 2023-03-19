<template>
	<view class="logo" @tap="addNews" v-if="role !== 2 && role !== ''">
		<view class="info">
			发布
		</view>
		<view class="info">
			新闻
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from "vuex"

	export default {
		name: "addNews",
		data() {
			return {

			};

		},
		computed: {
			...mapGetters("user", {
				role: "getRole",
			})
		},
		methods: {
			addNews() {
				uni.navigateTo({
					url: "/pages/news/addNews"
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.logo {
		position: fixed;
		bottom: 70px;
		right: 20px;
		text-align: center;
		padding: 20rpx;
		width: 45px;
		z-index: 999;
		background-color: rgb(85, 255, 127);
		color: #fff;
		border-radius: 10px;

		.img {
			position: absolute;
		}

		.info {
			font-size: 16px;
			height: 20px;
		}
	}
</style>
