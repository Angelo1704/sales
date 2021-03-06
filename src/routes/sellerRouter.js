const express = require("express");
const sellerRouter = express.Router();
const sellerController = require("../controllers/sellerController");
const auth = require("../middlewares/auth");
sellerRouter.post("/authentication",sellerController.authentication);
sellerRouter.get("/listAllSellers",auth, sellerController.listAllSellers);
sellerRouter.post("/searchSellerByName",auth, sellerController.searchSellerByName);
sellerRouter.post("/newSeller",auth, sellerController.newSeller);
sellerRouter.get("/deleteSeller/:id",auth, sellerController.deleteSeller);
sellerRouter.put("/updateSeller/",auth, sellerController.updateSeller);

module.exports = sellerRouter;