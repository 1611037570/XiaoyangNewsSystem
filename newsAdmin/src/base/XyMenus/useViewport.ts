import { ref, onMounted } from "vue"
<<<<<<< HEAD
// 获取窗口大小
=======
>>>>>>> 6318332f5c1ce97d497e2cc7ee3769e2dc08ab44
const viewWidth = ref(document.documentElement.clientWidth)
const viewHeight = ref(document.documentElement.clientHeight)

export default () => {
  onMounted(() => {
<<<<<<< HEAD
    // 窗口更新返回最新的窗口大小
=======
>>>>>>> 6318332f5c1ce97d497e2cc7ee3769e2dc08ab44
    window.addEventListener("resize", () => {
      viewWidth.value = document.documentElement.clientWidth
      viewHeight.value = document.documentElement.clientHeight
    })
  })

  return {
    viewWidth,
    viewHeight
  }
}
