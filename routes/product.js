const express = require('express');
const db = require('../db');
const router = express.Router();

router.get("/", async (req, res) => {
    let {pageSize, offset} = req.query;
    try{
        let sql = "SELECT * FROM TBL_PRODUCT LIMIT ? OFFSET ?";
        let [list] = await db.query(sql, [parseInt(pageSize), parseInt(offset)]);
        let [count] = await db.query("SELECT COUNT(*) AS cnt FROM TBL_PRODUCT");
        res.json({
            message : "result",
            list : list,
            count : count[0].cnt
        });
    }catch(err){
        console.log("에러 발생!");
        res.status(500).send("Server Error");
    }
})

router.get("/:productId", async (req, res) => {
    let { productId } = req.params;
    try{
        let [list] = await db.query("SELECT * FROM TBL_PRODUCT WHERE PRODUCTID = " + productId);
        console.log(list);
        res.json({
            message : "result",
            info : list[0]
        });
    }catch(err){
        console.log("에러 발생!");
        res.status(500).send("Server Error");
    }
})

router.post("/", async (req, res) => {
    let {productName, description, price, stock, category} = req.body;
    console.log(productName, description, price, stock, category);
    try{
        let query = "INSERT INTO TBL_PRODUCT VALUES(NULL, ?, ?, ?, ?, ?, 'Y', NOW(), NOW())";
        let result = await db.query(query, [productName, description, price, stock, category]);
        res.json({
            message : "success",
            result : result
        });
    }catch(err){
        console.log("에러 발생!");
        res.status(500).send("Server Error");
    }
})

router.delete("/:productId", async (req, res) => {
    let { productId } = req.params;
    try{
        let result = await db.query("DELETE FROM TBL_PRODUCT");
        console.log("result ==> ", result);
        res.json({
            message : "success",
            result : result
        });
    }catch(err){
        console.log("에러 발생!");
        res.status(500).send("Server Error");
    }
})

router.put("/:productId", async (req, res) => {
    let { productId } = req.params;
    let {productName, description, price, stock, category} = req.body;
    try{
        let query = "UPDATE TBL_PRODUCT SET "
                    + "productName=?, description=?, price=?, stock=?, category=? "
                    + "WHERE productId = ?";
        let result = await db.query(query, [productName, description, price, stock, category, productId]);
        res.json({
            message : "수정되었습니다.",
            result : result
        });
    }catch(err){
        console.log("에러 발생!");
        res.status(500).send("Server Error");
    }
})

module.exports = router;