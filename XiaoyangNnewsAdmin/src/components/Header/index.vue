<template>
  <div class="header">
    <div class="left">
      <!-- 滚动按钮 -->
      <div class="collapse">
        <transition mode="out-in" leave-active-class="animate__animated animate__rotateOut">
          <keep-alive>
            <el-icon
              size="25"
              key="enter"
              v-if="store.isCollapse"
              @click="store.isCollapse = !store.isCollapse"
            >
              <i-ep-expand />
            </el-icon>
            <el-icon size="25" key="leave" v-else @click="store.isCollapse = !store.isCollapse">
              <i-ep-fold />
            </el-icon>
          </keep-alive>
        </transition>
      </div>
      <!-- 子菜单 -->
      <div>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>promotion management</el-breadcrumb-item>
          <el-breadcrumb-item to="{ path: '/' }">promotion list</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>

    <div class="">
      <el-dropdown>
        <span class="info">
          <el-avatar
            src="https://upload.jianshu.io/users/upload_avatars/1102036/c3628b478f06.jpeg"
          ></el-avatar>
          <span class="name">{{ store.user.name }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item divided>修改密码</el-dropdown-item>
            <el-dropdown-item divided @click="exit()">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import "animate.css"
import { useSystemStore } from "@/stores/system"
import { useRouter } from "vue-router"
import { getCurrentInstance } from "vue"
const { proxy }: any = getCurrentInstance()
const store = useSystemStore()
const router = useRouter()
const exit = () => {
  store.user = { role: null, id: null, name: "" }
  proxy.$cache.clear()
  router.push({
    path: "/login"
  })
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  border-bottom: 1px solid;
  padding: 0 20px;
  .left {
    display: flex;
    flex-direction: row;
    align-items: center;
    vertical-align: bottom;
    .collapse {
      height: 24px;
    }
    :deep(.el-breadcrumb) {
      margin-left: 15px;
      font-size: 16px;
    }
    .breadcrumb {
      font-size: 120px !important;
    }
  }
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
}
</style>
