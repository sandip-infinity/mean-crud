var express=require('express');
var cors = require('cors')

app=express();
app.use(cors());
var bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
var ObjectID = require('mongodb').ObjectID;

var mongoose = require('mongoose');
var url='mongodb://127.0.0.1:27017/userDetails';
var Schema = mongoose.Schema;  
mongoose.connect(url, function (err,res) {
    if (err) throw err;
    if(res){console.log("connected successfully");}else{console.log("connection failed");}
});

// var a=new Schema({ id: Number,name:String}, { collection : 'u' });

var userSchema = Schema({
	id: Number,
	firstname:String,
	lastname:String,
	email:String,
	phone:Number,
	password:String,
	createdDate:String,
	updatedDate:String,
	status:String,
	cpassword:String
});
var totalcount=0;
var Users = mongoose.model('usersData',userSchema,'User');
/*	
Users.find({}, function(err, data) { 
		console.log(data, data.length); 
	});*/

app.get('/user/get/:pageIndex/:pageSize',function(req,res){
	console.log("PageIndex :",req.params.pageIndex,"PageSize :",req.params.pageSize);
	var skip=((parseInt(req.params.pageIndex)+1)-1)*parseInt(req.params.pageSize);
	var size=parseInt(req.params.pageSize);
	pageNo=parseInt(req.params.pageIndex)+1;
	Users.count({}, function(err, count) { 
		if(err){
			totalcount=0;
			res.send({'validation': 'Errors...', 'status': 'false'});
		}
		else{
			totalcount=count;
		}
	});
	var query=Users.find();
	query.skip(skip);
	console.log("size",size)
	query.limit(size);
	query.exec(function(err, docs){
		console.log("resultbvjnvn",docs);
		var result = {
			"totalRecords" : totalcount,
			"nextPage":pageNo,
			"result": docs
		};
		res.send({'validation': 'result get successfully', 'status': 'true',
		'pageSize':size,'result':result});
	});
	/*
	Users.paginate({}, { page: pageNo, limit: limit }, function(err, result) {
		// result.docs 
		// result.total 
		// result.limit - 10 
		// result.page - 3 
		// result.pages 
		console.log("result: n",result)
	});
	
	/*
	Users.find().skip(skip).limit(limit).exec(function(err, docs){

        if(err){
            res.send({'validation': 'Errors...', 'status': 'false'});
        }
        else if(!docs){
            res.send({'validation': 'Empty docs...', 'status': 'false'});
        }
        else{
            var result = {
                "totalRecords" : totalcount,
                "page": pageNo,
                "nextPage": pageNo + 1,
                "result": docs
            };
            res.send({'validation': 'result get successfully', 'status': 'true','result':result});
        }

    });*/
});

app.post("/user/login",function(req,res){
    console.log("login : ",req.body);
    Users.find({$or:[{phone:req.body.phone},{password:req.body.password}]}, function(err, data) { 
		if(data){
		console.log(data); 
		res.send(data);}
    });
});

app.post("/user/signup",function(req,res){

	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	if(dd<10){ dd='0'+dd;} 
	if(mm<10){ mm='0'+mm;} 
	var today = dd+'/'+mm+'/'+yyyy;
	console.log("Date ",today);

	Users.find({}, function(err, data) { 
		if(data){
		//console.log(data); 
		new Users({
			'id':data.length+1,
			'firstname':req.body[0].firstname,'lastname':req.body[0].lastname,
			'email':req.body[0].email,'phone':req.body[0].phone,'password':req.body[0].password,
			'cpassword':req.body[0].cpassword,
			'createdDate':today,'updatedDate':'', 'status':'active'
			}).save(function(err, doc){
				if(err) res.send({'validation': 'Something missing... or not doing in proper way', 'status': 'false'});
				else res.send({'validation': 'Successfully inserted..', 'status': 'true'});
			});
		}
});

	// var item={
	// 	id:req.body[0].length+1,
	// 	firstname:req.body.firstname,
	// 	lastname:req.body.lastname,
	// 	phone:req.body.phone,
	// 	email:req.body.email,
	// 	password:req.body.password,
	// 	cpassword:req.body.cpassword,
	// 	createdDate:today,
	// 	updatedDate:'',
	// 	status:'Active'
	// }
	// var data= new Users(item);
    // data.save(function(err, doc){
	// 	if(err) res.send({'validation': 'Something missing... or not doing in proper way', 'status': 'false'});
	// 	else res.send({'validation': 'Successfully inserted..', 'status': 'true'});
	// });
    // console.log("Data inserted");

});

