// 递归获取当前激活的页面
export const getMenuActive = (menus: any, index: string) => {
  let res = reactive({})
  const _reactive = (menus: any, index: string) => {
    for (const item of menus) {
      if (item.children) _reactive(item.children, index)
      else {
        if (item.path == index) {
          res = item
        }
      }
    }
  }
  _reactive(menus, index)
  return res
}
