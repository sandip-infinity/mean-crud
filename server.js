var express = require('express');
var cors = require('cors')

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
// var a=new Schema({ id: Number,name:String}, { collection : 'u' });
var userSchema = Schema({
	id: Number,
	firstname: String,
	lastname: String,
	email: String,
	phone: Number,
	password: String,
	createdDate: String,
	updatedDate: String,
	status: String,
	cpassword: String
});
var totalcount = 0;
var Users = mongoose.model('usersData', userSchema, 'User');
/*	
Users.find({}, function(err, data) { 
		console.log(data, data.length); 
	});*/


//add
app.post('/user/add', function (req, res) {
	console.log("save data", req.body);
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!
	var yyyy = today.getFullYear();
	if (dd < 10) { dd = '0' + dd; }
	if (mm < 10) { mm = '0' + mm; }
	var today = dd + '/' + mm + '/' + yyyy;
	//console.log("Date ", today);
	Users.find({}, function (err, data) {
		if (data) {
			//console.log(data); 
			new Users({
				'id': data.length + 1, 'firstname': req.body.firstname,
				'lastname': req.body.lastname, 'email': req.body.email,
				'phone': req.body.phone, 'password': req.body.password,
				'createdDate': today, 'updatedDate': '',
				'status': 'active'
			}).save(function (err, doc) {
				if (err) res.send({ 
					'status': 'false', 
					'info': 'insertion fail' 
				});
				else res.send(
					{
						'status': 'true',
						'user': doc,
						'info': 'insertion successful'
					});
			});
		}
	});
});

//delete
app.delete('/user/delete/:userId', function (req, res) {
	console.log("delete data", req.params.userId);
	var doc = {};
	Users.find({ '_id': ObjectID(req.params.userId) }, function (err, data) {
		console.log("data", data);
		doc = data;
	});
	Users.remove({ '_id': ObjectID(req.params.userId) }, function (err) {
		if (err) res.send({
			 'status': 'false', 
			 'info': 'delete fail'
			 });
		else res.send({ 
			'status': 'true', 
			'user': doc, 
			'info': 'delete success' 
		});
	});
});

//update
app.put('/user/update/:userId', function (req, res) {
	console.log("update data: ObjectID :", req.params.userId, " New Data :", req.body);
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!
	var yyyy = today.getFullYear();
	if (dd < 10) { dd = '0' + dd; }
	if (mm < 10) { mm = '0' + mm; }
	var today = dd + '/' + mm + '/' + yyyy;
	console.log("Date ", today);

	var id = { '_id': ObjectID(req.params.userId) };
	var newvalues = {
		$set: {
			firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email,
			phone: req.body.phone, updatedDate: today
		}
	};

	Users.updateOne(id, newvalues, function (err, data) {
		console.log(data);
		if (err) res.send({ 
			'status': 'false', 
			'info': 'updation fail' 
		});
		else res.send({
			'status': 'true',
			'info': 'updation successful'
		});
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
			'info': 'password update successfullu'
		});
	});
});

//load data 
app.get('/user/get/:pageIndex/:pageSize/:sortActive/:sortDirection', function (req, res) {
	console.log("get data PageIndex :", req.params.pageIndex, "PageSize :"
		, req.params.pageSize, " filtervalue :", req.params.filterValue, " sortActive :", req.params.sortActive, " sortDirection :",
		req.params.sortDirection);

	var skip = ((parseInt(req.params.pageIndex) + 1) - 1) * parseInt(req.params.pageSize);
	var size = parseInt(req.params.pageSize);
	pageNo = parseInt(req.params.pageIndex) + 1;

	var query;
	Users.count({}, function (err, count) {
		if (err) {
			totalcount = 0;
			res.send({ 'validation': 'Errors...', 'status': 'false' });
		}
		else {
			totalcount = count;
		}
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
		console.log("resultbvjnvn", docs);
		var result2 = {
			"totalRecords": totalcount,
			"nextPage": pageNo,
			"result": docs
		};
		res.send({
			'status': 'true',
			'user': result2,
			'info': 'get success'
		});
	});

});

//filter
app.get('/user/search/:pageIndex/:pageSize/:filterValue', function (req, res) {
	console.log("get data2", req.params.pageIndex, req.params.pageSize, req.params.filterValue);
	var param = req.params.filterValue;
	console.log("param :", param);
	var result = [];
	Users.find({}, function (err, docs) {
		if (!err) {
			console.log(docs[0].firstname, docs.length);
			for (var i = 0; i < docs.length; i++) {
				//var str1=docs[i].id;
				var str2 = docs[i].firstname.toLowerCase();
				var str3 = docs[i].lastname.toLowerCase();
				var str4 = docs[i].email.toLowerCase();
				var str5 = docs[i].phone;
				//var str6=docs[i].createdDate;
				//var str7=docs[i].updatedDate;

				if (str2.includes(param.toLowerCase()) || str3.includes(param.toLowerCase()) || str4.includes(param.toLowerCase()) || str5 == parseInt(param)) {
					result.push(docs[i]);
				}
			}//for

		}//if
		console.log("result array :", result);
		res.send(result);
	});
});



//login
app.post("/user/login", function (req, res) {
	console.log("login : ", req.body);
	Users.find({ $or: [{ phone: req.body.phone }, { password: req.body.password }] }, function (err, data) {
		if (data) {
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