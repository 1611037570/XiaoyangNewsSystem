import { getCensus } from "@/service/api/show"
import { unify } from "@/service/api/unify"

export const census = async () => {
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

export const all = async () => {
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

export const user = async () => {
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

export const pie = async (name: string, flag: string, text?: string) => {
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
