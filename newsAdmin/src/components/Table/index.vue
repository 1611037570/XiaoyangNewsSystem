<template>
  <div class="news">
    <div class="header">
      <div class="title">{{ title }}列表</div>
      <div class="btn">
        <slot name="newBtn" :title="title">
          <el-button type="primary" @click="edit()">新建{{ title }}</el-button>
        </slot>
        <slot name="dels" :title="title">
          <el-button type="danger" @click="del(null, true)">批量删除</el-button>
        </slot>
      </div>
    </div>
    <!-- 封装table组件 -->
    <el-table
      ref="tableRef"
      :data="store.list"
      border
      stripe
      style="width: 100%"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
      show-overflow-tooltip
      @selection-change="handleSelectionChange"
    >
      <!-- 多选框 -->
      <el-table-column type="selection" width="55"> </el-table-column>
      <!-- 开始遍历展示项 -->
      <template v-for="(item, index) in propList" :key="item.prop">
        <el-table-column
          :sortable="item.sort"
          :prop="item.prop"
          :label="item.label"
          show-overflow-tooltip
          :width="item.width"
        >
          <!-- 展示项插槽 -->
          <template #default="scope">
            <slot :name="item.slotName" :row="scope.row">
              {{ scope.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
      <!-- 结束遍历展示项 -->
      <!-- 配置项 -->
      <el-table-column prop="操作" label="操作" width="200">
        <!-- 配置项插槽 -->
        <template #default="scope">
          <slot name="edit" :row="scope.row">
            <el-button type="primary" @click.stop="edit(scope.row)">编辑 </el-button>
          </slot>
          <slot name="del" :row="scope.row">
            <el-button type="danger" @click.stop="del(scope.row)"> 删除 </el-button>
          </slot>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页配置 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="props.pages.pageSizes"
      :current-page="store.page.pageIndex + 1"
      :page-size="store.page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="store.total"
    >
    </el-pagination>
  </div>
</template>

<script setup lang="ts">
import { useTableStore } from "@/stores/table"
import { getCurrentInstance, ref, reactive } from "vue"
import { ElMessageBox } from "element-plus"
const { proxy }: any = getCurrentInstance()

type Props = {
  propList: Array<any> // 表头数据
  pages?: { [key: string]: any } // 分页配置
  title?: String // 表标题名
  name: string
}

const props = withDefaults(defineProps<Props>(), {
  formDatas: () => {
    return {}
  },
  propList: () => [],
  pages: () => {
    return { index: 0, size: 1, pageSizes: [1, 2, 3, 4] }
  },
  colLayout: () => {
    return {
      xl: 6,
      lg: 8, // ≥1200px
      md: 12, // ≥992px
      sm: 24, // ≥768px
      xs: 24 // <768px
    }
  }
})
// 初始化数据
const store = useTableStore()
const multipleSelection = ref()
store.name = props.name
store.page = {
  pageIndex: props.pages.index,
  pageSize: props.pages.size
}
store.renewTbale()

// 当选择项发生变化时会触发该事件
const handleSelectionChange = (val: any) => {
  multipleSelection.value = val
}

// 分页数量事件
const handleSizeChange = (val: number) => {
  store.page.pageSize = val
  store.page.pageIndex = 0
  store.renewTbale()
}
// 分页页码事件
const handleCurrentChange = (val: number) => {
  store.page.pageIndex = val - 1
  store.renewTbale()
}
// 操作行
const edit = (row?: any) => {
  // 全局事件打开Modal组件
  store.visible = true
  proxy.$bus.emit("openModal", row)
}

// 删除行事件
const del = (row: any, flag?: any) => {
  ElMessageBox.confirm("此操作将永久删除!", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(async () => {
      let is = false
      let arr: any = reactive([])
      if (flag) {
        multipleSelection.value.forEach((row: any) => arr.push(store.delList(row)))
      } else arr.push(store.delList(row))
      if (arr[0]) {
        proxy.$socket.send({
          action: "get",
          socketType: "renewEchart"
        })
      }
    })
    .catch(() => {})
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
  .title {
    text-align: left;
    padding-left: 10px;
    line-height: 60px;
    font-size: 32px;
    font-weight: 700;
  }
  .btn {
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
