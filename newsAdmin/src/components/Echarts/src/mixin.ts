import snowflakeIdv1 from "@/utils/snowflakeIdv1"
import * as echarts from "echarts"

export const getId = () => {
  const id = snowflakeIdv1.NextId().toString()
  return id
}

export class MyChart {
  myChart: any
  constructor(id: string) {
    this.init(id)
  }
  init = (id: string) => {
    const dom = document.getElementById(id) as HTMLElement
    this.myChart = echarts.init(dom)
    this.myChart.showLoading()
    const thar = this
    window.addEventListener("resize", function () {
      thar.myChart.resize()
    })
  }

  set = (option: any) => {
    this.myChart.hideLoading()
    this.myChart.setOption(option)
  }
}
