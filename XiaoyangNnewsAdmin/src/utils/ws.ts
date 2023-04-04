export default class ScoketService {
  // 单例
  static instance: ScoketService | undefined
  ws: WebSocket | undefined

  static get inStance() {
    if (this.instance === undefined) {
      this.instance = new ScoketService()
    }
    return this.instance
  }
  constructor() {
    // this.chatModel = new ChatModel()
    // //用户登陆token
    // this.wsAccessToken = store.getters.wsAccessToken
    // //ws地址
    // this.wsUrl = config.wsUrl + "?access_token=" + this.wsAccessToken
    // //websocket对象
    // this.socketTask = null
    // //心跳检测
    // this.heartbeatInterval = null
    // //心跳检测时间
    // this.heartbeatTimeOut = 5000
    // //是否人为关闭
    // this.isPeopleClose = false
    // //断线重连机制
    // this.reconnectInterval = null
    // //重连时间
    // this.reconnectTimeOut = 5000
    // //重连次数
    // this.reconnectCount = 5
    // //落网重连
    // uni.onNetworkStatusChange((res) => {
    //   if (res.isConnected) {
    //     this.connect()
    //   }
    // })
  }
  //  连接服务器
  connect(url = "ws://127.0.0.1:9998") {
    if (!window.WebSocket) {
      return console.log("浏览器不支持")
    }
    this.ws = new WebSocket(url)
    this.ws.onopen = () => {
      console.log("连接服务器成功")
    }
    this.ws.onmessage = (msg: any) => {
      console.log("msg :>> ", msg)
    }
    this.ws.onclose = () => {
      console.log("连接服务器失败")
    }
  }
}
