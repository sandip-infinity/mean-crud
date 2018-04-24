var mongoose = require('mongoose');
var express = require('express');
var cors = require('cors')

var url = 'mongodb://127.0.0.1:27017/userDetails';

app = express();
app.use(cors());
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var routes = require('./routes/userRoutes');
var product=require('./routes/productRoutes');

app.use(routes);
app.use('/product',product);

mongoose.connect(url, function (err, res) {
	if (err) throw err;
	if (res) { console.log("connected successfully"); } else { console.log("connection failed"); }
});

app.listen(4001, function () {
	console.log("Server is running on 4001");
});
