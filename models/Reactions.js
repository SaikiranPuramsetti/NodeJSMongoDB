const mongoose = require("mongoose");
const User = require("../models/User");
const { Schema } = mongoose;

const reactionSchema = new Schema({
    postid:{
        type:String
    },
    user:User.schema,
    comment:{
        type:String
    },
    like:{
        type:Boolean
    },
    shares:{
        type:Boolean
    },
    saved:{
        type:Boolean
    }
})

const Reaction = mongoose.model("Reaction", reactionSchema);

module.exports = Reaction;