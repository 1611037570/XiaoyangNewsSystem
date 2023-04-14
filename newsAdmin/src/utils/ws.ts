export default class ScoketService {
  static instance: ScoketService | undefined // 单例
  ws: WebSocket | undefined // 服务器连接的socket对象
  callBackMap = {} // 保存回调函数
  connected = false // 是否连接成功
  sendRetryCount = 0 // send重试次数
  connectRetryCount = 0 // 重试链接服务器次数
  static get inStance() {
    if (this.instance === undefined) {
      this.instance = new ScoketService()
    }
    return this.instance
  }
  constructor() {}
  //  连接服务器
  connect(url = "ws://127.0.0.1:9998") {
    if (!window.WebSocket) {
      return console.log("浏览器不支持")
    }
    this.ws = new WebSocket(url)
    // 服务器连接成功
    this.ws.onopen = () => {
      console.log("连接服务器成功")
      this.connectRetryCount = 0
      this.connected = true
    }
    // 服务器发送来的数据
    this.ws.onmessage = (msg: any) => {
      const res = JSON.parse(msg.data)
      console.log("收到数据了 :>> ", res)
      const socketType = res.socketType
      // 回调函数是否存在
      if (this.callBackMap[socketType]) {
        const action = res.action
        if (action == "get") {
          this.callBackMap[socketType].call(this, res)
        }
      }
    }
    // 服务器连接失败
    this.ws.onclose = () => {
      console.log("连接服务器失败")
      this.connected = false
      this.connectRetryCount++
      setTimeout(() => {
        this.connect()
      }, this.connectRetryCount * 500)
    }
  }
  // 注册回调函数
  registerCallBack(socketType: string, callBack: Function) {
    this.callBackMap[socketType] = callBack
  }

  // 取消回调函数
  unRegisterCallBack(socketType: string) {
    this.callBackMap[socketType] = null
  }

  // 发送数据
  send(data: any) {
    if (this.sendRetryCount > 5) return
    if (this.connected) {
      this.ws?.send(JSON.stringify(data))
      this.sendRetryCount = 0
    } else {
      this.sendRetryCount++
      setTimeout(() => {
        this.send(data)
      }, this.sendRetryCount * 1000)
    }
  }
}
