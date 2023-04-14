<template>
  <div class="box">
    <div class="left">
      <XyMenus :menus="menus">
        <BarEchart class="all" v-bind="allData"></BarEchart>
      </XyMenus>
      <BarEchart class="census" v-bind="censusData"></BarEchart>
    </div>
    <div class="right">
      <XyMenus :menus="menus">
        <PieEchart class="user" v-bind="userData"></PieEchart>
      </XyMenus>
      <PieEchart class="news" v-bind="newsData"></PieEchart>
      <RoseEchart class="rose" v-bind="navData"></RoseEchart>
      <PieEchart class="note" v-bind="noteData"></PieEchart>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BarEchart, PieEchart, RoseEchart } from "@/components/Echarts/"
import XyMenus from "@/base/XyMenus/index.vue"
import { getCurrentInstance, onBeforeUnmount, shallowRef } from "vue"
import { census, pie, user, all } from "./res"
const { proxy }: any = getCurrentInstance()

const callBack = (menu: any) => {
  console.log("回调menu :>> ", menu)
}
const menus = [{ label: "更新", callBack }, { label: "放大" }]

let noteData = shallowRef<any>(await pie("note", "name", "文案总数"))
let navData = shallowRef<any>(await pie("nav", "title", "分类总数"))
let newsData = shallowRef<any>(await pie("news", "title", "新闻总数"))
let userData = shallowRef<any>({ data: [] })
let allData = shallowRef<any>(await all())
let censusData = shallowRef<any>({ data: [] })

setTimeout(async () => {
  censusData.value = await census()
  userData.value = await user()
}, 1000)

// 这里可以细分为某个表更新，这里偷懒就不分出去咯
const renewEchart = async (data?: any) => {
  noteData.value = await pie("note", "name", "文案总数")
  navData.value = await pie("nav", "title", "分类总数")
  newsData.value = await pie("news", "title", "新闻总数")
  censusData.value = await census()
  userData.value = await user()
  allData.value = await all()
}

// 数据更新回调
renewEchart()
proxy.$socket.registerCallBack("renewEchart", renewEchart)

// 取消监听
onBeforeUnmount(() => {
  proxy.$socket.unRegisterCallBack("renewEchart")
})
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  .left,
  .right {
    width: 61%;
    height: 100%;
  }
  .right {
    width: 38%;
    position: absolute;
    top: 0;
    right: 0;
    .note,
    .news,
    .nav,
    .user,
    .rose {
      box-sizing: border-box;
      padding: 10px;
      background-color: #fff;
      margin-bottom: 4px;
      height: 201px;
      border: 1px solid #5ff33e;
    }

    .rose {
      height: 350px;
    }
  }
  .left {
    .all {
      margin-bottom: 5px;
    }
    .census,
    .all {
      width: 100%;
      box-sizing: border-box;
      padding: 10px;
      background-color: #fff;
      height: 400px;
      border: 1px solid #5ff33e;
    }
    .all {
      height: 310px;
    }
    .census {
      height: 500px;
    }
  }
}
</style>
