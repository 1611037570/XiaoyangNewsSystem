<template>
  <div :id="id"></div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from "vue"
import { getId, MyChart } from "./mixin"
let id = getId()
type Props = {
  text?: string // 标题
  data: Array<any> // 数据
  color?: Array<string> // 颜色
  yData?: Array<string | number> // Y数据
  xData?: Array<string | number> // X数据
  titleSize?: number // 标题大小
}

let props = withDefaults(defineProps<Props>(), {
  text: "默认标题",
  name: "",
  color: () => ["#00A3E0", "#FFA100", "#ffc0cb", "#BBFFAA", "#749f83", "#ca8622"],
  yData: () => [],
  xData: () => [],
  titleSize: 16
})
type Axis = {
  type: string
  data?: Array<string | number>
  boundaryGap?: Array<number>
}
let option = computed(() => {
  let obj = {
    title: {
      text: props.text,
      left: "center",
      textStyle: { fontSize: props.titleSize }
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
    xAxis: <Axis>{
      type: "value",
      boundaryGap: [0, 1]
    },
    yAxis: <Axis>{
      type: "category",
      boundaryGap: [0, 0.01]
    },
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
  if (props.yData.length) {
    obj.yAxis.data = props.yData
  } else if (props.xData.length) {
    obj.xAxis.data = props.xData
    obj.xAxis.type = "category"
    obj.yAxis.type = "value"
  }
  return obj
})

onMounted(() => {
  const myChart = new MyChart(id)
  watch(
    () => props.data,
    (newValue, oldValue) => {
      if (newValue !== undefined && newValue.length != 0) {
        myChart.set(option.value)
      }
    },
    { immediate: true }
  )
})
</script>

<style lang="less" scoped></style>
