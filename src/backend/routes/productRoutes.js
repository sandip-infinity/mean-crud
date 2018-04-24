var Product = require("../models/productSchema").Product;
var express = require('express');
var router = express.Router();
const crypto = require('crypto');

var ObjectID = require('mongodb').ObjectID;

router.post("/add", function (req, res) {
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
});


router.delete("/delete/:productId", function (req, res) {
	console.log("delete product data : ObjectID :", req.params.productId);
	Product.remove({'_id': ObjectID(req.params.productId) }, function (err, data) {
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
});

router.get("/productinfo", function (req, res) {
	// console.log("requesttrdhjgcj",req.body);
	Product.find({}, function (err, data) {
		// console.log("result",data);
		if (data) {
			// console.log(data);
			res.send(data);
		} else
			throw err;
	});
});

//product get data
router.get('/get/:pageIndex/:pageSize/:sortActive/:sortDirection', function (req, res) {
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
});

//find By specific Id
router.get('/getById/:userId', function (req, res) {
	console.log("get data by specific id :", req.params.userId);
	Product.find({ 'pid': req.params.userId }, function (err, docs) {
      //  console.log("rod",docs);
		res.send({ 'docs': docs});
	});
});

router.get('/search/:pageIndex/:pageSize/:filterValue', function (req, res) {
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
});

//update
router.put('/update/:userId', function (req, res) {
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
});

//delete
router.delete('/delete/:userId', function (req, res) {
	console.log("delete data", req.params.userId);
	Product.remove({ '_id': ObjectID(req.params.userId) }, function (err) {
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
});

router.post("/update", function (req, res) {
	console.log(req.body);
	Product.update(req.body, function (err, data) {
		if (data) {
			console.log("Update Data");
			res.send(data);
		} else {
			console.log("error");
			throw err;
		}
	});
})

module.exports = router;