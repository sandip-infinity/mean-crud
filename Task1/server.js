var express=require('express');
var cors = require('cors')
var mc = require("mongodb").MongoClient;
var ObjectID = require('mongodb').ObjectID;
var fs = require("fs")
var multer  = require('multer');
var upload = multer({ dest: '.upload/' });
app=express();
app.use(cors());
var result1=[];
var bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/Src'))

app.get('/',function(req,res){
	res.sendFile(__dirname+'/index.html');
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

app.post("/user/login",function(req,res){
    console.log(req.body);
  	mc.connect("mongodb://127.0.0.1:27017",function(err,conn){
	var dbc=conn.db('userDetails');
        var result = dbc.collection("User").find({phone:req.body.phno ,password:req.body.pass});
        result.toArray(function(err,data){
		 if (err) throw err;
		console.log(data);
		res.send({'status':'success','data':data});
	});
    });
});

app.get('/user/get',function(req,res){
	//console.log("PageIndex :",req.params.pageIndex,"PageSize :",req.params.pagesize);
	mc.connect("mongodb://127.0.0.1:27017",function(err,conn){
    	//console.log("mongodb connection established");
	var dbc=conn.db('userDetails');
	

		var result = dbc.collection("User").find();
		result.toArray(function(err,data){
		 if (err) throw err;
		console.log(data);
		res.send(data);
		});
	
	});
});
//add
app.post('/user/add',function(req,res){
	console.log("save data",req.body[0].firstname);
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	if(dd<10){ dd='0'+dd;} 
	if(mm<10){ mm='0'+mm;} 
	var today = dd+'/'+mm+'/'+yyyy;
	console.log("Date ",today);
	mc.connect("mongodb://127.0.0.1:27017",function(err,conn){
		var dbc=conn.db('userDetails');
		dbc.collection('User').find().count()
		.then(function(numItems) {
		console.log("count :",numItems);
		var myobj={'id':numItems+1,'firstname':req.body[0].firstname,'lastname':req.body[0].lastname,'email':req.body[0].email,
				'phone':req.body[0].phone,'password':req.body[0].password,'createdDate':today,'updatedDate':today,
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

//delete
 app.delete('/user/delete/:userId', function(req, res){
    console.log("delete data",req.params.userId);
    mc.connect("mongodb://127.0.0.1:27017",function(err,conn){
	var dbc=conn.db('userDetails');//ObjectID(req.params.userId)
	dbc.collection("User").remove({'_id':ObjectID(req.params.userId)}, function(err, response) {
	    if (err) throw err;
	    if(response){
		console.log("1 document deleted");
		res.send({'status':'deleted'});
	     }
	});
    });

 });

//update
app.put('/user/update/:userId', function(req, res){
    console.log("update data: ObjectID :",req.params.userId," New Data :",req.body);
	var id = { '_id': ObjectID(req.params.userId)};
	var newvalues = { $set: {firstname:req.body.firstname,lastname:req.body.lastname,email:req.body.email,phone:req.body.phone } };
	mc.connect("mongodb://127.0.0.1:27017",function(err,conn){
	var dbc=conn.db('userDetails');
	  dbc.collection("User").updateOne(id, newvalues, function(err, response) {
	    if (err) throw err;
	    if(response){
		console.log("1 document updated");
		res.send({'status':'success'});
	    }
	  });
     });
 });

app.listen(4001);
