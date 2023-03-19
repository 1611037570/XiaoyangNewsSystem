<template>
	<view class="newsbox">
		<view class="news">
			<myNews v-for="item in news" :item="item">
				{{item}}
			</myNews>
		</view>
		<view class="loading" v-if="loading==2">没有更多了~~</view>
	</view>
</template>

<script>
	export default {
		name: "myNewsList",
		data() {
			return {
				recommends: [],
				loading: 0,
				index: 0,
			};
		},
		props: {
			news: {
				default: []
			},
		},
		methods: {
			// 截取富文本img方法
			fn(str) {
				var data;
				str.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/, function(match, capture) {
					data = capture;
				});
				return "../../static/images/nopic.jpg"
			}
		},
	}
</script>

<style lang="less" scoped>
	.loading {
		height: 100px;
		text-align: center;
		width: 100%;
	}

	.swiper-container {
		margin: 120rpx 0 15px 0 !important;
		width: 100%;
		height: 100%;
	}

	.swiper-slide {
		border-radius: 20rpx;
		width: 70% !important;
		margin: 0 auto;
		height: 300rpx;
		max-height: 300px !important;
		text-align: center;
		font-size: 18px;

		/* Center slide text vertically */
		display: -webkit-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		-webkit-box-align: center;
		-ms-flex-align: center;
		-webkit-align-items: center;
		align-items: center;
		transition: 300ms;
		transform: scale(0.8);

		.recommend {
			position: relative;
			box-sizing: border-box;
			height: 100% - 120rpx !important;
			border-radius: 20rpx;


			image {
				box-sizing: border-box;
				border-radius: 20rpx !important;
				// width: 10%;
				border: 1px solid;
				// height: 100%;
				width: 550rpx;
				height: 340rpx;
			}

			.title {
				position: absolute;
				bottom: 30rpx;
				left: 30rpx;
				color: #fff;
				width: 360rpx;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden; //溢出内容隐藏
				text-overflow: ellipsis; //文本溢出部分用省略号表示
				display: -webkit-box; //特别显示模式
				-webkit-line-clamp: 1; //行数
				line-clamp: 1;
				-webkit-box-orient: vertical; //盒子中内容竖直排列
				text-align: left;
			}

			.info {
				position: absolute;
				bottom: 30rpx;
				right: 30rpx;
				color: #fff;

				.index {

					font-size: 40rpx;
					font-weight: 600;
				}
			}
		}
	}

	.swiper-slide-active,
	.swiper-slide-duplicate-active {
		transform: scale(1);
	}

	/* 设置分页 */
	.swiper-container {
		--swiper-theme-color: #ff6600;
		/* 两种都可以 */
		z-index: 999999;
	}
</style>
