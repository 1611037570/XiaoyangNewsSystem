<template>
  <div class="box" style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      class="editor"
      style="max-height: 100%; height: 80%; overflow-y: hidden"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
    />
  </div>
</template>

<script setup lang="ts">
import "@wangeditor/editor/dist/css/style.css" // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-vue"

// 定义菜单 class
const editorRef = shallowRef() // 编辑器实例，必须用 shallowRef
const mode = "simple"
// 内容 HTML
const valueHtml = ref("<p>hello</p>")

// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    valueHtml.value = "<p>模拟 Ajax 异步设置内容</p>"
  }, 1500)
})
const toolbarConfig = {
  toolbarKeys: [
    "bold",
    "code",
    "clearStyle",
    "color",
    "fontSize",
    "justifyLeft",
    "justifyRight",
    "justifyCenter",
    "header2",
    "todo",
    "redo",
    "undo",
    "fullScreen",
    "imageWidth50",
    "codeBlock",
    "emotion",
    "bulletedList",
    "numberedList"
  ]
}
const editorConfig = { placeholder: "请输入内容..." }

const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
  // console.log("查看所有菜单列表 ", editor.getAllMenuKeys())
}
// 组件销毁时，也及时销毁编辑器
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
