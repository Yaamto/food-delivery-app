const express = require('express');
const router = express.Router();
const orderController = require("../controllers/orderController");
const { checkAdmin, checkUser } = require('../middleware/auth');


router.post("/create", checkUser, orderController.addOrder)
router.get("/allorder",checkAdmin, orderController.getAllOrder)
router.put("/edit/:id", checkAdmin, orderController.editOrderStatus)
router.get("/:userId", checkUser, orderController.getOrderByUserId)


module.exports = router