<template>
	<view class="header">
		<div class="box">
			<!-- 滚动导航栏 -->
			<scroll-view scroll-x class="navs">
				<!-- 固定添加 -->
				<view class="nav" :class="-1 == navIndex ? 'active' : ''" @click="navClick(-1, -1)">
					热门
				</view>
				<!-- 动态添加 -->
				<view v-for="(item, index) in navLists" :key="item.id " class="nav"
					:class="index == navIndex ? 'active' : ''" @click="navClick(index, item.id)">
					{{item.title}}
				</view>
			</scroll-view>
			<!-- 搜索按钮 -->
			<view class="search">
				<image src="../../static/images/index/search.png" @click="searchClick()"></image>
			</view>
		</div>


	</view>
</template>

<script>
	import {
		unify
	} from "@/api/unify.js"
	export default {
		data() {
			return {
				navIndex: -1, // 当前导航下标
				navLists: [] // 导航栏数据
			}
		},
		mounted() {
			// 初始化
			this.getNav()
			this.$emit("change", -1)
		},
		methods: {
			// 导航按钮切换
			navClick(index, id) {
				this.navIndex = index
				this.$emit("change", id)
			},
			// 搜索按钮跳转
			searchClick() {
				uni.navigateTo({
					url: "/pages/search/search"
				})
			},
			// 获取导航数据
			async getNav() {
				let res = await unify({
					name: "nav",
					all: "true"
				})
				if (res.code === 200) {
					this.navLists = res.data
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.header {
		position: fixed;
		height: 80rpx;
		width: 100%;
		top: 44px;
		z-index: 99;

		.box {
			position: relative;
			height: 80rpx;

			.navs {
				position: absolute;
				box-sizing: border-box;
				padding-right: 120rpx;
				height: 80rpx;
				background-color: #F8F9F9;
				white-space: nowrap;
				width: 100%- 120rpx - 88rpx;

				/deep/ ::-webkit-scrollbar {
					width: 4px !important;
					height: 1px !important;
					overflow: auto !important;
					background: transparent !important;
					-webkit-appearance: auto !important;
					display: block;
				}

				.nav {
					height: 80rpx;
					line-height: 80rpx;
					display: inline-block;
					padding: 0 50rpx;
					font-size: 36rpx,
				}

				.nav.active {
					color: #31c27c;
				}
			}

			.search {
				position: absolute;
				box-sizing: border-box;
				right: 0;
				top: 0;
				width: 120rpx;
				height: 80rpx;
				background-color: #f7f8fa;
				text-align: center;

				image {
					box-sizing: border-box;
					padding: 12rpx;
					margin: 0 auto;
					display: block;
					width: 80rpx;
					height: 80rpx;
				}
			}
		}
	}
</style>
