<template>
  <div class="boxs">
    <input style="display: none" ref="fileRef" type="file" name="" id="" />
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <AtionBar v-model:text="text"></AtionBar>
    <Editor
      class="editor"
      style="max-height: 100%; height: 50%; overflow-y: hidden"
      v-model="text"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
    />
  </div>
</template>

<script setup lang="ts">
// wangeditor所需
import "@wangeditor/editor/dist/css/style.css"
import { Editor, Toolbar } from "@wangeditor/editor-for-vue"
import { toolbarKeys, editorConfig, mode } from "./config.js"
// 自定义引入
import { innerImg } from "./innerImg.js"
import { getCurrentInstance, onBeforeUnmount, ref, shallowRef } from "vue"

const { proxy }: any = getCurrentInstance()
// 全局事件
proxy.$bus.on("innerImgClick", (row: any) => {
  innerImgClick()
})
// 菜单配置
const toolbarConfig = {
  insertKeys: { index: 0, keys: ["inImgBtn", "innerTextBtn"] },
  toolbarKeys
}
const editorRef = shallowRef() // 编辑器实例，必须用 shallowRef

// 初始化内容操作
const text = ref("") // 内容 HTML

// 上传图片操作
<<<<<<< HEAD
const fileRef = ref() // 创建上传文件的引用
const innerImgClick = async () => {
  // 点击上传图片按钮
  fileRef.value.click()
  // 上传图片回调
  fileRef.value.onchange = async function () {
    if (this.files.length === 0) return // 没有选择文件
    const file = this.files[0] // 获取文件
    let image: any = await innerImg(file) // 将文件转换为经过压缩和等比裁切的 base64 图片
    editorRef.value.dangerouslyInsertHtml(
      // 将图片插入到编辑器中
      `<p style="text-align: center;">
        <img style="width: ${image.width}px;height:${image.height}px" src="${image.src}"></img>
      </p>`
    )
  }
}

=======
const fileRef = ref() // 上传文件ref
const innerImgClick = async () => {
  fileRef.value.click() // 打开传输层
  fileRef.value.onchange = async function () {
    if (this.files.length === 0) return // 没有文件
    const file = this.files[0]
    let image: any = await innerImg(file) // 执行上传图片过程
    editorRef.value.dangerouslyInsertHtml(
      `<p  style="text-align: center;"><img style="width: ${image.width}px;height:${image.height}px" src="${image.src}"></img></p>`
    )
  }
}
>>>>>>> 6318332f5c1ce97d497e2cc7ee3769e2dc08ab44
// 创建富文本实例操作
const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
  // console.log("查看所有菜单列表 ", editor.getAllMenuKeys())
}
// 销毁编辑器操作
onBeforeUnmount(() => {
  proxy.$bus.off("innerImgClick")
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
</script>
<style lang="less" scoped>
.boxs {
  width: 100%;
  height: 100%;
}
.editor {
  height: 100%;
}
</style>
