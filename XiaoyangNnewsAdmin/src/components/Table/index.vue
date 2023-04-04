<template>
  <div class="news">
    <div class="header">
      <div class="a">{{ title }}列表</div>
      <div class="b">
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

    <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="page.pageSizes"
      :current-page="page.pageIndex + 1"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination> -->
  </div>
</template>

<script setup lang="ts">
import { unify } from "@/service/api/unify"
import { useTableStore } from "@/stores/table"
const store = useTableStore()

let page: {}
let data: []
interface Props {
  propList: Array<any> // 表头数据
  pages?: Object // 分页配置
  title?: String // 表标题名
  name: string
}

const multipleSelection = ref()
const props = withDefaults(defineProps<Props>(), {
  formDatas: () => {
    return {}
  },
  propList: () => [],
  pages: () => {
    return { pageIndex: 0, pageSize: 1, pageSizes: [1, 2, 3, 4] }
  }
})

//   onMounted(()=> {
//     this.page = { ...this.pages }
//     this.renew()
//   })
// 更新表
const renew = async () => {
  store.name = props.name

  store.saveList()
}
renew()
// 当选择项发生变化时会触发该事件
const handleSelectionChange = (val: any) => {
  multipleSelection.value = val
}

// 分页数量事件
const handleSizeChange = (pageSize: any) => {
  //   this.page.pageSize = pageSize
  //   this.page.pageIndex = 0
  //   this.$store.commit("unify/savePage", this.page)
  //   this.renew()
}
// 分页页码事件
const handleCurrentChange = (pageIndex: any) => {
  //   this.page.pageIndex = pageIndex - 1
  //   this.$store.commit("unify/savePage", this.page)
  //   this.renew()
}
// 操作行
const edit = (row?: any) => {
  //   this.$bus.$emit("editClick", row)
  //   this.$store.commit("unify/saveVisible", true)
}

let selected: [] // 选中数据
// 点击按钮--删除行
const del = (row?: any, flag?: any) => {
  ElMessageBox.confirm("此操作将永久删除!", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      if (flag) {
        multipleSelection.value.forEach((row: any) => store.delList(row))
      } else store.delList(row)
    })
    .catch(() => {})

  //     if (selected) {
  //       this.selected.forEach((item) => {
  //         this.delData(item)
  //       })
  //     } else this.delData(row)

  //   .catch(() => {})
}
// 实现删除操作
const delData = async (row: any) => {
  //   let config = {
  //     name: this.name
  //   }
  //   if (this.name == "news") {
  //     config.config = row.newsId
  //   } else config.config = row.id
  //   let res = await unifyDel(config)
  //   if (res.code === 200) {
  //     this.$message.success("删除成功")
  //     this.page.pageIndex = 0
  //     this.renew()
  //   } else this.$message.error("删除失败")
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
