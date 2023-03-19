<template>
	<view class="login">
		<view v-if="!flag" class="inputBox">
			<input class="input" type="text" v-model="name" placeholder="请输入用户名" />
		</view>
		<view class="inputBox">
			<input class="input" type="text" v-model="phone" placeholder="请输入手机号" />
		</view>
		<view class="inputBox">
			<input class="input" password type="text" v-model="password" placeholder="请输入密码" />
		</view>
		<view class="loginBtn" @click="loginClick()">{{title}}</view>
		<view v-if="flag" class="registerBtn" @click="btnClick()">没有账号？去注册</view>
		<view v-else class="registerBtn" @click="btnClick()">以有账号？去登录</view>
	</view>
</template>

<script>
	import {
		unifyAdd,unify
	} from "@/service/api/unify.js"
	import {
		login
	} from "@/service/api/pro.js"
	import store from '@/store/index.js'
	export default {
		data() {
			return {
				name: "",
				phone: "",
				password: "",
				flag: true
			}
		},
		computed: {
			title() {
				uni.setNavigationBarTitle({
					title: this.flag ? "欢迎登录" : "欢迎注册"
				})
				return this.flag ? "登录" : "注册"
			}
		},
		methods: {
			// 登录按钮
			loginClick() {
				if (!this.check()) return
				if (this.flag) this.login()
				else this.register()
			},
			// 登录注册切换
			btnClick() {
				this.flag = !this.flag
				this.name = ""
				this.phone = ""
				this.password = ""
			},
			// 表单校验
			check() {
				var phoneReg = /(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/;
				if (!phoneReg.test(this.phone)) {
					uni.showToast({
						title: "手机号不正确",
						icon: "error"
					})
					return false
				}
				if (this.password == "") {
					uni.showToast({
						title: "密码不能为空",
						icon: "error"
					})
					return false
				}
				return true
			},
			// 登录实现
			async login() {
				let res = await login({
					phone: this.phone,
					password: this.password
				})
				if (res.code === 200 && res.data.length > 0) {
					uni.setStorageSync("name", res.data[0].name)
					uni.setStorageSync("uid", res.data[0].id)
					uni.setStorageSync("role", res.data[0].role)
					store.commit("user/saveName", res.data[0].name)
					store.commit("user/saveRole", res.data[0].role)
					uni.showToast({
						title: "登录成功",
						success: () => {
							setTimeout(() => {
								uni.navigateBack();
							}, 1000)
						}
					})
				} else {
					uni.showToast({
						title: "手机号或密码错误",
						icon: "error"
					})
				}
			},
			// 注册实现
			async register() {
				// 用户名不能为空
				if (this.name == "") {
					uni.showToast({
						title: "用户名不能为空",
						icon: "error"
					})
					return
				}
				// 手机号是否存在
				let phoneRes = await unify({
					name:"user",
					all:true,
					data:{
						phone: this.phone
					}
				})
				if (phoneRes.code===200) {
					uni.showToast({
						title: "手机号已注册",
						icon: "error"
					})
					return
				}
				// 开始注册
				let userRes = await unifyAdd({
					name: "user",
					data: {
						name: this.name,
						phone: this.phone,
						password: this.password
					}
				})
				if (userRes.data.affectedRows === 1) {
					uni.showToast({
						title: "注册成功",
					})
				}
			}
		}
	}
</script>

<style lang="less">
	.login {
		box-sizing: border-box;
		border: 0px solid;

		.inputBox {
			padding: 50rpx 0 0;

			.input {
				margin: 0 auto;
				height: 100rpx;
				width: 85%;
				border-bottom: .01rpx solid #efefef;
			}

		}


		.loginBtn {
			margin: 50rpx auto;
			border-radius: 50rpx;
			width: 85%;
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			background-color: #55ff7f;
		}

		.registerBtn {
			text-align: center;
			color: rgba(0, 0, 0, .4);
		}
	}
</style>
