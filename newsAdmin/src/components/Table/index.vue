<template>
  <div class="news">
    <div class="header">
      <div class="a">{{ title }}列表</div>
      <div class="b">
        <slot name="newBtn" :title="title">
          <el-button type="primary" @click="edit()">新建{{ title }}</el-button>
        </slot>
        <slot name="dels" :title="title">
          <el-button type="danger" @click="del(true)">批量删除</el-button>
        </slot>
      </div>
    </div>
    <!--
      当某一行被点击时会触发该事件 @row-click
      当选择项发生变化时会触发该事件 @selection-change
     -->
    <el-table
      ref="tableRef"
      :data="datas"
      border
      stripe
      style="width: 100%"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
      show-overflow-tooltip
      @row-click="rowClick"
      @selection-change="handleSelectionChange"
    >
      <!-- 多选框 -->
      <el-table-column type="selection" width="55"> </el-table-column>
      <template v-for="item in propList">
        <el-table-column
          :sortable="item.sort"
          :prop="item.prop"
          :label="item.label"
          :key="item.prop"
          show-overflow-tooltip
          :width="item.width"
        >
          <template #default="scope">
            <slot :name="item.slotName" :row="scope.row">
              {{ scope.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
      <el-table-column prop="操作" label="操作" width="200">
        <template #default="scope">
          <slot name="edit" :row="scope.row">
            <el-button type="primary" @click.stop="edit(scope.row)"
              >编辑
            </el-button>
          </slot>
          <slot name="del" :row="scope.row">
            <el-button type="danger" @click.stop="del(false, scope.row)">
              删除
            </el-button>
          </slot>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="page.pageSizes"
      :current-page="page.pageIndex + 1"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

import { unifyDel } from "@/service/api/unify.js"
export default {
  name: "Table",
  data() {
    return {
      selected: [], // 选中数据
      page: {}
    }
  },
  computed: {
    ...mapGetters("unify", {
      datas: "getList"
    }),
    ...mapGetters("unify", {
      total: "getTotal"
    })
  },
  props: {
    // 表头数据
    propList: {
      type: Array,
      required: true
    },
    // 页面名称
    name: {
      type: String,
      required: true
    },
    // 分页配置
    pages: {
      type: Object,
      default: () => ({ pageIndex: 0, pageSize: 1, pageSizes: [1, 2, 3, 4] })
    },
    // 表头
    title: {
      type: String,
      default: "测试"
    }
  },
  created() {
    this.$store.commit("unify/saveName", this.name)
    this.page = { ...this.pages }
    this.$store.commit("unify/savePage", this.page)
    this.renew()
  },
  methods: {
    // 更新表
    async renew() {
      this.$store.dispatch("unify/getList")
    },
    // 当选择项发生变化时会触发该事件
    handleSelectionChange(val) {
      this.selected = val
    },
    // 当某一行被点击时会触发该事件
    rowClick(row) {
      this.$refs.tableRef.toggleRowSelection(row)
    },
    // 分页数量事件
    handleSizeChange(pageSize) {
      this.page.pageSize = pageSize
      this.page.pageIndex = 0
      this.$store.commit("unify/savePage", this.page)

      this.renew()
    },
    // 分页页码事件
    handleCurrentChange(pageIndex) {
      this.page.pageIndex = pageIndex - 1
      this.$store.commit("unify/savePage", this.page)
      this.renew()
    },
    // 操作行
    edit(row) {
      this.$bus.$emit("editClick", row)
      this.$store.commit("unify/saveVisible", true)
    },
    // 删除行
    del(selected, row) {
      this.$confirm("此操作将永久删除!", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (selected) {
            this.selected.forEach((item) => {
              this.delData(item)
            })
          } else this.delData(row)
        })
        .catch(() => {})
    },
    // 实现删除操作
    async delData(row) {
      let config = {
        name: this.name
      }
      if (this.name == "news") {
        config.config = row.newsId
      } else config.config = row.id
      let res = await unifyDel(config)
      if (res.code === 200) {
        this.$message.success("删除成功")
        this.page.pageIndex = 0
        this.renew()
      } else this.$message.error("删除失败")
    }
  }
}
</script>

<style lang="less" scoped>
.news {
  background-color: #fff;
  height: 100%;
}
.header {
  position: relative;
  height: 60px;
  .a {
    text-align: left;
    padding-left: 10px;
    line-height: 60px;
    font-size: 32px;
    font-weight: 700;
  }
  .b {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    .el-button {
      margin: 10px;
    }
  }
}
</style>
