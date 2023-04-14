import { onMounted, onBeforeUnmount, ref } from "vue"
const useMenus = (containerRef: any) => {
<<<<<<< HEAD
  // 是否显示菜单 和 菜单坐标
  const show = ref(false)
  const x = ref(0)
  const y = ref(0)
  // 展开显示
  const handleContextMenu = (e: any) => {
    e.preventDefault() // 阻止默认动作
=======
  const show = ref(false)
  const x = ref(0)
  const y = ref(0)
  const handleContextMenu = (e: any) => {
    e.preventDefault()
>>>>>>> 6318332f5c1ce97d497e2cc7ee3769e2dc08ab44
    e.stopPropagation() // 阻止事件冒泡
    show.value = true
    x.value = e.clientX
    y.value = e.clientY
  }
<<<<<<< HEAD
  // 关闭显示
=======
>>>>>>> 6318332f5c1ce97d497e2cc7ee3769e2dc08ab44
  const closeMenus = () => {
    show.value = false
  }
  onMounted(() => {
    const div = containerRef.value
<<<<<<< HEAD
    div.addEventListener("contextmenu", handleContextMenu, { capture: true }) // 第三个参数是为了捕获阶段处理，预防阻止事件冒泡无法触发
    window.addEventListener("click", closeMenus, { capture: true })
    window.addEventListener("contextmenu", closeMenus, { capture: true })
  })
  onBeforeUnmount(() => {
    const div = containerRef.value
    div.removeEventListener("contextmenu", handleContextMenu, { capture: true })
    window.addEventListener("click", closeMenus, { capture: true })
    window.addEventListener("contextmenu", closeMenus, { capture: true })
=======
    div.addEventListener("contextmenu", handleContextMenu)
    window.addEventListener("click", closeMenus, true) // 捕获阶段处理，预防阻止事件冒泡无法触发
    window.addEventListener("contextmenu", closeMenus, true)
  })

  onBeforeUnmount(() => {
    const div = containerRef.value
    div.removeEventListener("contextmenu", handleContextMenu)
    window.addEventListener("click", closeMenus, true)
    window.addEventListener("contextmenu", closeMenus, true)
>>>>>>> 6318332f5c1ce97d497e2cc7ee3769e2dc08ab44
  })
  return {
    show,
    x,
    y
  }
}
export default useMenus
