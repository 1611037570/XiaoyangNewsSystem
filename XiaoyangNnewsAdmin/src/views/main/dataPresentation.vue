<template>
  <div class="box">
    <div class="left">
      <BarEchart class="all" v-bind="allData"></BarEchart>
      <BarEchart class="census" v-bind="censusData"></BarEchart>
    </div>
    <div class="right">
      <div class="user" ref="userRef"></div>

      <div class="news" ref="newsRef"></div>
      <div class="nav" ref="navRef"></div>
      <div class="note" ref="noteRef"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BarEchart } from "@/components/Echarts/"
import { getCensus } from "@/service/api/show"
import { unify } from "@/service/api/unify"

const census = async () => {
  let res = await getCensus()
  let yData: Array<any> = []
  let data: Array<any> = []
  res.data.forEach((item: any) => {
    yData.push(item.name)
    data.push({
      name: item.name,
      value: item.row
    })
  })

  return {
    data,
    yData,
    text: "新闻发布数TOP10"
  }
}

const all = async () => {
  let arr = []
  let res
  res = await unify({
    name: "user",
    conut: true
  })
  arr.push(res.data[0].rows)
  res = await unify({
    name: "news",
    conut: true
  })
  arr.push(res.data[0].rows)
  res = await unify({
    name: "nav",
    conut: true
  })
  arr.push(res.data[0].rows)
  res = await unify({
    name: "note",
    conut: true
  })
  arr.push(res.data[0].rows)
  console.log("arr :>> ", arr)
  return {
    data: arr,
    xData: ["注册总数", "新闻总数", "分类总数", "文案总数"]
  }
}
let allData = await all()
let censusData = await census()
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
    .user {
      box-sizing: border-box;
      padding: 10px;
      background-color: #fff;
      margin-bottom: 4px;
      height: 201px;
      border: 1px solid #5ff33e;
    }

    .note {
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
