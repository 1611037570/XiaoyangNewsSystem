<template>
	<view class="container">
		<img ref="imgRef" :src="src" alt="" style="display: none;">
		<view class='wrapper'>
			<!-- 菜单栏第一行 -->
			<view class='toolbar' @tap="format">
				<!-- 图片 -->
				<view class="iconfont icon-charutupian" @tap="insertImage"></view>
				<!-- 标题 -->
				<view :class="formats.header === 1 ? 'ql-active' : ''" class="iconfont icon-format-header-1"
					data-name="header" :data-value="1"></view>

				<!-- 左对齐 -->
				<view :class="formats.align === 'left' ? 'ql-active' : ''" class="iconfont icon-zuoduiqi"
					data-name="align" data-value="left"></view>
				<!-- 居中对齐 -->
				<view :class="formats.align === 'center' ? 'ql-active' : ''" class="iconfont icon-juzhongduiqi"
					data-name="align" data-value="center"></view>
				<!-- 右对齐 -->
				<view :class="formats.align === 'right' ? 'ql-active' : ''" class="iconfont icon-youduiqi"
					data-name="align" data-value="right"></view>
				<!-- 加粗 -->
				<view :class="formats.bold ? 'ql-active' : ''" class="iconfont icon-zitijiacu" data-name="bold">
				</view>
				<view class="iconfont icon-fontsize" @click="insertText"></view>
				<!-- 撤回和前进 -->
				<view class="iconfont icon-undo" @tap="undo"></view>
				<view class="iconfont icon-redo" @tap="redo"></view>
				<!-- 删除 -->
				<view class="iconfont icon-shanchu" @tap="clear"></view>
			</view>
			<!-- 菜单栏第二行 -->
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						新闻分类
					</view>
					<view class="uni-list-cell-db">
						<picker @change="bindPickerChange" :value="index" range-key="title" :range="navs">
							<view v-if="navs[index].title" class="uni-input">{{navs[index].title }}</view>
						</picker>
					</view>
				</view>
				<view class="newsbtn" @tap="newsAdd">发布新闻</view>
			</view>

		</view>
		<view class="box">
			<view class="flag-l">《</view>
			<input class="inputs" type="text" v-model="title" placeholder="请输入新闻标题" />
			<view class="flag-r">》</view>
		</view>
		<view class="editor-wrapper">
			<editor id="editor" class="ql-container" placeholder="请输入新闻内容..." showImgSize showImgToolbar showImgResize
				@statuschange="onStatusChange" :read-only="readOnly" @ready="onEditorReady" @input="getText">
			</editor>
		</view>
	</view>
</template>

