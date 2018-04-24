
var express = require('express');
var router = express.Router();

var func = require("../controllers/controller");

//product get data
router.get('/get/:pageIndex/:pageSize/:sortActive/:sortDirection'
	, func.getAllProducts);

//find  product By specific Id
router.get('/getById/:userId', func.getProductById);

//add product
router.post("/add", func.addProduct);

//delete product
router.delete("/delete/:productId", func.deleteProduct);

//update
router.put('/update/:userId', func.updateProduct);

//filter product
router.get('/search/:pageIndex/:pageSize/:filterValue', func.searchProduct);

module.exports = router;