<template>
  <div class="box w-e-full-screen-container" style="border: 1px solid #ccc">
    <input style="display: none" ref="fileRef" type="file" name="" id="" />
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editor"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <div class="btn">
      <el-button @click="innerText()">添加内容</el-button>
      <el-button @click="innerImg()">添加图片</el-button>
    </div>
    <div class="add-box">
      <Form class="form" v-bind="formConfig" :formDatas="formDatas"></Form>
      <el-button class="add" @click="addNews()">{{ btn }}新闻</el-button>
    </div>
    <div class="title">
      <span>《</span>
      <input
        placeholder="请输入标题..."
        class="input"
        type="text"
        v-model="title"
      />

      <span>》</span>
    </div>
    <Editor
      style="height: 100%; overflow-y: hidden"
      v-model="html"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="onCreated"
    />
  </div>
</template>

<script>
import { Editor, Toolbar } from "@wangeditor/editor-for-vue"
import { DomEditor } from "@wangeditor/editor"
import { unify } from "@/service/api/unify.js"
import { add, edit } from "@/service/api/pro.js"
import { formConfig } from "./form.config.js"
import dayjs from "dayjs"
import { mapGetters } from "vuex"
export default {
  components: { Editor, Toolbar },
  data() {
    return {
      formConfig: formConfig,
      btn: "发布",
      formDatas: {},
      title: "", // 新闻标题
      nav: "", //新闻分类
      DomEditor,
      editor: null,
      html: "",
      toolbarConfig: {
        toolbarKeys: [
          "header1",
          "header2",
          "header3",
          "justifyLeft",
          "justifyCenter",
          "justifyRight",
          "bold",
          "undo",
          "redo"
        ]
      },
      editorConfig: {
        placeholder: "请输入内容...",
        MENU_CONF: {
          uploadImage: {
            server: "ttp://localhost:80/upload",
            maxFileSize: 10 * 1024 * 1024, // 1M
            customUploadImg: this.update
          }
        }
      },
      mode: "simple"
    }
  },

  props: {
    newsId: {}
  },
  computed: {
    ...mapGetters("unify", {
      config: "getData"
    }),
    ...mapGetters("user", {
      uid: "getUID"
    })
  },
  async created() {
    this.init()
  },

  methods: {
    async addNews() {
      if (this.config.nav == undefined) {
        this.$message.error("分类不能为空")
        return false
      }
      if (this.title == null || this.title == "") {
        this.$message.error("标题不能为空")
        return false
      }
      if (this.html == "<p><br></p>") {
        this.$message.error("内容不能为空")
        return false
      }
      let time = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
      let res
      if (this.btn == "发布") {
        let data = {
          ntitle: this.title,
          text: this.html,
          time,
          heat: 0,
          nid: this.config.nav,
          uid: this.uid
        }
        res = await add({
          name: "news",
          data
        })
      } else {
        let data = {
          newsId: this.newsId,
          ntitle: this.title,
          text: this.html,
          time,
          nid: this.config.nav
        }
        res = await edit({
          name: "news",
          data
        })
      }
      console.log("res :>> ", res)
      if (res.code === 200) this.$message.success(this.btn + "成功！")
      else this.$message.error(this.btn + "失败！")
    },
    /**
     * 洗牌算法
     * @author 杨南南<1611037570@qq.com>
     * 	洗牌算法可以解决随机性问题
     */
    shuffleCards(cards) {
      const c = [...cards]
      for (let j = 0; j < 10; j++) {
        for (let i = c.length; i > 0; i--) {
          const random = Math.floor(Math.random() * i)
          ;[c[random], c[i - 1]] = [c[i - 1], c[random]]
        }
      }
      return c
    },
    // 插入文案
    async innerText() {
      let res = await unify({
        name: "note",
        all: true
      })
      let text = this.shuffleCards(res.data)
      this.editor.dangerouslyInsertHtml(
        `<p  style="text-align: center;">${text[0].text}</p>`
      )
    },
    // 上传图片
    async innerImg() {
      let thar = this
      this.$refs.fileRef.click() // 打开传输层
      this.$refs.fileRef.onchange = async function () {
        if (this.files.length === 0) return // 没有文件
        const file = this.files[0]
        if (!thar.validateFile(file)) return // 文件检查
        let image = await thar.transformIamge(file) // 获取文件图片
        image = thar.compressIamge(image) // 等比裁切后的图片
        image = thar.base64Iamge(image) // 转换为base64的图片
        thar.editor.dangerouslyInsertHtml(
          `<p  style="text-align: center;"><img style="width: ${image.width}px;height:${image.height}px" src="${image.src}"></img></p>`
        )
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
      // endsWith 判断当前字符串是否是以指定的子字符串结尾的
      if (!leaalExts.some((ext) => name.endsWith(ext))) {
        this.$message.error("文件类型错误")
        return false
      }
      return true
    },
    // 转换为图片
    transformIamge(file) {
      return new Promise(function (resolve) {
        let oFReader = new FileReader()
        oFReader.readAsDataURL(file)
        oFReader.onloadend = function (oFRevent) {
          let src = oFRevent.target.result
          let image = new Image()
          image.src = src
          image.onload = function () {
            resolve({
              width: image.width,
              height: image.height,
              image
            })
          }
        }
      })
    },
    // 压缩图片比例
    compressIamge(file) {
      let compressFlag = false // 图片是否压缩
      let sizeRatio = 0 // 图片压缩宽高比例
      let maxWidth = 750 // 图片最大宽度
      let maxHeight = 600 // 图片最大高度
      let { width, height, image } = file

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
      console.log(" maxWidth>> ", maxWidth)
      console.log(" maxHeight>> ", maxHeight)
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
    // 转为base64
    base64Iamge(file) {
      let { width, height, image } = file
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
    // 初始化
    async init() {
      let res
      let nav = []
      // 如果是编辑模式
      if (this.newsId) {
        this.btn = "修改"
        // 请求新闻数据
        res = await unify({
          name: "news",
          strict: true,
          data: {
            newsId: this.newsId
          }
        })
        let news = res.data[0]
        this.html = news.text // 新闻内容
        this.title = news.ntitle // 新闻标题
        this.$set(this.formDatas, "nav", news.nid) // 新闻分类
      }
      // 请求所有分类数据
      res = await unify({
        name: "nav",
        all: true
      })
      // 分类数据格式化
      res.data.forEach((n) => {
        nav.push({
          label: n.title,
          value: n.id
        })
      })
      this.$set(this.formConfig.formItems[0], "options", nav) // 添加到封装好的表单
    },
    // ------下面都是库自带的------
    onCreated(editor) {
      this.editor = Object.seal(editor)
      // 获取当前菜单排序和分组 (很麻烦 作者设计问题捏)
      // this.$nextTick(() => {
      // const toolbar = this.DomEditor.getToolbar(editor)
      // console.log("toolbar :>> ", toolbar.config.toolbarKeys)
      // })
    }
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy()
  }
}
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>

<style lang="less" scoped>
.btn {
  text-align: center;
  margin: 10px auto;
}
.box {
  height: 100%;
  box-sizing: border-box;
  border: 12px solid red;
}
.add-box {
  position: relative;
  margin-top: 10px;
  margin: 10px;
  .add {
    position: absolute;
    top: 0;
    right: 0px;
    background: #55ff7f;
    color: #fff;
    font-size: 16px;
  }
}

/deep/.el-input__inner {
  color: #000;
  border: 0px;
  // border-bottom: 1px solid #e43179;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
}
/deep/ .width-e-bar-item {
  width: 20%;
}
.title {
  display: flex;
  width: 100%;
  font-size: 40px;
  height: 60px;

  .input {
    font-size: 40px;
    width: 80%;
    height: 60px;
    font-size: 40px;
    color: #55ff7f;
    border: 0;
  }
  span {
    text-align: center;
    flex: 1;
    color: #55ff7f;
  }
}
</style>
