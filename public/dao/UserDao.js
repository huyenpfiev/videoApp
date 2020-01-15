var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var uuidv4 = require("uuid/v4");
var dbURI = 'mongodb://localhost/MyPlayUserDB';
mongoose.set('useFindAndModify', false);

mongoose.connect(dbURI, { useNewUrlParser: true }, function (err) {
  if (err) {
    throw err;
  } else {
    console.log('Mongoose connected to : ' + dbURI); 
  }
});

var userSchema = new mongoose.Schema({
  _id: String,
  userfirstname: String,
  userlastname: String,
  email: String,
  password: String,
  role: String
});
var playlistSchema=new mongoose.Schema({
    _id:String,
    name:String,
    userEmail:String
});
var UserModel = mongoose.model('user', userSchema);
var PlaylistModel=mongoose.model('playlist',playlistSchema);

function setPassword(data) {
    var generator = crypto.createHash('sha1');
    generator.update(data);
    return generator.digest('hex');
}
module.exports = {
    getUser: function (user, cb) {
        UserModel.find({
            $or: [
                { userfirstname: user.userfirstname },
                { userlastname: user.userlastname },
                { email: user.email }
            ]
        }, function (err, user) {
            if (err) {
                throw err;
            }
            else{
              cb(user);
            }
        });
    },
    register: function (user, cb) {
        var newUser = new UserModel({
            _id: uuidv4(),
            userfirstname: user.userfirstname,
            userlastname: user.userlastname,
            email: user.email,
            password: setPassword(user.password),
            role: "user"
        });
  
        newUser.save(function (err) {
            if (err) {
                throw err;
            }
  
            cb();
        });
    },
    login: function (user, cb) {

        UserModel.findOne({ email: user.email, password: setPassword(user.password) },
        function (err, userObj) {

                if (err) {
                    throw err;
                }
                if (userObj) {
                    userObj.save();
                }
  
                cb(userObj);
        });
    },
    getUserSet: function (cb) {
        UserModel.find({}, function (err, users) {
            if (err) {
                throw err;
            }
            else{
                cb(users);
            }
        });
    },
    updateUser: function (user, cb) {
        UserModel.findOneAndUpdate({_id: user._id}, {$set:{role:user.role}}, {new: true}, (err, usr) => {
            if (err) {
                console.log("Something wrong when updating user!");
            }else{
                cb();
            }
        });

    },
    getPlaylistName:function(name,userEmail,cb){
        PlaylistModel.findOne({name:name,userEmail},function(err,obj){
            if(err)
                throw err;
            else
                cb(obj);
        });
    },
    createPlaylist:function(name,userEmail,cb){
        var newPlaylist=new PlaylistModel({
            _id: uuidv4(),
            name:name,
            userEmail:userEmail
        })
        newPlaylist.save(function (err) {
            if (err) {
                throw err;
            }
        cb();
        });

    },
    getPlaylistSet:function(userEmail,cb){
        PlaylistModel.find({userEmail:userEmail},function(err,list){
            if(err)
                throw err;
            else{
                cb(list);
            }
        })
    },
    deletePlaylist:function(name,userEmail,cb){
        PlaylistModel.deleteOne({name:name,userEmail:userEmail},function(err){
            if(err)
                throw err;
            cb()
        })
    }
  }