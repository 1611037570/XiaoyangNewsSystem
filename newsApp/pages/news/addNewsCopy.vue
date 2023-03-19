<template>
	<view class="container">
		<view class="page-body">
			<view class='wrapper'>
				<view class='toolbar' @tap="format" style="height: 120px;overflow-y: auto;">
					<view :class="formats.bold ? 'ql-active' : ''" class="iconfont icon-zitijiacu" data-name="bold">
					</view>
					<!-- <view :class="formats.italic ? 'ql-active' : ''" class="iconfont icon-zitixieti" data-name="italic"></view> -->
					<view :class="formats.underline ? 'ql-active' : ''" class="iconfont icon-zitixiahuaxian"
						data-name="underline"></view>
					<view :class="formats.strike ? 'ql-active' : ''" class="iconfont icon-zitishanchuxian"
						data-name="strike"></view>
					<view :class="formats.align === 'left' ? 'ql-active' : ''" class="iconfont icon-zuoduiqi"
						data-name="align" data-value="left"></view>
					<view :class="formats.align === 'center' ? 'ql-active' : ''" class="iconfont icon-juzhongduiqi"
						data-name="align" data-value="center"></view>
					<view :class="formats.align === 'right' ? 'ql-active' : ''" class="iconfont icon-youduiqi"
						data-name="align" data-value="right"></view>
					<view :class="formats.align === 'justify' ? 'ql-active' : ''" class="iconfont icon-zuoyouduiqi"
						data-name="align" data-value="justify"></view>
					<view :class="formats.lineHeight ? 'ql-active' : ''" class="iconfont icon-line-height"
						data-name="lineHeight" data-value="2"></view>
					<view :class="formats.letterSpacing ? 'ql-active' : ''" class="iconfont icon-Character-Spacing"
						data-name="letterSpacing" data-value="2em"></view>
					<view :class="formats.marginTop ? 'ql-active' : ''" class="iconfont icon-722bianjiqi_duanqianju"
						data-name="marginTop" data-value="20px"></view>
					<view :class="formats.previewarginBottom ? 'ql-active' : ''"
						class="iconfont icon-723bianjiqi_duanhouju" data-name="marginBottom" data-value="20px"></view>
					<view class="iconfont icon-clearedformat" @tap="removeFormat"></view>
					<view :class="formats.fontFamily ? 'ql-active' : ''" class="iconfont icon-font"
						data-name="fontFamily" data-value="Pacifico"></view>
					<view :class="formats.fontSize === '24px' ? 'ql-active' : ''" class="iconfont icon-fontsize"
						data-name="fontSize" data-value="24px"></view>

					<view :class="formats.color === '#0000ff' ? 'ql-active' : ''" class="iconfont icon-text_color"
						data-name="color" data-value="#0000ff"></view>
					<view :class="formats.backgroundColor === '#00ff00' ? 'ql-active' : ''"
						class="iconfont icon-fontbgcolor" data-name="backgroundColor" data-value="#00ff00"></view>

					<view class="iconfont icon-date" @tap="insertDate"></view>
					<view class="iconfont icon--checklist" data-name="list" data-value="check"></view>
					<view :class="formats.list === 'ordered' ? 'ql-active' : ''" class="iconfont icon-youxupailie"
						data-name="list" data-value="ordered"></view>
					<view :class="formats.list === 'bullet' ? 'ql-active' : ''" class="iconfont icon-wuxupailie"
						data-name="list" data-value="bullet"></view>
					<view class="iconfont icon-undo" @tap="undo"></view>
					<view class="iconfont icon-redo" @tap="redo"></view>

					<view class="iconfont icon-outdent" data-name="indent" data-value="-1"></view>
					<view class="iconfont icon-indent" data-name="indent" data-value="+1"></view>
					<view class="iconfont icon-fengexian" @tap="insertDivider"></view>
					<view class="iconfont icon-charutupian" @tap="insertImage"></view>
					<view :class="formats.header === 1 ? 'ql-active' : ''" class="iconfont icon-format-header-1"
						data-name="header" :data-value="1"></view>
					<view :class="formats.script === 'sub' ? 'ql-active' : ''" class="iconfont icon-zitixiabiao"
						data-name="script" data-value="sub"></view>
					<view :class="formats.script === 'super' ? 'ql-active' : ''" class="iconfont icon-zitishangbiao"
						data-name="script" data-value="super"></view>
					<view class="iconfont icon-shanchu" @tap="clear"></view>
					<view :class="formats.direction === 'rtl' ? 'ql-active' : ''" class="iconfont icon-direction-rtl"
						data-name="direction" data-value="rtl"></view>
					<view @tap="aaa">发布</view>
				</view>

				<view class="editor-wrapper">
					<editor id="editor" class="ql-container" placeholder="开始输入..." showImgSize showImgToolbar
						showImgResize @statuschange="onStatusChange" :read-only="readOnly" @ready="onEditorReady"
						@input="getText">
					</editor>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	// import url from '../../utils/api.js'
	export default {
		data() {
			return {
				readOnly: false,
				formats: {},
				editorCtx: "",
				test: `<h1 style="text-align: center;">1</h1><p style="text-align: left;">hello world</p>`
			}
		},
		methods: {
			aaa() {

				let a = uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context
					console.log(res.context);
				}).exec()
				console.log(this.editorCtx);
			},

			readOnlyChange() {
				this.readOnly = !this.readOnly
			},
			onEditorReady() {
				console.log('00000000000000')
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context
					let EContent = {
						html: this.test
					}
					this.editorCtx.setContents(EContent);
				}).exec()
			},
			getText(e) { //获取数据
				var that = this;
				getApp().globalData.editor = e.detail.html
				// e.detail.html = 1111
				console.log(e.detail); //带标签内容
				// console.log(e.detail.text);//纯文本内容
			},
			undo() {
				this.editorCtx.undo()
			},
			redo() {
				this.editorCtx.redo()
			},
			format(e) {
				let {
					name,
					value
				} = e.target.dataset
				if (!name) return
				// console.log('format', name, value)
				this.editorCtx.format(name, value)
			},
			onStatusChange(e) {
				const formats = e.detail
				this.formats = formats
			},
			insertDivider() {
				this.editorCtx.insertDivider({
					success: function() {
						console.log('insert divider success')
					}
				})
			},
			clear() {
				this.editorCtx.clear({
					success: function(res) {
						console.log("clear success")
					}
				})
			},
			removeFormat() {
				this.editorCtx.removeFormat()
			},
			insertDate() {
				const date = new Date()
				const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
				this.editorCtx.insertText({
					text: formatDate
				})
			},
			insertImage() {
				// var that = this;
				// uni.chooseImage({
				// 	count: 1,
				// 	success: (res) => {
				// 		console.log('insert image success')
				// 		const tempFilePaths = res.tempFilePaths;
				// 		uni.uploadFile({
				// 			url: url.uploadimageEider,
				// 			filePath: tempFilePaths[0],
				// 			name: 'image',
				// 			success: (uploadFileRes) => {
				// 				 let data=JSON.parse(uploadFileRes.data)
				// 				console.log(data,"编辑详情的时候返回照片地址")
				// 				var url=data.ip + data.data[0]
				// 				if(data.errno=="0"){
				// 					that.editorCtx.insertImage({
				// 						src: url,
				// 						alt: '图像',
				// 						success: function() {
				// 						}
				// 					})
				// 				}else{
				// 					that.showToast(back.msg)
				// 				}
				// 			},
				// 			fail:() =>{
				// 				uni.hideLoading();
				// 				that.showToast("图片上传失败，请联系开发！")
				// 			}
				// 		});
				// 	}
				// })
				let image;
				let that = this;
				uni.chooseImage({
					count: 1, // 限制1次只能选择1张
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						image = res.tempFilePaths[0];
						// 上传完成后插入到内容中
						that.editorCtx.insertImage({
							src: image, // 此处实际需要先上传到服务器，获得真实地址后再插入到编辑器中，否则需要发布到后台时自行过滤、替换
							alt: '图片',
							success: function(e) {}
						});
					}
				});
			}
		},
		onLoad() {
			// uni.loadFontFace({
			// 	family: 'Pacifico',
			// 	source: 'url("https://sungd.github.io/Pacifico.ttf")'
			// })
		},
	}
</script>

<style>
	/* 引入样式 */
	@import "./addNews.css";

	.page-body {
		height: 800rpx;
		width: 733rpx;
		margin: 0 auto;
		border-radius: 12rpx;
		background-color: #FFFFFF;
	}

	.wrapper {
		height: 300rpx;
	}

	.editor-wrapper {
		background-color: #FFFFFF;
		height: 500rpx;
	}

	.iconfont {
		display: inline-block;
		padding: 8px 8px;
		width: 24px;
		height: 24px;
		cursor: pointer;
		font-size: 20px;
	}

	.toolbar {
		box-sizing: border-box;
		border-bottom: 0;
		font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
	}

	.ql-container {
		box-sizing: border-box;
		padding: 12px 15px;
		width: 100%;
		min-height: 30vh;
		height: 100%;
		margin-top: 20px;
		font-size: 16px;
		line-height: 1.5;
	}

	.ql-active {
		color: #06c;
	}
</style>
