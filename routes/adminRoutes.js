const express = require('express');
const router = express.Router();
const { checkAdmin } = require('../middleware/auth');
const categoryController = require("../controllers/categoryController")
const foodController = require("../controllers/foodController");
const orderController = require("../controllers/orderController");

//CATEGORY
router.post("/create", checkAdmin, categoryController.addCategory )
//FOOD
router.post("/create", checkAdmin, foodController.addFood)
router.delete("/delete/:id",checkAdmin, foodController.deleteFood)
router.put("/edit/:id", checkAdmin, foodController.editFood)
//ORDER
router.get("/allorder",checkAdmin, orderController.getAllOrder)
router.put("/edit/:id", checkAdmin, orderController.editOrderStatus)

module.exports = router