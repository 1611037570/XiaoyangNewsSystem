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
      left: "center"
    },
    legend: {
      top: "bottom"
    },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: "Nightingale Chart",
        type: "pie",
        radius: [30, 90],
        center: ["50%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 8
        },
        data: props.data
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
