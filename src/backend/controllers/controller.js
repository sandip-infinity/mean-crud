var User = require("../models/userSchema").User;
var fs = require("fs")

module.exports.base64_encode = function (file, callback) {
	var bitmap =
		fs.readFileSync('/home/infinity/mean-crud/src/assets/images/' + file);
	return new Buffer(bitmap).toString('base64');
}

module.exports.base64_decode = function (file) {
	var bitmap = 'data:image/jpg;base64,' + file;
	return bitmap;
}