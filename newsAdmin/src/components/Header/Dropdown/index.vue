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
    name: "user",
    strict: true,
    all: true,
    data: { id }
  })
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
