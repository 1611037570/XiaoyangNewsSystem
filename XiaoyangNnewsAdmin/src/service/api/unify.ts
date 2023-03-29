import request from "../index"

// 统一添加
export function unifyAdd(params: any) {
  return request.get({
    url: "/add",
    params
  })
}

// 统一删除
export function unifyDel(params: any) {
  return request.get({
    url: "/del",
    params
  })
}

// 统一修改
export function unifyRenew(params: any) {
  return request.get({
    url: "/renew",
    params
  })
}

// 统一请求
export function unify(params: any) {
  return request.get({
    url: "/unify",
    params
  })
}
