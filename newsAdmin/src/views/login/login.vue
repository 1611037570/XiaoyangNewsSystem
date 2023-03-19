<template>
  <div class="login">
    <div class="box">
      <h2>校园新闻后台登录</h2>
      <Form
        class="form-box"
        v-bind="loginConfig"
        ref="acconutRef"
        @keyup.enter.native="goLogin()"
      ></Form>

      <div class="btn" @click="goLogin()">登录</div>
    </div>
  </div>
</template>

<script>
import { login } from "@/service/api/pro"
import { loginConfig } from "./login.js"

export default {
  data() {
    return {
      loginConfig
    }
  },
  methods: {
    async goLogin() {
      let validate = this.$refs.acconutRef.validates()
      if (validate) {
        let { phone, password } = this.$refs.acconutRef.formData
        let res = await login({
          phone,
          password
        })

        if (res.code === 200) {
          this.$message.success("登录成功")
          let user = res.data[0]
          this.$cache.set("user", user)
          this.$store.commit("user/saveRole", user.role)
          this.$store.commit("user/saveUID", user.id)
          this.$store.commit("user/saveName", user.name)
          this.$router.push("/main").catch((err) => {
            console.log("err :>> ", err)
          })
        } else {
          this.$message.error("账号或密码错误")
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url("../../assets/images/login.png") no-repeat center center;
  background-size: cover;
}

.box {
  position: relative;
  width: 400px;
  height: 300px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  backdrop-filter: blur(5px);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  box-sizing: border-box;
  padding: 40px;
  text-align: center;
}

.btn {
  background: #fff;
  color: #666;
  border-radius: 50px;
  width: 160px;
  height: 40px;
  line-height: 40px;
  margin: 10px auto 0;
  margin-bottom: 20px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid #ece;
}
.form-box {
  margin-top: 10px;
}
.login /deep/ .el-input__inner {
  box-sizing: border-box;
  width: 100%;
  outline: none;
  border: none;
  border-radius: 30px !important;
  font-size: 16px;
  letter-spacing: 1px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}
</style>
