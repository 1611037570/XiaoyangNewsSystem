import { useSystemStore } from "@/stores/system"
import cache from "@/utils/cache"
export const setupStores = () => {
  const store = useSystemStore()
  let user = cache.get("user")
  console.log("user :>> ", user)
  if (user !== undefined) {
    store.user = user
    store.saveMenu()
    console.log("object :>> ", store.user)
  }
  console.log("初始化pinia完成 :>> ")
}
