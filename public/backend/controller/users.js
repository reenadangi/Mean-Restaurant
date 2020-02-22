const mongoose = require('mongoose');
const Users = mongoose.model('Users');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// for file storage
module.exports = {

  login: function (req, res) {
    let fetchedUser;
    Users.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        fetchedUser = user;
        console.log(fetchedUser)
        console.log(req.body.password)
        console.log(fetchedUser.password)
        return bcrypt.compare(req.body.password, fetchedUser.password)
      })
      .then(result => {
        console.log(result)
        if (!result) {
           
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        const token = jwt.sign(
          { email: fetchedUser.email, userId: fetchedUser._id },
          "secret_this_should_be_longer",
          { expiresIn: "1h" }
        );
        console.log(token)
        res.status(200).json({
          token: token,
          userId:fetchedUser._id
        });
      })
      .catch(err => {
        return res.status(401).json({
          message: "Auth failed in catch"
        });
      });

  },

  create: function (req, res) {
    // code...
    console.log("in controller adding user");
    console.log(req.body);
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new Users();
        user.fname = req.body.fname;
        user.lname = req.body.lname;
        user.email = req.body.email;
        // Store hash in your password DB.
        user.password = hash;
        console.log(`hash value ${hash}`)
        user.save().then(newUserData => {
            console.log(`user added successfully${newUserData}`)
            res.status(201).json({
              message: "user added successfully",
              _id: newUserData._id,
            })
      
          }).catch(err => {
            console.log(err)
            res.status(500).json({
              
              error: err
            });
      });
    
    });

  },

};
