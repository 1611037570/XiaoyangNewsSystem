<template>
  <div class="box">
    <div class="left">
      <div class="all" ref="allRef"></div>
      <div class="census" ref="censusRef"></div>
    </div>
    <div class="right">
      <div class="user" ref="userRef"></div>
      <div class="news" ref="newsRef"></div>
      <div class="nav" ref="navRef"></div>
      <div class="note" ref="noteRef"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts"
import { unify } from "@/service/api/unify.js"
import { census } from "@/service/api/pro.js"

export default {
  data() {
    return {
      echarts
    }
  },
  mounted() {
    this.user()
    this.news()
    this.note()
    this.nav()
    this.all()
    this.census()
  },
  methods: {
    async all() {
      let option = {
        title: {
          text: "校园新闻数据总览",
          left: "center"
        },
        xAxis: {
          type: "category",
          data: ["注册总数", "新闻总数", "分类总数", "文案总数"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [],
            type: "bar",
            itemStyle: {
              normal: {
                //这里是颜色
                color: function (params) {
                  //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                  var colorList = [
                    "#00A3E0",
                    "#FFA100",
                    "#ffc0cb",
                    "#BBFFAA",
                    "#749f83",
                    "#ca8622"
                  ]
                  return colorList[params.dataIndex]
                }
              }
            }
          }
        ]
      }
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
      option.series[0].data = arr
      const myChart = this.echarts.init(this.$refs.allRef)
      window.addEventListener("resize", function () {
        myChart.resize()
      })
      myChart.setOption(option)
    },
    async news() {
      let option = {
        title: {
          text: "新闻总数",
          left: "center"
        },
        tooltip: {
          trigger: "item"
        },
        legend: {
          orient: "vertical",
          left: "left"
        },
        series: [
          {
            name: "新闻数",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "用户" },
              { value: 735, name: "作者" }
            ],
            itemStyle: {
              normal: {
                //这里是颜色
                color: function (params) {
                  //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                  var colorList = [
                    "#00A3E0",
                    "#FFA100",
                    "#ffc0cb",
                    "#BBFFAA",
                    "#749f83",
                    "#ca8622"
                  ]
                  return colorList[params.dataIndex]
                }
              }
            }
          }
        ]
      }
      let res
      let config = {
        name: "news",
        all: true
      }
      res = await unify(config)
      let arr = []
      let data = []
      res.data.forEach((item) => {
        if (arr.includes(item.title)) {
          let i = arr.indexOf(item.title)
          data[i].value++
        } else {
          arr.push(item.title)
          data.push({
            name: item.title,
            value: 1
          })
        }
      })
      option.series[0].data = data
      config.conut = true
      res = await unify(config)
      let total = res.data[0].rows
      option.title.text += total
      this.newsTotal = total
      const myChart = this.echarts.init(this.$refs.newsRef)
      window.addEventListener("resize", function () {
        myChart.resize()
      })
      myChart.setOption(option)
    },
    async user() {
      let option = {
        color: ["#2ee4d2", "#5ff33e"],
        title: {
          text: "注册总数",
          left: "center"
        },
        tooltip: {
          trigger: "item"
        },
        legend: {
          orient: "vertical",
          left: "left"
        },
        series: [
          {
            name: "注册数",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "用户" },
              { value: 735, name: "作者" }
            ]
          }
        ]
      }
      let res
      let config = {
        name: "user",
        conut: true,
        data: {
          role: 1
        }
      }
      res = await unify(config)
      option.series[0].data[0].value = res.data[0].rows
      config.data.role = 2
      res = await unify(config)
      option.series[0].data[1].value = res.data[0].rows
      config.data = {}
      res = await unify(config)
      let total = res.data[0].rows
      option.title.text += total
      let userRef = this.$refs.userRef
      const myChart = this.echarts.init(userRef)
      window.addEventListener("resize", function () {
        myChart.resize()
      })
      myChart.setOption(option)
    },
    async nav() {
      let option = {
        title: {
          text: "分类总数",
          left: "center"
        },
        tooltip: {
          trigger: "item"
        },
        legend: {
          orient: "vertical",
          left: "left"
        },
        series: [
          {
            name: "作者",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "用户" },
              { value: 735, name: "作者" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      }
      let res
      let config = {
        name: "nav",
        all: true
      }
      res = await unify(config)
      let arr = []
      let data = []
      res.data.forEach((item) => {
        if (arr.includes(item.title)) {
          let i = arr.indexOf(item.title)
          data[i].value++
        } else {
          arr.push(item.title)
          data.push({
            name: item.title,
            value: 1
          })
        }
      })
      option.series[0].data = data
      config.conut = true
      res = await unify(config)
      let total = res.data[0].rows
      option.title.text += total
      const myChart = this.echarts.init(this.$refs.navRef)
      window.addEventListener("resize", function () {
        myChart.resize()
      })
      myChart.setOption(option)
    },
    async census() {
      let option = {
        title: {
          text: "新闻发布数TOP10",
          left: "center"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {},
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: "category",
          data: []
        },
        series: [
          {
            type: "bar",
            data: [],
            itemStyle: {
              normal: {
                //这里是颜色
                color: function (params) {
                  //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                  var colorList = [
                    "#00A3E0",
                    "#FFA100",
                    "#ffc0cb",
                    "#BBFFAA",
                    "#749f83",
                    "#ca8622"
                  ]
                  return colorList[params.dataIndex]
                }
              }
            }
          }
        ]
      }
      let res = await census()
      let arr = []
      let data = []
      res.data.forEach((item) => {
        arr.push(item.name)
        data.push({
          name: item.name,
          value: item.row
        })
      })
      option.yAxis.data = arr
      option.series[0].data = data
      const myChart = this.echarts.init(this.$refs.censusRef)
      window.addEventListener("resize", function () {
        myChart.resize()
      })
      myChart.setOption(option)
    },
    async note() {
      let option = {
        title: {
          text: "文案总数",
          left: "center"
        },
        tooltip: {
          trigger: "item"
        },
        legend: {
          orient: "vertical",
          left: "left"
        },
        series: [
          {
            name: "新闻数",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "用户" },
              { value: 735, name: "作者" }
            ],
            itemStyle: {
              normal: {
                //这里是颜色
                color: function (params) {
                  //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                  var colorList = [
                    "#00A3E0",
                    "#FFA100",
                    "#ffc0cb",
                    "#BBFFAA",
                    "#749f83",
                    "#ca8622"
                  ]
                  return colorList[params.dataIndex]
                }
              }
            }
          }
        ]
      }
      let res
      let config = {
        name: "note",
        all: true
      }
      res = await unify(config)
      let arr = []
      let data = []
      res.data.forEach((item) => {
        if (arr.includes(item.name)) {
          let i = arr.indexOf(item.name)
          data[i].value++
        } else {
          arr.push(item.name)
          data.push({
            name: item.name,
            value: 1
          })
        }
      })
      option.series[0].data = data
      config.conut = true
      res = await unify(config)
      let total = res.data[0].rows
      option.title.text += total
      this.newsTotal = total
      const myChart = this.echarts.init(this.$refs.noteRef)
      window.addEventListener("resize", function () {
        myChart.resize()
      })
      myChart.setOption(option)
    }
  }
}
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
