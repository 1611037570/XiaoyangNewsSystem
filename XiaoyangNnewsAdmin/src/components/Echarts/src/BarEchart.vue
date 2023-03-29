<template>
  <div :id="id"></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts"
import snowflakeIdv1 from "@/utils/snowflakeIdv1"
let id = snowflakeIdv1.NextId().toString()
type Props = {
  text?: string // 标题
  name?: string // 标签名称
  data: Array<any> // 数据
  color?: Array<string> // 颜色
  yData?: Array<string | number> // Y数据
  xData?: Array<string | number> // X数据
}
type Axis = {
  type: string
  data?: Array<string | number>
  boundaryGap?: Array<number>
}
const props = withDefaults(defineProps<Props>(), {
  text: "默认标题",
  name: "",
  color: () => ["#00A3E0", "#FFA100", "#ffc0cb", "#BBFFAA", "#749f83", "#ca8622"],
  yData: () => [],
  xData: () => []
})

let xAxis: Axis = {
  type: "value",
  boundaryGap: [0, 1]
}
let yAxis: Axis = {
  type: "category",
  boundaryGap: [0, 0.01]
}

if (props.yData.length) {
  yAxis.data = props.yData
} else if (props.xData.length) {
  xAxis.data = props.xData
  xAxis.type = "category"
  yAxis.type = "value"
}

let option = {
  title: {
    text: props.text,
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
  xAxis,
  yAxis,
  series: [
    {
      type: "bar",
      data: props.data,
      itemStyle: {
        color: function (params: any) {
          //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
          var colorList = props.color
          return colorList[params.dataIndex]
        }
      }
    }
  ]
}

onMounted(() => {
  const dom = document.getElementById(id) as HTMLElement
  const myChart = echarts.init(dom)
  window.addEventListener("resize", function () {
    myChart.resize()
  })
  myChart.setOption(option)
})
</script>

<style lang="less" scoped></style>
