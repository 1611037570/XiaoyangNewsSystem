<template>
  <div class="ation">
    <!-- 分类和按钮 -->
    <div class="box">
      <div class="l">
        <Form v-bind="config" ref="formRef" :formDatas="formDatas" @formDataUp="formDataUp()">
        </Form>
      </div>
      <div class="r">
        <el-button class="btn" type="primary" @click="check()">{{ flag }}新闻</el-button>
      </div>
    </div>
    <!-- 标题部分 -->
    <div class="title">
      <Form v-bind="titleConfig" ref="titleRef">
        <template #lSlot>
          <div class="flag">《</div>
        </template>
        <template #rSlot>
          <div class="flag">》</div>
        </template>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { unify } from "@/service/api/unify"
import { formConfig, titleConfig } from "./form.config.js"
import { useEdtiorStore } from "@/stores/editor"
import { useSystemStore } from "@/stores/system"
import { useTableStore } from "@/stores/table"
import { useRoute } from "vue-router"
import dayjs from "dayjs"
import { add, edit } from "@/service/api/edtior"
import { isRepeat } from "@/utils/isRepeat"
import { getCurrentInstance, reactive, ref, onMounted, toRefs } from "vue"
import { ElMessage } from "element-plus"

const props = defineProps(["text"])
const { proxy }: any = getCurrentInstance()
const emit = defineEmits(["update:text"])

// 分类数据请求和格式化
let config = reactive(formConfig)
let navArr: any = []
let res = await unify({
  name: "nav",
  all: true
})
res.data.forEach((n: { title: any; id: any }) => {
  navArr.push({
    label: n.title,
    value: n.id
  })
})
config.formItems[0].options = navArr
// 初始化内容操作
const route = useRoute() // 路由
let newsId: any // 新闻ID
let titleRef = ref()
let flag: string
let formDatas: any = reactive({})
if (route.query.newsId) {
  // 编辑模式
  flag = "修改"
  newsId = route.query.newsId
  let res = await unify({
    name: "news",
    strict: true,
    data: { newsId }
  })
  if (res.code !== 200) ElMessage.error("获取新闻信息错误请重试")
  formDatas.nid = res.data[0].nid
  emit("update:text", res.data[0].text)
  onMounted(() => {
    titleRef.value.formData.title = res.data[0].ntitle
  })
} else flag = "新建" // 新建模式

// 压缩率数据更新
const editor = useEdtiorStore()
const formRef = ref()
const formDataUp = () => {
  editor.compress = formRef.value.formData.compress
}

// 为添加编辑功能做初始化变量
const system = useSystemStore()
const table = useTableStore()
table.name = "news"
let uid = system.user.id
// 检查是否合格
const check = async () => {
  let { text } = toRefs(props)
  let { nid } = formRef.value.formData
  let { title } = titleRef.value.formData
  // 判断
  let time = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
  if (uid == undefined || uid == null) return ElMessage.error("账号信息错误")
  if (nid == undefined) return ElMessage.error("未选择分类")
  if (title == undefined || title.length < 1) return ElMessage.error("未填写标题")
  if (text?.value == "<p><br></p>") return ElMessage.error("未填写内容")
  let res = await isRepeat({ ntitle: title }, { newsId }, flag)
  if (!res) return ElMessage.error("标题以存在")
  if (time == undefined) return ElMessage.error("时间信息错误")
  addNews({
    ntitle: title,
    text: text?.value,
    time,
    nid
  })
}
// 添加或编辑新闻
const addNews = async (data: any) => {
  let res
  // 请求配置
  if (flag == "新建") {
    data.heat = 0
    data.uid = uid
    res = await add({
      name: "news",
      data
    })
  } else {
    data.newsId = newsId
    res = await edit({
      name: "news",
      data
    })
  }
  if (res.code === 200) {
    // 操作成功
    ElMessage.success(flag + "新闻成功！")
    proxy.$socket.send({
      action: "get",
      socketType: "renewEchart"
    })
  } else ElMessage.error(flag + "新闻失败！")
}
</script>

<style lang="less" scoped>
.ation {
  background-color: #fff;
  position: relative;
  box-sizing: border-box;
  padding: 10px;
  .box {
    display: flex;
    .l {
      width: 100%;
    }
    .r {
      flex: 1;
    }
  }
  .title {
    width: 100%;
    font-size: 36px;
    height: 46px;
    margin-bottom: 10px;
    .flag {
      text-align: center;
    }
    :deep(.el-input__inner:nth-child(1)) {
      height: 46px;
      font-size: 36px;
      border: 0;
    }
  }

  :deep(.el-form-item) {
    margin-bottom: 0;
  }
}
</style>
