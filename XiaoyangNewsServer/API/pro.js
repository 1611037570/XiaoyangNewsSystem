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
        console.log("插找ssql:>> 成功！", sql);
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
router.get("/menu", (req, res) => {
    // 查角色权限
    let sql = `select * from user WHERE id = ?`;
    console.log("----------------------------------------------------------------");
    console.log("查角色权限sql:>> ", sql);
    db.query(sql, [req.query.id], (err, data) => {
        if (data != false) {
            if (data[0].role == 0) {
                console.log('0 :>> ', 0);
                return res.json({
                    code: 200,
                    data: [
                        {
                            id: "1",
                            name: "系统首页",
                            level: 1,
                            children: [
                                {
                                    id: "1-1",
                                    name: "数据展示",
                                    path: "/main/show",
                                    level: 2
                                }
                            ]
                        },
                        {
                            id: "2",
                            name: "系统管理",
                            level: 1,
                            children: [
                                {
                                    id: "2-1",
                                    name: "新闻管理",
                                    level: 2,
                                    path: "/main/news"
                                },
                                {
                                    id: "2-2",
                                    name: "分类管理",
                                    level: 2,
                                    path: "/main/nav"
                                },
                                {
                                    id: "2-3",
                                    name: "文案管理",
                                    level: 2,
                                    path: "/main/note"
                                },
                                {
                                    id: "2-4",
                                    name: "用户管理",
                                    level: 2,
                                    path: "/main/user"
                                }
                            ]
                        }
                    ]
                });
            } else if (data[0].role == 1) {
                console.log('1 :>> ', 1);
                return res.json({
                    code: 200,
                    data: [
                        {
                            id: "1",
                            name: "系统首页",
                            level: 1,
                            children: [
                                {
                                    id: "1-1",
                                    name: "数据展示",
                                    path: "/main/show",
                                    level: 2
                                }
                            ]
                        },
                        {
                            id: "2",
                            name: "系统管理",
                            level: 1,
                            children: [
                                {
                                    id: "2-1",
                                    name: "新闻管理",
                                    level: 2,
                                    path: "/main/news"
                                },
                                {
                                    id: "2-3",
                                    name: "文案管理",
                                    level: 2,
                                    path: "/main/note"
                                },

                            ]
                        }
                    ]
                });
            }

        } else {
            return res.json({
                code: 400,
                msg: "false",
            });
        }
    });
});
module.exports = router;
