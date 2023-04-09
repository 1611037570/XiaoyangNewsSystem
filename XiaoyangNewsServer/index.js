// ----------一、引入文件----------
let express = require("express"); // express框架
// 中间件
let bodyParser = require("body-parser"); // 解析API请求
let cors = require("cors"); // 解决跨域问题
// API
let pro = require("./API/pro");
let test = require("./API/test");

// ----------二、注册文件----------
let app = express(); // 实例化express框架

// 使用中间件
app.use(cors()); //配置跨域
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// 注册API
app.use(pro);

app.use(test);

// ----------三、启动服务----------
app.listen(3000, () => {
    console.log("服务器启动成功");
});

const webSocketService = require("./service/webSocketService")
webSocketService.listen()