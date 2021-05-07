const express = require("express");
const Reaction = require("../models/Reactions");
const router = express.Router();

// Gets the reactions.
router.get("/getreactions",(req,res)=>{
    Reaction.find({},(err,reactions)=>{
      if(err)
        res.send("Failed to get the reaction");
      else
        res.send(reactions);
    })
})
  
// Gets the reaction by id.
router.get("/getreactionbyid/:reactionId",(req,res)=>{
    Reaction.findById(req.params.reactionId,(err,reaction)=>{
      if(err)
       res.send("Failed to fetch reaction by identifier");
      else
       res.send(reaction);
    })
})
  
// Adds the reaction.
router.post("/addreaction",(req,res)=>{
    var reaction = new Reaction({
      postid:req.body.postid,
      user:req.body.user,
      comment:req.body.comment,
      like:req.body.like,
      shares:req.body.shares,
      saved:req.body.saved
    });
    Reaction.find({$and:[{'postid':reaction.postid},{'user._id':reaction.user._id}]},function (err, results) 
    {
      var count = results.length;
      if(err)
      {
        res.send("Failed to find the reaction");
      }
      else
      {
        if(count <= 0)
        {
          reaction.save().then((result)=>{
            res.send("Reaction has been added");
          })
          .catch(error=>{
            res.send("Failed to added the reaction" + error);
          });
        }
        else
        {
          Reaction.updateOne({_id:results[0]._id},{$set:{'comment':reaction.comment, 'like':reaction.like, 'shares':reaction.shares, 'saved':reaction.saved}}, function(err,reactions){
          if(err)
            res.send("Failed to update the reaction" + err);
          else
            res.send("Reaction has been updated");
          });
        }
      }
    });
})
  
// Deletes the reaction by id.
router.delete("/deleteReactionById/:reactionId",(req,res)=>{
    Reaction.findByIdAndDelete(req.params.reactionId,(err,reaction)=>{
      if(err)
       res.send("Failed to delete reaction by id");
      else
       res.send(reaction);
    })
})

module.exports = router;