var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = Schema({
	pid: Number,
	productname: String,
	description: String,
	price: Number,
	supplier: String,
	manufacturingDate: String,
	deliveryDate: String,
	status: String
});

var Product = mongoose.model('productdata', productSchema, 'Product');

module.exports = {
  Product : Product
}
