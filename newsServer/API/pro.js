let db = require("../db/index");
const express = require("express");
const router = express.Router();

// 用户登录
router.post(
    "/login",
    (req, res, next) => {
        if (req.body.phone.length !== 11 && req.body.password != null) {
            return res.json({
                code: 400,
                msg: "不能传递错误的登录信息！",
            });
        } else next();
    },
    (req, res) => {
        let sql = `select * from user where phone = ? and password = ?`;
        console.log("----------------------------------------------------------------");
        console.log("插找ssql:>> 成功！");
        db.query(sql, [req.body.phone, req.body.password], (err, data) => {
            if (data != false) {
                return res.json({
                    code: 200,
                    data,
                });
            } else {
                return res.json({
                    code: 400,
                    msg: "false",
                });
            }
        });
    }
);

// 添加
router.post("/add", (req, res) => {
    let { ntitle, text, time, heat, uid, nid } = req.body.data
    sql = `INSERT INTO news (ntitle, text,time, heat, uid,nid) VALUES (${ntitle},?,?,${heat},${uid},${nid})`
    console.log("----------------------------------------------------------------");
    console.log("插入新闻sql:>> 成功！", sql);
    db.query(sql, [text, time], (err, data) => {
        if (data != false) {
            return res.json({
                code: 200,
                data,
            });
        } else {
            return res.json({
                code: 400,
                msg: "false",
            });
        }
    });
});
// xiugai
router.post("/edit", (req, res) => {
    let { newsId, ntitle, text, time, nid } = req.body.data
    sql = `UPDATE news SET ntitle="${ntitle}", text=?, time="${time}",nid="${nid}" WHERE newsId= "${newsId}"`
    console.log("----------------------------------------------------------------");
    console.log("更新新闻sql:>> 成功！");
    db.query(sql, [text], (err, data) => {
        if (data != false) {
            return res.json({
                code: 200,
                data,
            });
        } else {
            return res.json({
                code: 400,
                msg: "false",
            });
        }
    });
});

router.get("/census", (req, res) => {
    let sql = `select user.name, count(news.uid) as row from news,user WHERE uid=id group by user.name order by count(news.uid)  limit 10`;
    console.log("----------------------------------------------------------------");
    console.log("sql:>> ", sql);
    db.query(sql, (err, data) => {
        if (data != false) {
            return res.json({
                code: 200,
                data,
            });
        } else {
            return res.json({
                code: 400,
                msg: "false",
            });
        }
    });
});

module.exports = router;
