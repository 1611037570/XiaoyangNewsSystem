<template>
	<view>
		<view class="inputBox">
			<input class="input" type="text" v-model="name" placeholder="请输入姓名" />
		</view>
		<view class="btn" @click="updateInfo()">修改资料</view>
	</view>
</template>

<script>
	import {
		unifyRenew
	} from "@/service/api/unify.js"
	import store from '@/store/index.js'
	export default {
		data() {
			return {
				name: ""
			}
		},
		mounted() {
			this.name = uni.getStorageSync("name")
		},
		methods: {
			async updateInfo() {
				if (!this.name) {
					uni.showToast({
						title: "资料不能为空",
						icon: "error"
					})
					return false
				}

				let res = await unifyRenew({
					name:"user",
					data:{
					id: uni.getStorageSync("uid"),
					name: this.name
				}
				})
				if (res.data.affectedRows === 1) {
					uni.setStorageSync("name", this.name)
					store.commit('user/saveName', this.name)
					uni.showToast({
						title: "修改成功",
					})
				} else {
					uni.showToast({
						title: "发生错误，请重试",
						icon: "error"
					})
				}
			}
		}
	}
</script>


<style lang="less">
	.inputBox {
		padding: 50rpx 0 0;

		.input {
			margin: 0 auto;
			height: 100rpx;
			width: 85%;
			border-bottom: .01rpx solid #efefef;
		}
	}

	.btn {
		margin: 50rpx auto;
		border-radius: 50rpx;
		width: 85%;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		background-color: #55ff7f;
	}
</style>
