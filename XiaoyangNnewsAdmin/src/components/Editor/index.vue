<template>
  <div class="box" style="border: 1px solid #ccc">
    <input style="display: none" ref="fileRef" type="file" name="" id="" />
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      class="editor"
      style="max-height: 100%; height: 80%; overflow-y: hidden"
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
import { Boot } from "@wangeditor/editor"
import { toolbarKeys, editorConfig, mode } from "./config.js"
import { innerTextBtn } from "./innerTextBtn.js"

// 自定义引入
import { innerImg } from "./innerImg.js"
import { useRoute } from "vue-router"
import { unify } from "@/service/api/unify"
/*
 * 这一大坨代码目前不会优化
 * 二、innerImgClick需要参数，已getvalue可以获取参数，问题在于不会传
 */
import type { IButtonMenu, IDomEditor, ISelectMenu } from "@wangeditor/editor"
class MyButtonMenu implements IButtonMenu {
  constructor() {
    this.title = "插入图片" // 自定义菜单标题
    this.iconSvg = `<svg viewBox="0 0 1024 1024"><path d="M828.708571 585.045333a48.761905 48.761905 0 0 0-48.737523 48.761905v18.529524l-72.143238-72.167619a135.972571 135.972571 0 0 0-191.585524 0l-34.133334 34.133333-120.880762-120.953905a138.898286 138.898286 0 0 0-191.585523 0l-72.167619 72.167619V292.400762a48.786286 48.786286 0 0 1 48.761904-48.761905h341.23581a48.737524 48.737524 0 0 0 34.474667-83.285333 48.737524 48.737524 0 0 0-34.474667-14.287238H146.236952A146.212571 146.212571 0 0 0 0 292.400762v585.289143A146.358857 146.358857 0 0 0 146.236952 1024h584.996572a146.212571 146.212571 0 0 0 146.236952-146.310095V633.807238a48.786286 48.786286 0 0 0-48.761905-48.761905zM146.261333 926.45181a48.737524 48.737524 0 0 1-48.761904-48.761905v-174.128762l141.409523-141.458286a38.497524 38.497524 0 0 1 53.126096 0l154.526476 154.624 209.627428 209.724953H146.236952z m633.734096-48.761905c-0.073143 9.337905-3.145143 18.383238-8.777143 25.843809l-219.843048-220.94019 34.133333-34.133334a37.546667 37.546667 0 0 1 53.613715 0l140.873143 141.897143V877.714286zM1009.615238 160.231619L863.329524 13.897143a48.737524 48.737524 0 0 0-16.091429-10.24c-11.849143-4.87619-25.161143-4.87619-37.059047 0a48.761905 48.761905 0 0 0-16.067048 10.24l-146.236952 146.334476a49.005714 49.005714 0 0 0 69.217523 69.241905l62.902858-63.390476v272.627809a48.761905 48.761905 0 1 0 97.475047 0V166.083048l62.902857 63.390476a48.737524 48.737524 0 0 0 69.217524 0 48.761905 48.761905 0 0 0 0-69.241905z"></path></svg>`
    this.tag = "button"
  }
  title: string
  iconSvg?: string | undefined
  tag: string
  getValue(editor: IDomEditor): string | boolean {
    return false
  }
  isActive(editor: IDomEditor): boolean {
    return false
  }
  isDisabled(editor: IDomEditor): boolean {
    return false
  }
  // 点击菜单时触发的函数
  exec(editor: IDomEditor, value: any) {
    if (this.isDisabled(editor)) return
    innerImgClick()
  }
}
const inImg = {
  key: "inImg",
  factory() {
    return new MyButtonMenu()
  }
}

class MySelectMenu implements ISelectMenu {
  // TS 语法
  // class MySelectMenu {                       // JS 语法

  constructor() {
    ;(this.title = "My Select Menu"), (this.tag = "select")
    this.width = 60
  }
  selectPanelWidth?: number | undefined
  title: string
  iconSvg?: string | undefined
  tag: string
  width?: number | undefined

  // 下拉框的选项
  getOptions(editor: IDomEditor) {
    // TS 语法
    // getOptions(editor) {            // JS 语法
    const options = [
      {
        value: "beijing",
        text: "北京",
        styleForRenderMenuList: { "font-size": "32px", "font-weight": "bold" }
      },
      { value: "shanghai", text: "上海", selected: true },
      { value: "shenzhen", text: "深圳1" }
    ]
    return options
  }

  isActive(editor: IDomEditor): boolean {
    return false
  }

  getValue(editor: IDomEditor): string | boolean {
    // return "beijing" // 匹配 options 其中一个 value
    return false
  }

  isDisabled(editor: IDomEditor): boolean {
    return false
  }

  exec(editor: IDomEditor, value: any) {
    console.log("object :>> ", editor)
    editor.insertText(value) // value 即 this.getValue(editor) 的返回值
    editor.insertText(" ")
  }
}
const a = {
  key: "a",
  factory() {
    return new MySelectMenu()
  }
}
Boot.registerMenu(inImg)
Boot.registerMenu(innerTextBtn)
Boot.registerMenu(a)
// 菜单配置
const toolbarConfig = {
  insertKeys: { index: 0, keys: ["inImg", "innerTextBtn", "a"] },
  toolbarKeys
}
const editorRef = shallowRef() // 编辑器实例，必须用 shallowRef

// 初始化内容操作
const text = ref("") // 内容 HTML
const route = useRoute() // 路由
let newsId // 新闻ID
if (route.query.newsId) {
  // 编辑模式
  newsId = route.query.newsId
  let res = await unify({
    name: "news",
    strict: true,
    data: { newsId }
  })
  if (res.code !== 200) ElMessage.error("获取新闻信息错误请重试")
  text.value = res.data[0].text
} else {
  // 新建模式
}
// 上传图片操作
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
// 创建富文本实例操作
const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
  // console.log("查看所有菜单列表 ", editor.getAllMenuKeys())
}
// 销毁编辑器操作
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
</script>
<style lang="less" scoped>
.box {
  border: 22px solid;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.editor {
  border: 1px solid;
  height: 100%;
}
</style>