<script>
	import {
		unify
	} from "@/service/api/unify.js"
	import {
		add
	} from "@/service/api/pro.js"
	import {
		getNotes
	} from "@/utils/note.js"
	import dayjs from 'dayjs'
	export default {
		data() {
			return {
				// 富文本自带数据
				readOnly: false,
				formats: {},
				editorCtx: "",
				title: "", // 新闻标题
				text: "", // 新闻内容
				src: "",
				// 新闻分类
				navs: [{
					id: -1,
					title: ""
				}],
				index: 0, // 新闻下标,
				uid: null, // 作者ID
				role: null, // 作者权限
			}
		},
		// 初始化
		async mounted() {
			this.uid = uni.getStorageSync("uid") // 获取用户ID
			this.role = uni.getStorageSync("role") // 获取用户权限
			if (!this.uid && this.role == 2) {
				uni.showToast({
					title: "未拥有权限！",
					success: () => {
						setTimeout(() => {
							uni.reLaunch({
								url: "/pages/user/user"
							})
						}, 500)
					}
				})
			}
			// 获取导航栏数据
			let res = await unify({
				name: "nav"
			})
			if (res.code === 200) this.navs = res.data
		},
		methods: {
			// 转换为图片
			transformIamge(file) {
				let thar = this
				return new Promise(function(resolve) {
					let oFReader = new FileReader()
					oFReader.readAsDataURL(file)
					oFReader.onloadend = function(oFRevent) {
						let src = oFRevent.target.result
						thar.src = oFRevent.target.result
						let imgref = thar.$refs["imgRef"]
						imgref.onload = function() {
							resolve({
								width: imgref.naturalWidth,
								height: imgref.naturalHeight,
								image: imgref
							})
						}
						// 异步方式
						// let image = new Image()
						// image.src = src
						// image.onload = function() {
						// 	resolve({
						// 		width: image.width,
						// 		height: image.height,
						// 		image
						// 	})
						// }
					}
				})
			},
			// 压缩图片比例
			compressIamge(file) {
				let compressFlag = false // 图片是否压缩
				let sizeRatio = 0 // 图片压缩宽高比例
				let maxWidth = 750 // 图片最大宽度
				let maxHeight = 600 // 图片最大高度
				let {
					width,
					height,
					image
				} = file
				// 如果图片高度大于最大高度就等比压缩图片的宽度
				if (height > maxHeight && width > maxWidth) {
					compressFlag = true
					sizeRatio = height / maxHeight
					maxWidth = width / sizeRatio
				} else if (width > maxWidth) {
					compressFlag = true
					sizeRatio = width / maxWidth
					maxHeight = height / sizeRatio
				} else if (height > maxHeight) {
					compressFlag = true
					sizeRatio = height / maxHeight
					maxWidth = width / sizeRatio
				}
				// 如果不需要压缩
				if (!compressFlag) {
					maxWidth = width
					maxHeight = height
				}
				return {
					width: maxWidth,
					height: maxHeight,
					image
				}
			},
			// 文件检查
			validateFile(file) {
				const sizeLimit = 10 * 1024 * 1024
				const leaalExts = [".jpg", ".jpeg", ".png"]
				if (file.size > sizeLimit) {
					this.$message.error("文件过大")
					return false
				}
				// toLowerCase 将名字转换为小写
				const name = file.name.toLowerCase()
				// some 检测数组中的元素是否满足指定条件
				// // endsWith 判断当前字符串是否是以指定的子字符串结尾的
				if (!leaalExts.some((ext) => name.endsWith(ext))) {
					this.$message.error("文件类型错误")
					return false
				}
				return true
			},
			// 转为base64
			base64Iamge(file) {
				let {
					width,
					height,
					image
				} = file
				console.log("file :>> ", file)
				// 创建canvas
				const COMPRESSRATIO = 0.65 // 压缩比例 0 - 1
				const canvas = document.createElement("canvas")
				const ctx = canvas.getContext("2d")
				canvas.setAttribute("id", "canvas")
				canvas.width = width
				canvas.height = height
				ctx.clearRect(0, 0, width, height) // 清除画布内所有像素
				ctx.drawImage(image, 0, 0, width, height) // 绘制canvas
				const compressImage = canvas.toDataURL("image/jpeg", COMPRESSRATIO) // 设置压缩类型和压缩比例获取压缩后的文件
				return {
					src: compressImage,
					width,
					height
				}
			},
			// 插入图片
			async insertImage() {
				let that = this;
				uni.chooseImage({
					count: 1, // 限制1次只能选择1张
					// sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sizeType: ['compressed'],
					sourceType: ['album'], //从相册选择
					async success(res) {
						if (!that.validateFile(res.tempFiles[0])) return // 文件检查
						let image = await that.transformIamge(res.tempFiles[0]) // 获取文件图片
						image = that.compressIamge(image) // 等比裁切后的图片
						image = that.base64Iamge(image) // 转换为base64的图片
						that.editorCtx.insertImage({
							src: image.src, // 此处实际需要先上传到服务器，获得真实地址后再插入到编辑器中，否则需要发布到后台时自行过滤、替换
							alt: '图片',
							success: function(e) {}
						});
					}
				});
			},
			// 发布新闻
			async newsAdd() {
				let flag = await this.check()
				if (!flag) return
				// 获取当前时间
				let times = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss');
				// 发布操作
				let res = await add({
					data: {
						uid: this.uid,
						ntitle: this.title,
						heat: 0,
						text: this.text,
						time: times,
						nid: this.navs[this.index].id
					}
				})
				if (res.code === 200) {
					uni.showToast({
						title: "发布成功",
					})
				} else {
					uni.showToast({
						title: "发布失败",
					})
				}
			},
			// 检查新闻配置
			async check() {
				// 标题是否为空
				if (!this.title) {
					uni.showToast({
						title: "标题不能为空",
						icon: "error"
					})
					return false
				}
				// 内容是否为空
				if (!this.text) {
					uni.showToast({
						title: "内容不能为空",
						icon: "error"
					})
					return false
				}
				if (this.navs[this.index].id == -1) {
					uni.showToast({
						title: "分类不能为空",
						icon: "error"
					})
					return false
				}
				// 标题是否重复
				let title = await unify({
					name: "news",
					strict: true,
					data: {
						ntitle: this.title
					}
				})
				if (title.code == 200) {
					uni.showToast({
						title: "新闻标题重复！",
						icon: "error"
					})
					return false
				}
				return true
			},
			// 插入一段文本
			async insertText() {
				let res = await getNotes()
				console.log(res);
				const formatText = `
` + res.text + `
`
				this.editorCtx.insertText({
					text: formatText
				})
			},
			// ---------以下都是uniapp富文本编辑器自带的---------
			// 初始化表单
			onEditorReady() {
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context
					let EContent = {
						html: this.text
					}
					this.editorCtx.setContents(EContent);
				}).exec()
			},
			// 获取表单数据
			getText(e) {
				var that = this;
				getApp().globalData.editor = e.detail.html
				this.text = e.detail.html
			},
			// 状态更改
			onStatusChange(e) {
				const formats = e.detail
				this.formats = formats
			},
			// 更改分类下标
			bindPickerChange: function(e) {
				this.index = e.detail.value
			},
			// 基础事件绑定
			format(e) {
				let {
					name,
					value
				} = e.target.dataset
				if (!name) return
				console.log('format', name, value)
				this.editorCtx.format(name, value)
			},
			// 撤销
			undo() {
				this.editorCtx.undo()
			},
			// 恢复撤销
			redo() {
				this.editorCtx.redo()
			},
			// 清空表单
			clear() {
				this.title = ""
				this.editorCtx.clear({
					success: function(res) {
						console.log("clear success")
					}
				})
			},
		},
	}
