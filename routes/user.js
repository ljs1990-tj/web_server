const express = require('express');
const db = require('../db');
const router = express.Router();

router.post("/", async (req, res) => {
    let {userId, pwd} = req.body;
    try{
        let query = "SELECT userId, userName, phone, status FROM TBL_USER WHERE USERID = ? AND PWD = ?";
        let [user] = await db.query(query, [userId, pwd]);
        let result = {};
        if(user.length > 0){
            // 세션 값 저장
            req.session.user = {
                sessionId : user[0].userId,
                sessionName : user[0].userName,
                sessionPhone : user[0].phone,
                sessionStatus : user[0].status,
            }
            console.log(req.session);
            result = {
                message : "로그인 성공!",
                user : user[0]
            }
        } else {
            result = {
                message : "아이디/패스워드 확인하셈"
            }
        }
        res.json(result);
    }catch(err){
        console.log("에러 발생!");
        res.status(500).send("Server Error");
    }
})

router.get("/info", (req, res) => {
    if(req.session.user){
        res.json({
            isLogin : true,
            user : req.session.user
        })
    } else {
        res.json({
            isLogin : false
        })
    }
})

router.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if(err){
            console.log("세션 삭제 안됨");
            res.status(500).send("로그아웃 실패!");
        } else {
            res.clearCookie("connect.sid");
            res.json({
                message : "로그아웃 되셨음"
            });
        }
    });
})

module.exports = router;