<template>
	<view>
		<view class="inputBox">
			<input class="input" type="password" v-model="oldPassword" placeholder="请输入旧密码" />
		</view>
		<view class="inputBox">
			<input class="input" type="password" v-model="newPassword" placeholder="请输入新密码" />
		</view>
		<view class="btn" @click="updatePassWord()">修改密码</view>
	</view>
</template>

<script>
	import {
		unify,
		unifyRenew
	} from "@/service/api/unify.js"
	export default {
		data() {
			return {
				oldPassword: "",
				newPassword: ""
			}
		},
		methods: {
			async updatePassWord() {
				if (!this.oldPassword && !this.newPassword) {
					uni.showToast({
						title: "新旧密码必填",
						icon: "error"
					})
					return false
				}
				let res = await unify({
					name: "user",
					data: {
						id: uni.getStorageSync("uid")
					}
				})
				console.log(res.data[0].password);
				if (res.data[0].password == this.oldPassword) {
					let passwordRes = await unifyRenew({
						name: "user",
						data: {
							id: uni.getStorageSync("uid"),
							password: this.newPassword
						}
					})
					if (passwordRes.data.affectedRows === 1) {
						uni.showToast({
							title: "修改成功",
						})
					} else {
						uni.showToast({
							title: "发生错误，请重试",
							icon: "error"
						})
					}
				} else {
					uni.showToast({
						title: "旧密码错误",
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
