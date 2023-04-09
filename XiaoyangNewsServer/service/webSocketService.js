// ws.js
const WebSocket = require("ws")

const wss = new WebSocket.Server({
    port: 9998
})

module.exports.listen = () => {
    wss.on("connection", client => {
        client.on("message", msg => {
            let message = JSON.parse(msg)
            if (message.action == "get") {
                wss.clients.forEach(client => {
                    client.send(JSON.stringify(message))
                })
            }
        })
    })
}
