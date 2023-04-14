<template>
  <el-dropdown>
    <span class="info">
      <el-avatar src="https://upload.jianshu.io/users/upload_avatars/1102036/c3628b478f06.jpeg">
      </el-avatar>
      <span class="name">{{ store.user.name }}</span>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <!-- <el-dropdown-item>个人信息</el-dropdown-item> -->
        <el-dropdown-item @click="visible = true">修改密码</el-dropdown-item>
        <el-dropdown-item divided @click="exit()">退出系统</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <el-dialog v-model="visible" width="500px" center :append-to-body="true" title="修改密码">
    <Form v-if="visible" v-bind="formConfig" ref="formRef">
      <template #footer>
        <span>
          <el-button type="primary" @click="upPw()">修改密码</el-button>
          <el-button @click="visible = false">取消</el-button>
        </span>
      </template>
    </Form>
  </el-dialog>
</template>

<script setup lang="ts">
import { formConfig } from "./form.config.js"
import { useRouter } from "vue-router"
import { getCurrentInstance, ref } from "vue"
import { useSystemStore } from "@/stores/system"
import { unify, unifyRenew } from "@/service/api/unify"
import { ElMessage } from "element-plus"

<<<<<<< HEAD
// 使用 ref 创建响应式变量，避免手动维护状态
const visible = ref(false)
const formRef = ref()

// 获取系统 Store
const store = useSystemStore()

// 定义更新密码函数
const upPw = async () => {
  // 从 Store 中获取用户 ID
  const id = store.user.id

  // 获取表单数据
  const { yespw, newpw, password } = formRef.value.formData

  // 校验表单数据
  if (!formRef.value.validates()) return
  if (yespw !== newpw) return ElMessage.error("新的密码和确定密码不一致")

  // 获取用户信息
  const res = await unify({
=======
// 更新密码
let visible = ref(false)
const store = useSystemStore()
const formRef = ref()
const upPw = async () => {
  let id = store.user.id
  const { yespw, newpw, password } = formRef.value.formData
  if (!formRef.value.validates()) return
  if (yespw != newpw) return ElMessage.error("新的密码和确定密码不一致")
  let res = await unify({
>>>>>>> 6318332f5c1ce97d497e2cc7ee3769e2dc08ab44
    name: "user",
    strict: true,
    all: true,
    data: { id }
  })
<<<<<<< HEAD

  // 校验旧密码是否正确
  if (password !== res.data[0].password) return ElMessage.error("旧密码错误")

  // 更新用户密码
  const data = { id, password }
  const result = await unifyRenew({
    name: "user",
    data
  })

  // 根据返回结果显示提示信息
  if (result.code === 200) {
    ElMessage.success("修改密码成功")
  } else {
    ElMessage.error(result.msg)
  }
}

// 获取当前组件实例，以便访问 $cache
const { proxy }: any = getCurrentInstance()

// 获取路由实例
const router = useRouter()

// 定义退出登录函数
const exit = () => {
  // 清空 Store 中的用户信息
  store.user = { role: null, id: null, name: "" }

  // 清空 $cache 和 localStorage 中的系统信息
  proxy.$cache.clear()
  localStorage.removeItem("system")
  proxy.$cache.del("system")

  // 跳转到登录页
=======
  if (password != res.data[0].password) return ElMessage.error("旧密码错误")
  let data = { id, password }
  res = await unifyRenew({
    name: "user",
    data
  })
  if (res.code === 200) ElMessage.success("修改密码成功")
}
// 退出登录
const { proxy }: any = getCurrentInstance()
const router = useRouter()
const exit = () => {
  store.user = { role: null, id: null, name: "" }
  proxy.$cache.clear()
  proxy.$cache.del("system")
>>>>>>> 6318332f5c1ce97d497e2cc7ee3769e2dc08ab44
  router.push({
    path: "/login"
  })
}
</script>

<style lang="less" scoped>
.info {
  display: flex;
  align-items: center;
  cursor: pointer;
  :deep(.el-dropdown) {
    border: 0;
    outline: none !important;
  }
  .name {
    margin-left: 8px;
    font-size: 16px;
  }
}
</style>