</script>

<style>
	/* 引入样式 */
	@import "./addNews.css";

	.box {
		margin-top: 155px;
		position: relative;
	}

	.inputs {
		width: 80%;
		margin: 5px auto 0;
		/* height: 80rpx; */
		font-size: 60rpx;
		color: #55ff7f;
		border: ;
	}

	.flag-l {
		display: inline-block;
		left: 0;
		color: #55ff7f;
		position: absolute;
		font-size: 60rpx;
	}

	.flag-r {
		display: inline-block;
		top: 0;
		color: #55ff7f;
		right: 0;
		position: absolute;
		font-size: 60rpx;
	}

	uni-page-body {
		height: 100%;
	}

	.container {
		width: 100%;
		/* height: 100% !important; */
	}


	.wrapper {
		padding-bottom: 20rpx;
		border-bottom: 1px solid #55ff7f;
		width: 100%;
		position: fixed;
		top: 44px;
		left: 0;
		background-color: #fff;
		z-index: 999;
	}

	uni-page-body {
		height: 0;
		border: aliceblue solid 1px;
	}

	.editor-wrapper {
		box-sizing: border-box;
		background-color: #FFFFFF;
		/* height: 50% - 400rpx; */
		height: 100%;
	}



	.toolbar {
		display: flex;
		justify-content: space-between !important;

		flex-wrap: wrap;
		/* flex-start:  默认从头开始排列*/
		justify-content: flex-start;
		width: 100%;
		background: #fff;

		font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
	}

	.iconfont {
		padding: 8px 8px;
		width: 28px;
		height: 28px;
		cursor: pointer;
		font-size: 26px;
		justify-content: space-around;
		flex: 0 0 15%;
		text-align: center;
	}

	.ql-container {
		padding: 12px 15px;
		width: 100%;
		min-height: 30vh;
		height: 100%;
		font-size: 16px;
		line-height: 1.5;
	}

	.ql-active {
		color: #55ff7f
	}

	.uni-list {
		background-color: #fff;
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;

	}

	.uni-list-cell {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.uni-list-cell-left {
		white-space: nowrap;
		height: 25px;
		padding: 7px 12px;
		line-height: 25px;
		font-size: 36rpx !important;
	}

	.uni-list-cell-db,
	.uni-list-cell-right {
		flex: 1;
	}

	uni-picker {
		position: relative;
		display: block;
		cursor: pointer;
	}

	.uni-input {
		height: 25px;
		padding: 7px 12px;
		line-height: 25px;
		font-size: 36rpx !important;
		background: #fff;
		flex: 1;
	}

	.newsbtn {
		position: absolute;
		right: 20rpx;
		height: 25px;
		line-height: 25px;
		padding: 7px 12px;
		background-color: #55ff7f;
		color: #fff;
		border-radius: 10rpx;
		z-index: 99;
	}
</style>
