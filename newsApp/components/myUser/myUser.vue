<template>
	<view class="user">

		<view v-if="name" class="userInfo" @click="userInfo">
			<image src="../../static/images/user.png" mode="aspectFill">
				<view class="userName">{{name}}</view>
		</view>
		<view v-else class="userInfo" @click="loginClick()">
			<image src="../../static/images/user.png" mode="aspectFill">
				<view class="userName">请登录</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from "vuex"

	import store from '@/store/index.js'
	export default {
		data() {
			return {
			};
		},
		computed: {
			...mapGetters("user", {
				name: "getName",
			})
		},
		methods: {
			loginClick() {
				uni.navigateTo({
					url: "/pages/user/login"
				})
			},
			userInfo() {
				uni.showActionSheet({
					itemList: ['修改资料', '修改密码', '退出登录'],
					success: function(res) {
						if (res.tapIndex + 1 == 1) {
							uni.navigateTo({
								url: "/pages/user/updateUser"
							})
						} else if (res.tapIndex + 1 == 2) {
							uni.navigateTo({
								url: "/pages/user/updatePassword"
							})
						} else if (res.tapIndex + 1 == 3) {
							uni.showToast({
								title: "退出成功",
							})
							uni.removeStorageSync('name');
							uni.removeStorageSync('role');
							uni.removeStorageSync('uid');
							store.commit("user/saveName", "")
							store.commit("user/saveRole", "")
						}
					}
				});
			}
		}
	}
</script>

<style lang="less">
	.user {
		.userInfo {
			padding: 10rpx 0 20rpx;
			// padding-bottom: 20rpx;
			background: #55ff7f;
			color: #fff;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			image {
				width: 200rpx;
				height: 200rpx;
			}

			.userName {
				font-size: 36rpx;
				padding-top: 20rpx;
				color: #fff;
			}
		}
	}
</style>
