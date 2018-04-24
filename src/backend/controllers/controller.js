var User = require("../models/userSchema").User;
var Product = require("../models/productSchema").Product;
var fs = require("fs")
const crypto = require('crypto');
var ObjectID = require('mongodb').ObjectID;

module.exports.login = function (req, res) {
	console.log("login : ", req.body);
	let encode, decode;
	var mad5Pass = crypto.createHash('md5')
		.update(req.body.password).digest("hex");
		
	User.find(
	{$or:[{phone: req.body.phone},{password:mad5Pass}]},
		function (err, docs) {
			if (err) {
				res.send(false);
			}
			else if (docs.length) {
				encode = module.exports.base64_encode(docs[0].profile);
				decode = module.exports.base64_decode(encode);
				docs[0].profile = decode;
				res.send(docs);
			} else {
				res.send(false);
			}
		});
}

module.exports.getAllUsers = function (req, res) {
	console.log("get data PageIndex :", req.params.pageIndex,
		"PageSize :", req.params.pageSize,
		"sortActive :", req.params.sortActive,
		"sortDirection :", req.params.sortDirection);

	var skip = ((parseInt(req.params.pageIndex) + 1) - 1) *
		parseInt(req.params.pageSize);
	var size = parseInt(req.params.pageSize);
	pageNo = parseInt(req.params.pageIndex) + 1;

	var query;
	User.count({}, function (err, count) {
		if (err) throw err
		totalcount = count;
	});

	query = User.find();
	if (req.params.sortActive == ' ' || req.params.sortDirection == ' ') {
		query.skip(skip);
		query.limit(size);
	} else {
		var col = req.params.sortActive;
		var dir = (req.params.sortDirection == 'asc') ? 1 : -1;
		query.sort({ [col]: dir })
		query.skip(skip);
		query.limit(size);
	}

	query.exec(function (err, docs) {
		let encode, decode;
		let s = [];
		for (let i = 0; i < docs.length; i++) {
			encode = module.exports.base64_encode(docs[i].profile);
			decode = module.exports.base64_decode(encode);
			docs[i].profile = decode;
			s.push(decode);
		}

		result2 = {
			"totalRecords": totalcount,
			"nextPage": pageNo,
			"result": docs,
		};

		res.send({
			'status': 'true',
			'user': result2,
			'info': 'get success',
		});
	});
}

module.exports.getUserById = function (req, res) {
	console.log("get data by specific id :", req.params.userId);
	User.find({ 'id': req.params.userId }, function (err, docs) {
		let encode, decode, filename;
		for (let i = 0; i < docs.length; i++) {
			filename = docs[i].profile;
			encode = module.exports.base64_encode(docs[i].profile);
			decode = module.exports.base64_decode(encode);
			docs[i].profile = decode;
		}
		res.send({ 'docs': docs, 'filename': filename });
	});
}

module.exports.saveUser = function (req, res) {
	console.log("save data", req.body);
	var today = new Date();
	var mad5Pass = crypto.createHash('md5')
		.update(req.body.password).digest("hex");

	User.find({}, function (err, data) {
		if (data) {
			new User({
				'id': data.length + 1, 'firstname': req.body.firstname,
				'lastname': req.body.lastname, 'email': req.body.email,
				'phone': req.body.phone, 'password': mad5Pass,
				'birthDate': req.body.birthDate, 'age': req.body.age,
				'profile': (data.length + 1) + '_' + req.body.profile,
				'createdDate': today, 'updatedDate': '', 'status': 'active'
			}).save(function (err, doc) {
				if (err) {
					res.send({
						'status': 'false',
						'info': 'insertion fail'
					});
				} else {
					res.send({
						'status': 'true',
						'user': doc,
						'info': 'insertion successful'
					});
				}
			});
		}
	});
}

module.exports.deleteUser = function (req, res) {
	console.log("delete data", req.params.userId);
	User.remove({ '_id': ObjectID(req.params.userId) }, function (err) {
		if (err) {
			res.send({
				'status': 'false',
				'info': 'delete fail'
			});
		}
		else {
			res.send({
				'status': 'true',
				'info': 'delete success'
			});
		}
	});
}

module.exports.updateUser = function (req, res) {
	console.log("update data: ObjectID :", req.params.userId,
		" New Data :", req.body);

	var today = new Date();
	var count = 0;

	User.count(function (err, data) {
		if (!err) {
			count = data;
		}
	})
	var id = { '_id': ObjectID(req.params.userId) };
	var newvalues = {
		$set: {
			firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, phone: req.body.phone,
			updatedDate: today, profile: req.body.profile
		}
	};

	User.updateOne(id, newvalues, function (err, data) {
		console.log(data);
		if (err) {
			res.send({
				'status': 'false',
				'info': 'updation fail'
			});
		} else {
			res.send({
				'status': 'true',
				'info': 'updation successful'
			});
		}
	});
}

module.exports.base64_encode = function (file, callback) {
	var bitmap =
		fs.readFileSync('/home/infinity/mean-crud/src/assets/images/' + file);
	return new Buffer(bitmap).toString('base64');
}

module.exports.base64_decode = function (file) {
	var bitmap = 'data:image/jpg;base64,' + file;
	return bitmap;
}

module.exports.setNewPass = function (req, res) {
	console.log("Set new pass: ObjectID :", req.params.newPass,
		" New password :", req.body);

	var id = { '_id': ObjectID(req.params.newPass) };
	var newvalues = {
		$set: {
			password: req.body.newPass
		}
	};

	User.updateOne(id, newvalues, function (err, data) {
		console.log(data);
		if (err) res.send({
			'status': 'false',
			'info': 'password not set'
		});
		else res.send({
			'status': 'true',
			'info': 'password update successfully'
		});
	});
}

