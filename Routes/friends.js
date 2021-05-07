const { Firehose } = require("aws-sdk");
const express = require("express");
const router = express.Router();
const Friends = require("../models/friends");

// Gets the followers and following people
router.get("/getfriends",(req,res)=>{
    Friends.find({},(err,friends)=>{
        res.send(friends);
    })
})

// Adds the followers and following people.
router.post("/addfriends",(req, res)=>{
    var friend = new Friends({
        follower:req.body.follower,
        following:req.body.following
    });
    if(friend.follower !== friend.following)
    {
        Friends.find({$and:[{'follower':friend.follower},{'following':friend.following}]},(err,results)=>{
            var count = results.length;
            if(count > 0){
                res.send("This Records exists in database" + "Value of count is:" + count + "follower" + friend.follower + "Following" + friend.following);
            }
            else
            {
                friend.save().then((friend)=>{
                    res.send("Friends has been added" + friend);
                });
            }
        });
    }
    else{
        res.send("Can't enter duplicate data");
    }
});

// Gets the list of followers by id.
router.get("/getfollowers/:id",(req,res)=>{
    Friends.find({'following':req.params.id},(err,followers)=>{
        if(followers.length <= 0){
            res.send("Sorry none of people following you.")
        }
        else{
        res.send(followers);
        }
    });
});

// Gets the list of followers by id.
router.get("/getfollowing/:id",(req,res)=>{
    Friends.find({'follower':req.params.id},(err,following)=>{
        if(following.length <= 0){
            res.send("Sorry none of people you are following you.")
        }
        else{
        res.send(following);
        }
    });
});

// Gets the list of followers by id.
router.delete("/deletefriend/:id",(req,res)=>{
    Friends.findByIdAndDelete({_id:req.params.id},(err,following)=>{
        if(following.length <= 0){
            res.send("Sorry, failed to unfollow or block the person.")
        }
        else{
         res.send(following);
        }
    });
});


module.exports = router;