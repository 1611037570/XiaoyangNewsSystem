<template>
  <div class="box">
    <div class="left">
      <BarEchart class="all" v-bind="allData"></BarEchart>
      <BarEchart class="census" v-bind="censusData"></BarEchart>
    </div>
    <div class="right">
      <PieEchart class="user" v-bind="userData"></PieEchart>
      <PieEchart class="news" v-bind="newsData"></PieEchart>
      <PieEchart class="nav" v-bind="navData"></PieEchart>
      <PieEchart class="note" v-bind="noteData"></PieEchart>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BarEchart, PieEchart } from "@/components/Echarts/"
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
  return {
    data: arr,
    xData: ["注册总数", "新闻总数", "分类总数", "文案总数"]
  }
}

const user = async () => {
  let res
  let data: any = []
  let config = {
    name: "user",
    conut: true,
    data: {
      role: 1
    }
  }
  res = await unify(config)
  data.push({
    name: "作者",
    value: res.data[0].rows
  })
  res = await unify(config)

  data.push({
    name: "用户",
    value: res.data[0].rows
  })

  return { data, text: "注册总数" }
}

const pie = async (name: string, flag: string, text?: string) => {
  let res
  let config = {
    name,
    all: true
  }
  res = await unify(config)
  let arr: any = []
  let data: any = []
  res.data.forEach((item: any) => {
    if (arr.includes(item[`${flag}`])) {
      let i = arr.indexOf(item[`${flag}`])
      data[i].value++
    } else {
      arr.push(item[`${flag}`])
      data.push({
        name: item[`${flag}`],
        value: 1
      })
    }
  })
  return {
    data,
    text
  }
}

let noteData = shallowRef(await pie("note", "name", "文案总数"))
let navData = shallowRef(await pie("nav", "title", "分类总数"))
let newsData = shallowRef(await pie("news", "title", "新闻总数"))
let userData = shallowRef(await user())
let allData = shallowRef(await all())
let censusData = shallowRef<any>({
  data: []
})

setTimeout(async () => {
  censusData.value = await census()
}, 1000)
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
