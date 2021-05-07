const mongoose = require("mongoose");
const {Schema} = mongoose;

const friendsSchema = new Schema({
    following:String,
    follower:String
});

const Friends = mongoose.model("Friends", friendsSchema);

module.exports = Friends;