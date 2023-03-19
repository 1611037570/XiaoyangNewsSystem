let db = require("../db/index");
const express = require("express");
const router = express.Router();
// 添加收藏
router.get("/islike", (req, res) => {
    let sql = `INSERT INTO likes (uid, newsid) VALUES (?, ?)`;
    db.query(sql, [req.query.uid, req.query.newsid], (err, data) => {
        if (data) {
            return res.json({
                code: 200,
                data,
            });
        } else {
            return res.json({
                code: 500,
                data: "1",
            });
        }
    });
});
router.get("/like", (req, res) => {
    let sql = "SELECT ";
    // 计数
    if (req.query.conut) sql += "count(*) as rows from likes";
    // 正常查询
    else sql += " * from likes ";
    if (req.query.newsid && req.query.uid) sql += "where uid = ? and  newsid=?";
    if (req.query.uid && req.query.newsid == undefined)
        sql =
            "select * from likes,news where likes.uid = ? and news.newsId = likes.newsid";
    if (req.query.index)
        sql += " ORDER BY news.newsId LIMIT " + req.query.index * 10 + ",10";
    db.query(sql, [req.query.uid, req.query.newsid], (err, data) => {
        console.log(sql);
        if (data) {
            return res.json({
                code: 200,
                data,
            });
        } else {
            return res.json({
                code: 500,
                data: "无法获取导航信息",
            });
        }
    });
});
router.get("/dellike", (req, res) => {
    let sql = `DELETE FROM likes WHERE newsid=? and uid = ? `;
    db.query(sql, [req.query.newsid, req.query.uid], (err, data) => {
        console.log(req.query.newsid, req.query.uid);
        if (data) {
            return res.json({
                code: 200,
                data,
            });
        } else {
            return res.json({
                code: 500,
                data: "无法获取导航信息",
            });
        }
    });
});
module.exports = router;
