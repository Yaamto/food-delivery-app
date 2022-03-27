const express = require('express');
const router = express.Router();
const categoryController = require("../controllers/categoryController")
const foodController = require("../controllers/foodController");
const userController = require("../controllers/userController")
// AUTH
router.post("/register", userController.register)
router.post("/login", userController.login)
router.post("/logout", userController.logout)
// CATEGORY
router.get("/allcategory", categoryController.allCategory)
//FOOD
router.get("/allfood", foodController.getAllFood)
router.get("/:id", foodController.singleFood)
router.get("/category/:id", foodController.getByCategory)

module.exports = router