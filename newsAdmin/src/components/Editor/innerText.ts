import { unify } from "@/service/api/unify"
import type { IDomEditor } from "@wangeditor/editor"

/**
 * 洗牌算法
 * @author 杨南南<1611037570@qq.com>
 * 	洗牌算法可以解决随机性问题
 */
const shuffle = (array: any) => {
  let data: any = []
  for (let i = 0; i < 5; i++) {
    let length = array.length
    const arr = [...array]
    const res = []
    while (length > 0) {
      length--
      const random = Math.floor(Math.random() * length)
      res.push(arr[random])
      arr.splice(random, 1)
    }
    if (i < 5) {
      data = res
    }
  }
  return data
}

// 插入文案
export const innerText = async (editor: IDomEditor) => {
  const res = await unify({
    name: "note",
    all: true
  })
  const data = shuffle(res.data)
  editor.dangerouslyInsertHtml(`<p  style="text-align: center;">${data[0].text}</p>`)
}
