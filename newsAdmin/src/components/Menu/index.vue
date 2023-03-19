<template>
  <div class="nav-menu">
    <div class="title">校园新闻管理后台</div>
    <el-menu
      class="el-menu-vertical"
      background-color="#20ff58"
      text-color="#ffffff"
      active-text-color="#0a60bd"
    >
      <template v-for="menu in menus">
        <el-menu-item
          :key="menu.id"
          :index="menu.id + ''"
          @click="path(menu.path)"
        >
          <span>{{ menu.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { getMenus } from "./menu.config"
export default {
  data() {
    return {
      menus: []
    }
  },
  created() {
    this.menus = getMenus()
  },
  methods: {
    path(path) {
      this.$router.push(
        {
          path: path ?? "/not-found"
        },
        () => {}
      )
    }
  }
}
</script>

<style scoped lang="less">
.el-menu {
  border-right: solid 0px;
}
.el-aside {
  line-height: 0;
}
.nav-menu {
  height: 100% !important ;

  .title {
    text-align: center;
    font-size: 22px;
    font-weight: 700;
    height: 60px;
    line-height: 60px;
    color: white;
  }

  // 目录
  .el-submenu {
    background-color: #20ff58 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #83f19e !important;
    }
  }
  .el-menu-item {
    text-align: center;
    font-size: 20px;
    height: 60px;
  }
  ::v-deep .el-submenu__title {
    background-color: #20ff58 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #1eeb51 !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
