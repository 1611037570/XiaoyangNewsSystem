<template>
  <div class="main">
    <el-container>
      <el-aside width="210px">
        <Menu></Menu>
      </el-aside>
      <el-container>
        <el-header> <Info></Info> </el-header>
        <el-main>
          <router-view></router-view>
          22
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Info from "@/components/Info"
import Menu from "@/components/Menu/"
export default {
  components: {
    Menu,
    Info
  }
}
</script>

<style scoped lang="less">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.main-content,
.page {
  height: 100%;
}

.page-content {
  height: calc(100% - 48px);

  .content {
    background-color: #fff;
    border-radius: 8px;
  }
}

.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}
.el-header {
  border-bottom: 2px solid #55ff7f;
}
.el-container {
  height: 100% !important ;
  // border: 1px solid red;
}
.el-header {
  height: 60px !important;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #20ff58;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none;
  }
}

.el-main {
  box-sizing: border-box;
  padding: 20px;
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
  width: 100%;
}
</style>
