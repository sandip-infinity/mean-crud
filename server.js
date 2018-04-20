var express = require('express');
var cors = require('cors')
const crypto = require('crypto');

var fs = require("fs")
var multer = require('multer');
var upload = multer({ dest: '/home/infinity/mean-crud/src/assets/images/' });

app = express();
app.use(cors());
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var ObjectID = require('mongodb').ObjectID;

var mongoose = require('mongoose');
var url = 'mongodb://127.0.0.1:27017/userDetails';
var Schema = mongoose.Schema;
mongoose.connect(url, function (err, res) {
	if (err) throw err;
	if (res) { console.log("connected successfully"); } else { console.log("connection failed"); }
});

var userSchema = Schema({
	id: Number,
	firstname: String,
	lastname: String,
	email: String,
	phone: Number,
	password: String,
	birthDate: String,
	age: Number,
	profile: String,
	createdDate: String,
	updatedDate: String,
	status: String,
	cpassword: String
});

var totalcount = 0;
var Users = mongoose.model('usersData', userSchema, 'User');

//email validation
app.get('/user/isEmailExist/:email', function (req, res) {
	console.log("fsdcsd", req.params.email);
	Users.find({ 'email': req.params.email }, function (err, docs) {
		if (docs.length) {
			res.send({
				'status': true,
				'message': 'Email already exist'
			});
		} else {
			res.send({
				"status": false,
				"message": "Valid email"
			});
		}
	})
})

//find By specific Id
app.get('/user/getById/:userId', function (req, res) {
	console.log("get data by specific id :", req.params.userId);
	Users.find({ 'id': req.params.userId }, function (err, docs) {
		let encode, decode, filename;
		for (let i = 0; i < docs.length; i++) {
			filename = docs[i].profile;
			encode = base64_encode(docs[i].profile);
			decode = base64_decode(encode);
			docs[i].profile = decode;
		}
		res.send({ 'docs': docs, 'filename': filename });
	});
});

//load all data 
app.get('/user/get/:pageIndex/:pageSize/:sortActive/:sortDirection', function (req, res) {
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
	Users.count({}, function (err, count) {
		if (err) throw err
		totalcount = count;
	});

	query = Users.find();
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
			encode = base64_encode(docs[i].profile);
			decode = base64_decode(encode);
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


app.post('/user/add', function (req, res) {
	console.log("save data", req.body);
	var today = new Date();
	var mad5Pass = crypto.createHash('md5')
		.update(req.body.password).digest("hex");

	Users.find({}, function (err, data) {
		if (data) {
			new Users({
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
app.delete('/user/delete/:userId', function (req, res) {
	console.log("delete data", req.params.userId);
	Users.remove({ '_id': ObjectID(req.params.userId) }, function (err) {
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
app.put('/user/update/:userId', function (req, res) {
	console.log("update data: ObjectID :", req.params.userId,
		" New Data :", req.body);

	var today = new Date();
	var count = 0;

	Users.count(function (err, data) {
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

	Users.updateOne(id, newvalues, function (err, data) {
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

	Users.updateOne(id, newvalues, function (err, data) {
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
// var result2;
// obj = [];
// var array = [];

//encode image
function base64_encode(file) {
	var bitmap =
		fs.readFileSync('./src/assets/images/' + file);
	return new Buffer(bitmap).toString('base64');
}

//decode image
function base64_decode(base64str) {
	var bitmap = 'data:image/jpg;base64,' + base64str;
	return bitmap;
}

//filter
app.get('/user/search/:pageIndex/:pageSize/:filterValue', function (req, res) {
	console.log("filter :", req.params.pageIndex, req.params.pageSize, req.params.filterValue);
	var param = req.params.filterValue;
	var result = [];
	Users.find({}, function (err, docs) {
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

//fileupload
var type = upload.single('avatar');
app.post("/user/uploading", type, function (req, res, next) {
	var id = 0;
	Users.count({}, function (err, data) {
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

//login
app.post("/user/login", function (req, res) {
	console.log("login : ", req.body);
	Users.find({ $or: [{ phone: req.body.phone }, { password: req.body.password }] }, function (err, data) {
		if (data) {
			let encode, decode;
			for (let i = 0; i < data.length; i++) {
				if (data[i].profile === 'undefined') {
					let str = '0_passingcertificate.jpg';
					encode = base64_encode(str);
				} else {
					encode = base64_encode(data[i].profile);
					decode = base64_decode(encode);
					data[i].profile = decode;
				}

			}
			console.log(data);
			res.send(data);
		}
	});
});

//signup
app.post("/user/signup", function (req, res) {
	var today = new Date();

	var dd = today.getDate();

	var mm = today.getMonth() + 1; //January is 0!

	var yyyy = today.getFullYear();

	if (dd < 10) { dd = '0' + dd; }

	if (mm < 10) { mm = '0' + mm; }

	var today = dd + '/' + mm + '/' + yyyy;

	console.log("Date ", today);

	var item = {

		firstname: req.body.firstname,

		lastname: req.body.lastname,

		phone: req.body.phone,

		email: req.body.email,

		password: req.body.password,

		cpassword: req.body.cpassword,

		createdDate: this.today,

	}

	var data = new Users(item);

	data.save();

	console.log("Data inserted");
});


app.listen(4001, function () {
	console.log("Server is running on 4001");
});