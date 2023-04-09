let db = require("../db/index");
const express = require("express");
const router = express.Router();

// 查找
router.get("/unify", (req, res) => {
    let id
    let name = req.query.name;
    let sql = "SELECT "; // 默认SQL
    let pageIndex = req.query.pageIndex ?? 0; // 页码
    let pageSize = req.query.pageSize ?? 5; // 页面数量
    // 计数查询
    if (req.query.conut) {
        if (name == "news") sql += `count(*) as rows FROM news,user,nav WHERE news.uid=user.id AND news.nid=nav.id  `
        else if (name == "note") sql += `count(*) as rows FROM note,user  WHERE user.id=uid `
        else if (name == "likes") sql += `count(*) as rows FROM likes WHERE 1=1 `
        else sql += ` count(*) as rows FROM ${name} `;
    }
    // 正常查询
    else {
        if (name == "news") sql += `* FROM news,user,nav WHERE news.uid=user.id AND news.nid=nav.id `
        else if (name == "note") sql += `note.id,uid,text,user.name FROM  note,user WHERE user.id=uid `
        else if (name == "likes") sql += `* FROM  news,likes WHERE news.newsId=likes.newsId `
        else sql += ` * FROM ${name} `;
    }
    // 带参查询
    if (req.query.data) {
        if (name == "news") sql += ""
        else if (name == "note") sql += ""
        else if (name == "likes") sql += ""
        else sql += "WHERE 1=1"
        for (var k in req.query.data) {
            if (req.query.data[k] == null || req.query.data[k] == "" || k == "strict") continue;
            else if (req.query.strict) sql += ` and ${k} = "${req.query.data[k]}"`; // 严格查询
            else if (name == "note" && k == "id") sql += ` and note.id like "%${req.query.data[k]}%"`;
            else sql += ` and ${k} like "%${req.query.data[k]}%"`; // 匹配查询
        }
        // 非全严格查询
        if (req.query.data.strict) {
            for (var k in req.query.data.strict) {
                sql += ` and ${k} = "${req.query.data.strict[k]}"`;
            }
        }
    }
    // 分页查询
    if (req.query.conut == null && req.query.all == null) {
        if (req.query.top) id = " heat DESC"
        else if (name == "news") id = "newsId"
        else if (name == "note") id = "note.id"
        else id = "id"

        sql += ` ORDER BY ${id} LIMIT ${pageIndex * pageSize},${pageSize}`;
    }
    console.log("----------------------------------------------------------------");
    console.log("查询sql:>> ", sql);
    console.log('name :>> ', name);
    db.query(sql, [Object.values(req.query)[0], pageIndex], (err, data) => {
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

// 添加
router.get("/add", (req, res) => {
    let name = req.query.name;
    let sql = `INSERT INTO ${name} (`;
    let key = "";
    let value = "";
    for (var k in req.query.data) {
        key += k + ",";
        value += `"${req.query.data[k]}",`;
    }
    key = key.slice(0, -1);
    value = value.slice(0, -1);
    sql += key + ") VALUES (" + value + ")";
    console.log("----------------------------------------------------------------");
    console.log("添加sql:>> ", sql);
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

// 修改
router.get("/renew", (req, res) => {
    let name = req.query.name;
    let sql = `update ${name} set `;
    let id = "";
    for (var k in req.query.data) {
        if (id == "") {
            if (k == "newsId") id = { k, v: req.query.data.newsId };
            else if (name == "note") id = { k: "id", v: req.query.data.id };
            else id = { k, v: req.query.data.id };
        }
        sql += k + `="${req.query.data[k]}",`;
    }
    sql = sql.slice(0, -1) + " where " + id.k + "=" + id.v;
    console.log("----------------------------------------------------------------");
    console.log("修改sql:>> ", sql);
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

router.get("/del", (req, res) => {
    let name = req.query.name;
    let id
    if (name == "news") id = "newsId"
    else id = "id"
    let sql = `DELETE FROM ${name} WHERE `;
    sql += `${id} = ${req.query.id}`;
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
