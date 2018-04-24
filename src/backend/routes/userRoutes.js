var User = require("../models/userSchema").User;
var express = require('express');
var router = express.Router();
const crypto = require('crypto');

var func=require("../controllers/controller");
var fs = require("fs")
var multer = require('multer');
var upload = multer({ dest: '/home/infinity/mean-crud/src/assets/images/' });

var ObjectID = require('mongodb').ObjectID;


//load all data 
router.get('/user/get/:pageIndex/:pageSize/:sortActive/:sortDirection', function (req, res) {
	console.log("get data PageIndex :", req.params.pageIndex,
		"PageSize :", req.params.pageSize,
		"filtervalue :", req.params.filterValue,
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
			encode = func.base64_encode(docs[i].profile);
			decode = func.base64_decode(encode);
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
});

//find By specific Id
router.get('/user/getById/:userId', function (req, res) {
	console.log("get data by specific id :", req.params.userId);
	User.find({ 'id': req.params.userId }, function (err, docs) {
		let encode, decode, filename;
		for (let i = 0; i < docs.length; i++) {
			filename = docs[i].profile;
			encode =func. base64_encode(docs[i].profile);
			decode = func.base64_decode(encode);
			docs[i].profile = decode;
		}
		res.send({ 'docs': docs, 'filename': filename });
	});
});

router.post('/user/add', function (req, res) {
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
});


//delete
router.delete('/user/delete/:userId', function (req, res) {
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
});

//update
router.put('/user/update/:userId', function (req, res) {
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
});


//password update
app.put('/user/setNewPass/:userId', function (req, res) {
	console.log("Set new pass: ObjectID :", req.params.userId,
		" New password :", req.body);

	var id = { '_id': ObjectID(req.params.userId) };
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
});

//fileupload
var type = upload.single('avatar');
router.post("/user/uploading", type, function (req, res, next) {
	var id = 0;
	User.count({}, function (err, data) {
		if (err) throw error;
		if (data) {
			console.log("filename :", req.file.originalname);
			id = data + 1;
			var tmp_path = req.file.path;
			var target_path = '/home/infinity/mean-crud/src/assets/images/' + id + '_' + req.file.originalname;

			var src = fs.createReadStream(tmp_path);
			var dest = fs.createWriteStream(target_path);

			src.pipe(dest, function (e, d) { console.log(e) });
			fs.unlink(tmp_path, function (e, d) { console.log(e) });
			src.on('end', function () {
				res.send({ 'filename': req.file.originalname });
			});
		}
	});
});

//filter
router.get('/user/search/:pageIndex/:pageSize/:filterValue', function (req, res) {
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
});

//LogIn
router.post("/login", function (req, res) {
	console.log("login : ", req.body);
	let encode, decode;
	User.find({ 'phone': req.body.phone },
		function (err, docs) {
			if (err) {
				res.send(false);
			}
			else if (docs.length) {
                encode =func.base64_encode(docs[0].profile);
				decode = func.base64_decode(encode);
				docs[0].profile = decode;
				res.send(docs);
			} else {
				res.send(false);
			}
		});
});


module.exports = router;
