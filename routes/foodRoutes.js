const express = require('express');

const router = express.Router();
const foodController = require("../controllers/foodController");
const { checkUser, checkAdmin } = require('../middleware/auth');

router.get("/allfood", foodController.getAllFood)
router.get("/:id", foodController.singleFood)
router.get("/category/:id", foodController.getByCategory)
router.post("/create", checkAdmin, foodController.addFood)
router.delete("/delete/:id",checkAdmin, foodController.deleteFood)
router.put("/edit/:id", checkAdmin, foodController.editFood)

module.exports = router