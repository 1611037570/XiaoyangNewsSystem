<template>
  <div :id="id"></div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from "vue"
import { getId, MyChart } from "./mixin"
let id = getId()
interface Props {
  // 标题
  text?: string
  // 标签名称
  name?: string
  // 数据
  data: Array<any>
  // 半径
  radius?: string
  // 颜色
  color?: Array<string>
  // 标题大小
  titleSize?: number
}
const props = withDefaults(defineProps<Props>(), {
  text: "默认标题",
  name: "",
  radius: "50%",
  color: () => ["#00A3E0", "#FFA100", "#ffc0cb", "#BBFFAA", "#749f83", "#ca8622"],
  titleSize: 14
})

let option = computed(() => {
  return {
    title: {
      text: props.text,
      left: "center",
      textStyle: { fontSize: props.titleSize }
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
        name: props.name,
        type: "pie",
        radius: props.radius,
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
