const express = require('express');
const db = require('../db');
const router = express.Router();

// api
router.get("/", async (req, res) => {
    try{
        let sql = "SELECT * FROM TBL_FEED";
        let [list] = await db.query(sql);
        res.json({
            message : "result",
            list : list
        });
    }catch(err){
        console.log("에러 발생!");
        res.status(500).send("Server Error");
    }
})

router.get("/:id", async (req, res) => {
    let { id } = req.params;
    try{
        let sql = "SELECT * FROM TBL_FEED WHERE ID = " + id;
        let [list] = await db.query(sql);
        res.json({
            message : "result",
            feed : list[0]
        });
    }catch(err){
        console.log("에러 발생!");
        res.status(500).send("Server Error");
    }
})

router.delete("/:id", async (req, res) => {
    let { id } = req.params;
    try{
        let sql = "DELETE FROM TBL_FEED WHERE ID = " + id;
        let result = await db.query(sql);
        res.json({
            message : "result",
            result : result
        });
    }catch(err){
        console.log("에러 발생!");
        res.status(500).send("Server Error");
    }
})

router.put("/:id", async (req, res) => {
    let { id } = req.params;
    let { userId, content } = req.body;
    try{
        let sql = "UPDATE TBL_FEED SET USERID = ?, CONTENT = ? WHERE ID = ?";
        let result = await db.query(sql, [userId, content, id]);
        res.json({
            message : "result",
            result : result
        });
    }catch(err){
        console.log("에러 발생!");
        res.status(500).send("Server Error");
    }
})


router.post("/", async (req, res) => {
    let { userId, content } = req.body;
    try{
        let sql = "INSERT INTO TBL_FEED VALUES(NULL, ?, ?, NOW())";
        let result = await db.query(sql, [userId, content]);
        res.json({
            message : "result",
            result : result
        });
    }catch(err){
        console.log("에러 발생!");
        res.status(500).send("Server Error");
    }
})


module.exports = router;