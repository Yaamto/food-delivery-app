const express = require('express');
const { checkAdmin } = require('../middleware/auth');
const categoryController = require("../controllers/categoryController")

const router = express.Router();

router.post("/create", checkAdmin, categoryController.addCategory )
router.get("/allcategory", categoryController.allCategory)

module.exports = router