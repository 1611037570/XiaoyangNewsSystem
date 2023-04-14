// 要获取dom和回调 做一个映射
const map = new WeakMap()
// 创建一个观察者 entries 要观察的元素的数组
const ob = new ResizeObserver((entries) => {
  for (const entry of entries) {
    // 获取元素的回调
    const handler = map.get(entry.target)
    const box = entry.borderBoxSize[0]
    handler &&
      handler({
        width: box.inlineSize,
        height: box.blockSize
      })
  }
})
// ob.observe(dom)
export default {
  mounted(el: any, binding: any) {
    // 听视尺寸变化
    ob.observe(el)
    map.set(el, binding.value)
  },
  unmounted(el: any) {
    // 取消监听
    ob.unobserve(el)
  }
}
