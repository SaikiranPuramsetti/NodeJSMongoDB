const express = require("express");
const Post = require("../models/Post");
const User = require("../models/User");
const Statement = require("../models/statement");
const router = express.Router();

// Gets the posts.
router.get("/getposts",(req,res)=>{
    Post.find({},(err,posts)=>{
      res.send(posts);
    })
})
  
// Get the post by id.
router.get("/getpostbyid/:postid",(req,res)=>{
    Post.findById(req.params.postid,(err,post)=>{
      if(err)
       res.send(err);
      else
       res.send(post);
    })
})
  
// Adds the post with the specified object.
router.post("/addpost",(req,res)=>{
    var post = new Post({
      statement:req.body.statement,
      user:req.body.user,
      affirmation:req.body.affirmation,
    });
    if(Statement.findById({_id:post.statement._id}) != null && User.findById({_id:post.user._id}) != null)
    {
      Post.find({'statement._id':post.statement._id},{'user._id':post.user._id},function (err, results) 
      {
        var count = results.length;
        if(err)
        {
          res.send("Failed to find the post");
        }
        else
        {        
          if(count <= 0)
          {
            post.save().then((result)=>{
              res.send("PostId:" + post + "affirmation:" + post.affirmation);
            })
            .catch(error=>{
              res.send("Failed to add post" + error);
            });
          }
          else
          {
            console.log("Affirmation:" + post.affirmation);
            Post.updateOne({_id:results[0]._id},{affirmation: post.affirmation }, function(err,posts){
              if(err)
               res.send("Failed to update the post");
              else
               res.send("Post updated:" + posts);
            })
          }
        }
    });
  }
})
  
// Delete the post by id.
router.delete("/deletePostById/:postId",(req,res)=>{
    Post.findByIdAndDelete(req.params.postId,(err,post)=>{
      if(err)
       res.send("Failed to delete post by id");
      else
       res.send(post);
    })
})

module.exports = router;