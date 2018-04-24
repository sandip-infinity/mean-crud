var User = require("../models/userSchema").User;
var express = require('express');
var router = express.Router();
var func = require("../controllers/controller");
var fs = require("fs")
var multer = require('multer');
var upload = multer({ dest: '/home/infinity/mean-crud/src/assets/images/' });

//LogIn
router.post("/login", func.login);

//load all data 
router.get('/user/get/:pageIndex/:pageSize/:sortActive/:sortDirection'
	, func.getAllUsers);

//find user By specific Id
router.get('/user/getById/:userId', func.getUserById);

//add user
router.post('/user/add', func.saveUser);

//delete user
router.delete('/user/delete/:userId', func.deleteUser);

//update user
router.put('/user/update/:userId', func.updateUser);

//password update
app.put('/user/setNewPass/:newPass', func.setNewPass);

//filter
router.get('/user/search/:pageIndex/:pageSize/:filterValue', func.searchUser);




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

module.exports = router;
