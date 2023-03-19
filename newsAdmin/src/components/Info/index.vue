<template>
  <div class="nav-info">
    <el-dialog
      v-if="visible"
      :visible.sync="visible"
      width="500px"
      center
      :append-to-body="true"
    >
      <Form v-if="visible" v-bind="formConfig" ref="formRef"></Form>
      <template #footer>
        <span>
          <el-button type="primary" @click="revise()">修改</el-button>
          <el-button @click="visible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
    <div class="info">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <el-avatar
            size="medium"
            class="avatar"
            src="https://upload.jianshu.io/users/upload_avatars/1102036/c3628b478f06.jpeg"
          ></el-avatar>
          <span class="name">{{ uname }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item icon="el-icon-unlock" command="edit"
              >修改密码</el-dropdown-item
            >
            <el-dropdown-item icon="el-icon-circle-close" divided command="exit"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { formConfig } from "./form.config.js"
import { mapGetters } from "vuex"
import { unifyRenew } from "@/service/api/unify"
import { login } from "@/service/api/pro"

export default {
  data() {
    return {
      visible: false,
      formConfig
    }
  },
  computed: {
    ...mapGetters("user", {
      uname: "getName"
    }),
    ...mapGetters("unify", {
      config: "getData"
    }),
    ...mapGetters("user", {
      uid: "getUID"
    })
  },
  methods: {
    handleCommand(command) {
      if (command === "exit") {
        this.$cache.del("user")
        this.$store.commit("user/saveRole", "")
        this.$store.commit("user/saveName", "")
        this.$store.commit("user/saveUID", "")
        this.$router.push("/login")
      }
      if (command == "edit") {
        this.visible = true
      }
    },
    async revise() {
      let validate = this.$refs.formRef.validates()
      if (!validate) {
        this.$message.error("不能空缺内容")
        return
      }
      if (this.config.yespw != this.config.newpw) {
        this.$message.error("新的密码和确定密码不一致")
        return
      }
      let user = this.$cache.get("user")
      let res
      res = await login({
        phone: user.phone,
        password: this.config.pw
      })
      if (res.code !== 200) {
        this.$message.error("旧密码错误")
        return
      }
      let data = {
        id: this.uid,
        password: this.config.yespw
      }
      res = await unifyRenew({
        name: "user",
        data
      })
      if (res.code === 200) this.$message.success("修改成功")
    }
  }
}
</script>

<style scoped lang="less">
.nav-info {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;

  .el-dropdown-link {
    display: flex;
    align-items: center;
    cursor: pointer;

    .avatar {
      width: 30px;
      height: 30px;
    }
    .name {
      margin-left: 8px;
    }
  }
}
</style>
