const express = require("express");
const router = express.Router();
const AWS = require("aws-sdk");
const multer = require('multer')
const multerS3 = require('multer-s3');
const User = require("../models/User");

// Aws configuration.
const awsAccessKeyId = "AKIA3OPWG4G2TPTXTF4B";
const awsSecretKey = "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";
const bucketName = "nodejsfilestorage";
const s3 = new AWS.S3({
  accessKeyId: awsAccessKeyId,
  secretAccessKey: awsSecretKey
});

// Multer s3 configuration.
var uploadToS3 = multer({
    storage: multerS3({
      s3: s3,
      bucket: bucketName,
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, file.originalname)
      }
    })
})  

// Gets the list of users.
router.get("/getUsers",(req,res)=>
{
  User.find({},(err,users)=>{
    res.send(users);
  })
  // User.find({},(err,users)=>
  // {
  //   users.forEach(user => 
  //   {
  //     //construct getParams object
  //     var getParams = 
  //     {
  //       Bucket: bucketName,
  //       Key: user.image
  //     }
  //     s3.getObject(getParams, function (err, data) 
  //     {
  //       if (err) 
  //       {
  //         console.log(err);
  //       } 
  //       else 
  //       {
  //         user.image = data.Body.toString('base64');
  //         res.send(users);
  //       }
  //     })    
  //   });
  // })
})

// Adds the user.
router.post("/addUser",uploadToS3.single('image'),(req,res)=>{
  var user = new User({
    _id:req.body._id,
    name:req.body.name,
    dob:req.body.dob,
    image:req.file.originalname
  });
  user.save().then((result)=>{
    res.send("UserId:" + user._id + "User name:" + user.name);
  })
  .catch(error=>{
    res.send("Failed to add user" + error);
  });
})

// Gets the user by id.
router.get("/getUserById/:userId",(req,res)=>{
  User.findById(req.params.userId,(err,user)=>{
    if(err)
      res.send("Failed to get user by id");
    else
    {
      //construct getParams object
      var getParams = 
      {
        Bucket: bucketName,
        Key: user.image
      }
      s3.getObject(getParams, function (err, data) 
      {
        if (err) 
        {
          console.log(err);
        } 
        else 
        {
          user.image = data.Body.toString('base64');
          res.send(user);
        }
      })    
    }
  });
});

// Delete the user by id.
router.delete("/deleteUserById/:userId",(req,res)=>
{
  User.findByIdAndDelete(req.params.userId,(err,user)=>
  {
    if(err)
     res.send("Failed to delete the user");
    else
    {
      //construct getParams object
      var getParams = 
      {
        Bucket: bucketName,
        Key: user.image
      }
      s3.deleteObject(getParams, function (err, data) 
      {
        if (err)
        {
          console.log(err);
        } 
        else 
        {
        user.image = data.Body.toString('base64');
        }
      });  
      res.send(user);
    }
  });
});

module.exports = router;