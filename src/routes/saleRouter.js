const express = require("express");
const saleRouter = express.Router();
const saleController = require("../controllers/saleController");

saleRouter.get("/listAllSales",saleController.listAllSales);

module.exports = saleRouter;