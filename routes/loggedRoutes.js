const express = require('express');
const router = express.Router();
const orderController = require("../controllers/orderController");
const { checkUser } = require('../middleware/auth');

router.post("/create", checkUser, orderController.addOrder)
router.get("/:userId", checkUser, orderController.getOrderByUserId)

module.exports = router