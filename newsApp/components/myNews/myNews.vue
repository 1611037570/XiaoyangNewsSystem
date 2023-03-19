<template>
	<view class="myNews" @tap="news(item.newsId)">
		<view class="pic">
			<image :src="fn(item.text)" mode="aspectFill">
		</view>
		<view class="text">
			<view class="title">
				{{item.ntitle}}
			</view>
			<view class="info" v-if="!item.looktime">
				<text>作者:{{item.name}}</text>
				<text>{{item.heat}}浏览</text>
			</view>
			<view class="info" v-else>
				<text>{{item.looktime}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "myNews",
		data() {
			return {

			};
		},
		props: {
			item: {
				type: Object,
				default () {
					return {
						ntitle: "小李天天开心",
						name: "小李",
						heat: 0,
						picurl: "../../static/images/nopic.jpg"
					}
				}
			}
		},
		methods: {
			// 截取富文本img方法
			fn(str) {
				var data;
				str.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/, function(match, capture) {
					data = capture;
				});
				return data ?? "../../static/images/nopic.jpg"
			},
			news(id) {
				uni.navigateTo({
					url: "/pages/news/news?id=" + id
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.myNews {
		display: flex;
		box-sizing: border-box;
		padding: 6px 20px;
		background-color: #fff;

		.pic {
			width: 230rpx;
			height: 160rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.text {
			flex: 1;
			padding-left: 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.title {
				font-size: 36rpx;
				color: #333;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden; //溢出内容隐藏
				text-overflow: ellipsis; //文本溢出部分用省略号表示
				display: -webkit-box; //特别显示模式
				-webkit-line-clamp: 2; //行数
				line-clamp: 2;
				-webkit-box-orient: vertical; //盒子中内容竖直排列			
			}

			.info {
				font-size: 26rpx;
				color: #999;

				text {
					padding-right: 30rpx;
				}
			}
		}
	}
</style>