//add
app.post('/user/add',function(req,res){
	console.log("save data",req.body[0]);
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	if(dd<10){ dd='0'+dd;} 
	if(mm<10){ mm='0'+mm;} 
	var today = dd+'/'+mm+'/'+yyyy;
	console.log("Date ",today);

	Users.find({}, function(err, data) { 
		if(data){
		//console.log(data); 
		new Users({
			'id':data.length+1,
			'firstname':req.body[0].firstname,'lastname':req.body[0].lastname,
			'email':req.body[0].email,'phone':req.body[0].phone,'password':req.body[0].password,
			'createdDate':today,'updatedDate':'', 'status':'active'
			}).save(function(err, doc){
				if(err) res.send({'validation': 'Something missing... or not doing in proper way', 'status': 'false'});
				else res.send({'validation': 'Successfully inserted..', 'status': 'true'});
			});
		}
});
});

//delete
 app.delete('/user/delete/:userId', function(req, res){
	console.log("delete data",req.params.userId);
	Users.remove({'_id':ObjectID(req.params.userId)}, function(err) { 
		if(err) res.send({'validation': 'Something missing... or not doing in proper way', 'status': 'false'});
		else res.send({'validation': 'Successfully deleted..', 'status': 'true'});
	});
 });

//update
app.put('/user/update/:userId', function(req, res){
	console.log("update data: ObjectID :",req.params.userId," New Data :",req.body);
	console.log("save data",req.body[0]);
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	if(dd<10){ dd='0'+dd;} 
	if(mm<10){ mm='0'+mm;} 
	var today = dd+'/'+mm+'/'+yyyy;
	console.log("Date ",today);
	
	var id = { '_id': ObjectID(req.params.userId)};
	var newvalues = { $set: {firstname:req.body.firstname,lastname:req.body.lastname,email:req.body.email,
		phone:req.body.phone,updatedDate:today } };
	
	Users.updateOne(id, newvalues, function(err) { 
		if(err) res.send({'validation': 'Something missing... or not doing in proper way', 'status': 'false'});
		else res.send({'validation': 'Successfully updated..', 'status': 'true'});
	});
 });

app.post("/user/register",function(req,res){
	console.log(req.body);
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	if(dd<10){ dd='0'+dd;} 
	if(mm<10){ mm='0'+mm;} 
	var today = dd+'/'+mm+'/'+yyyy;

	mc.connect("mongodb://127.0.0.1:27017",function(err,conn){
		var dbc=conn.db('userDetails');
		dbc.collection('User').find().count()
		.then(function(numItems) {
		console.log("count :",numItems);
		var myobj={'id':numItems+1,'firstname':req.body.fnm,'lastname':req.body.lnm,'email':req.body.email,
				'phone':req.body.phno,'password':req.body.cpass,'createdDate':today,'updatedDate':'',
				'status':'active'};
		console.log("myobj :",myobj);
		dbc.collection("User").insertOne(myobj, function(err, response) {
			if(err) throw err;
			if(response){
				console.log("record inserted");
				dbc.collection("userDetails").find({'id':numItems+1}).toArray(function(err,data){
				   if (err) throw err;
				   console.log("result :",data);
				   res.send({'status':'success','data':data});
				});
			}});
			
		});
	});//mongo

});
app.listen(4001,function(){
    console.log("Server is running on 4001");
});