module.exports.searchUser = function (req, res) {
	console.log("filter :", req.params.pageIndex, req.params.pageSize, req.params.filterValue);
	var param = req.params.filterValue;
	var result = [];
	User.find({}, function (err, docs) {
		if (!err) {
			console.log(docs[0].firstname, docs.length);
			for (var i = 0; i < docs.length; i++) {
				var str2 = docs[i].firstname.toLowerCase();
				var str3 = docs[i].lastname.toLowerCase();
				var str4 = docs[i].email.toLowerCase();
				var str5 = docs[i].phone;

				if (str2.includes(param.toLowerCase()) || str3.includes(param.toLowerCase()) || str4.includes(param.toLowerCase()) || str5 == parseInt(param)) {
					result.push(docs[i]);
				}
			}//for
		}//if
		res.send(result);
	});
}

module.exports.addProduct = function (req, res) {
	console.log(req.body);
	Product.find({}, function (err, data) {
		if (data) {
			new Product({
				'pid': data.length + 1,
				'productname': req.body.productname,
				'description': req.body.description,
				'price': req.body.price,
				'supplier': req.body.supplier,
				'manufacturingDate': req.body.manufacturingDate,
				'deliveryDate': req.body.deliveryDate
			}).save(function (err, doc) {
				if (err) {
					res.send({
						'status': 'false',
						'info': 'insertion fail'
					});
				} else {
					res.send({
						'status': 'true',
						'product': doc,
						'info': 'insertion successful'
					});
				}
			});

		} else
			throw err;
	});
}

module.exports.deleteProduct = function (req, res) {
	console.log("delete product data : ObjectID :", req.params.productId);
	Product.remove({ '_id': ObjectID(req.params.productId) }, function (err, data) {
		if (err) {
			res.send({
				'status': 'false',
				'info': 'delete fail'
			});
		}
		else {
			res.send({
				'status': 'true',
				'info': 'delete success'
			});
		}
	});
}

module.exports.getAllProducts = function (req, res) {
	console.log("get product data PageIndex:", req.params.pageIndex, "PageSize :"
		, req.params.pageSize, " filtervalue :", req.params.filterValue, " sortActive :", req.params.sortActive, " sortDirection :",
		req.params.sortDirection);

	var skip = ((parseInt(req.params.pageIndex) + 1) - 1) * parseInt(req.params.pageSize);
	var size = parseInt(req.params.pageSize);
	pageNo = parseInt(req.params.pageIndex) + 1;

	var query;
	Product.count({}, function (err, count) {
		if (err) {
			totalcount = 0;
			res.send({ 'status': 'false', 'message': 'empty docs' });
		}
		else {
			totalcount = count;
		}
	});

	query = Product.find();
	if (req.params.sortActive == ' ' || req.params.sortDirection == ' ') {
		query.skip(skip);
		query.limit(size);
	} else {
		var col = req.params.sortActive;
		var dir = (req.params.sortDirection == 'asc') ? 1 : -1;
		query.sort({ [col]: dir })
		query.skip(skip);
		query.limit(size);
	}

	query.exec(function (err, docs) {
		//console.log("resultbvjnvn", docs);
		var result2 = {
			"totalRecords": totalcount,
			"nextPage": pageNo,
			"result": docs
		};

		res.send({
			'status': 'true',
			'product': result2,
			'info': 'get success'
		});
	});
}

module.exports.getProductById = function (req, res) {
	console.log("get data by specific id :", req.params.userId);
	Product.find({ 'pid': req.params.userId }, function (err, docs) {
		//  console.log("rod",docs);
		res.send({ 'docs': docs });
	});
}

module.exports.searchProduct = function (req, res) {
	console.log("get data2", req.params.pageIndex, req.params.pageSize, req.params.filterValue);
	var param = req.params.filterValue;
	console.log("param :", param);
	var result = [];
	Product.find({}, function (err, docs) {
		if (!err) {
			console.log(docs[0].productname, docs.length);
			for (var i = 0; i < docs.length; i++) {
				//var str1=docs[i].id;
				var str2 = docs[i].productname.toLowerCase();
				var str3 = docs[i].description.toLowerCase();
				var str4 = docs[i].supplier.toLowerCase();
				var str5 = docs[i].price;
				if (str2.includes(param.toLowerCase()) || str3.includes(param.toLowerCase()) || str4.includes(param.toLowerCase()) || str5 == parseInt(param)) {
					result.push(docs[i]);
				}
			}//for
		}//if
		console.log("result array :", result);
		res.send(result);
	});
}

module.exports.updateProduct = function (req, res) {
	console.log("update data: ObjectID :", req.params.userId,
		" New Data :", req.body);

	var today = new Date();
	var count = 0;

	Product.count(function (err, data) {
		if (!err) {
			count = data;
		}
	})
	var id = { '_id': ObjectID(req.params.userId) };
	var newvalues = {
		$set: {
			productname: req.body.productname,
			description: req.body.description,
			price: req.body.price,
			supplier: req.body.supplier,
			deliveryDate: req.body.deliveryDate
		}
	};

	Product.updateOne(id, newvalues, function (err, data) {
		console.log(data);
		if (err) {
			res.send({
				'status': 'false',
				'info': 'updation fail'
			});
		} else {
			res.send({
				'status': 'true',
				'info': 'updation successful'
			});
		}
	});
}