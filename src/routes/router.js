const express = require("express");
const router = express.Router();
const sellerRouter = require("./sellerRouter");
const saleRouter = require("./saleRouter");

router.get('/',(req,res) => {
    res.send("Its working");
});

router.use("/seller", sellerRouter);
router.use("/sale", saleRouter);


module.exports = router;