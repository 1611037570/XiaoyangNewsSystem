<template>
	<view class="detail">
		<h1 class="title">{{data.ntitle}}</h1>
		<view class="info">
			<view class="author">编辑：{{data.name}}</view>
			<view class="time">发布日期：{{ time(data.time) }}</view>
		</view>
		<view class="content">
			<rich-text :nodes="data.text"></rich-text>
		</view>
		<view class="description">
			免责声明：本文来自校园新闻创作者发布，不代表校园新闻的观点和立场。
			<br />若有侵犯请及时联系管理员（1611037570@qq.com）进行整改删除，谢谢您的支持。
		</view>
		<view class="bottom">
			<view :class="flag ? 'active' : ''" class="like" @click="like">收藏</view>
			<view class="share" @click="share" :data-clipboard-text="url">分享</view>
		</view>
	</view>
</template>

<script>
	import Clipboard from 'clipboard'
	import {
		unify,
		unifyRenew,
		unifyAdd,
		unifyDel
	} from "@/service/api/unify.js"
	import {
		addlike,
		getlike,
		dellike
	} from '../../api/like.js';
	import dayjs from 'dayjs'
	export default {
		data() {
			return {
				data: {
					ntitle: "",
					name: "",
					text: "",
					time: ""
				},
				url: "",
				flag: false
			};
		},
		async onLoad(config) {
			let res = await unify({
				name: "news",
				data: {
					newsId: config.id
				}
			})
			this.data = res.data[0]
			uni.setNavigationBarTitle({
				title: res.data[0].ntitle
			})
			let heat = 1 + parseInt(this.data.heat)
			await unifyRenew({
				name: "news",
				data: {
					newsId: config.id,
					heat
				}
			})
			this.saveHistory()
			let likeres = await unify({
				name: "likes",
				all: true,
				data: {
					strict: {
						"likes.uid": uni.getStorageSync("uid"),
						"likes.newsId": this.data.newsId
					}
				}
			})
			if (likeres.code === 200) this.flag = true
		},
		methods: {
			saveHistory() {
				let newsArr = uni.getStorageSync("news") || []
				let looktime = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss');
				let item = {
					newsId: this.data.newsId,
					ntitle: this.data.ntitle,
					text: this.data.text,
					looktime
				}
				let index = newsArr.findIndex(i => i.newsId == this.data.newsId)
				if (index >= 0) newsArr.splice(index, 1)
				newsArr.unshift(item)
				newsArr = newsArr.slice(0, 10)
				uni.setStorageSync("news", newsArr)
			},
			time(time) {
				return dayjs(time).format('YYYY-MM-DD HH:mm:ss');
			},
			async like() {
				let uid = uni.getStorageSync("uid") // 获取用户ID
				let data = {
					name: "likes",
					all: true,
					data: {
						strict: {
							"likes.uid": uni.getStorageSync("uid"),
							"likes.newsId": this.data.newsId
						}
					}
				}
				// 是否登录
				if (!uid) {
					uni.showToast({
						title: "请先登录",
						icon: "error"
					})
					return
				}
				let res = await unify(data)
				console.log(res.data);
				if (res.code !== 400) {
					let r = await unifyDel({
						name: "likes",
						config: res.data[0].id
					})
					if (r.code === 200) {
						this.flag = false
						uni.showToast({
							title: "已取消收藏",
						})
					}
				} else {
					let res = await unifyAdd({
						name: "likes",
						data: {
							uid: uni.getStorageSync("uid"),
							newsId: this.data.newsId
						}
					})
					console.log(res);
					if (res.code == 200) {
						this.flag = true
						uni.showToast({
							title: "收藏成功",
						})
					}
				}

			},
			share() {
				this.url = "点击链接看来自" + this.data.name +
					"创作的《" + this.data.ntitle + `》
——————
` + window.location.href + `
` + "了解最新校园新闻，就去校园新闻网！"
				const clipboard = new Clipboard(".share")
				clipboard.on('success', function(e) {
					uni.showToast({
						title: "以复制新闻链接",
					})
					e.clearSelection();
					clipboard.destroy()
				});
			}
		}
	}
</script>


<style lang="less">
	.detail {
		padding: 30rpx;

		.title {
			font-size: 46rpx;
			color: #333;
		}

		.info {
			background: #F6F6F6;
			padding: 20rpx;
			font-size: 25rpx;
			color: #666;
			display: flex;
			justify-content: space-between;
			margin-top: 13px;

		}

		.content {

			margin: 20rpx 0;

			h1 {
				font-size: 41rpx
			}

			img {
				max-width: 100%;
				box-sizing: border-box;
				padding: 10rpx;
				border-radius: 20rpx;
			}
		}

		.description {
			background: #FEF0F0;
			font-size: 26rpx;
			padding: 20rpx;
			color: #F89898;
			line-height: 1.8em;
			margin-bottom: 88rpx;
		}
	}

	.bottom {
		position: fixed;
		bottom: 0;
		height: 88rpx;
		line-height: 88rpx;
		width: 100%;
		left: 0;
		background-color: #fff;

		.like,
		.share {
			position: absolute;
			bottom: 0;
			width: 50%;
			text-align: center;
		}

		.active {
			color: #55ff7f;
		}

		.like {
			left: 0;
		}

		.share {
			right: 0;
		}

	}
</style>
