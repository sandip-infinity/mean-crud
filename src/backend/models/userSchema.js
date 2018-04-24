var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

var User = mongoose.model('usersData', userSchema, 'User');

module.exports = {
  User : User
}
