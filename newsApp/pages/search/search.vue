<template>
	<view>
		<input class="input" type="text" v-model="search" placeholder="请输入要搜索的内容" />
		<view @click="gosearch" class="search">搜索</view>
	</view>
</template>

<script>
	export default {
		name: "mySearch",
		data() {
			return {
				search: ""
			};
		},methods:{
			gosearch() {
				uni.navigateTo({
					url: "/pages/news/newsList?title=search&text=" + this.search
				})
			}
		}
	}
</script>

<style lang="less">
	.input {
		margin: 0 auto;
		height: 100rpx;
		width: 85%;

	}
	.search {
		text-align: center;
		border: 1px solid #000;
		width: 50%;
		margin: 0 auto;
		line-height: 40px;
		height: 40px;
		border-radius: 25px;
	}
</style>
