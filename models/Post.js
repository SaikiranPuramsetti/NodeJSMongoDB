const mongoose = require("mongoose");
const statement = require("../models/statement");
const user = require("../models/User");
const { Schema } = mongoose;

const postSchema = new Schema({
    statement: statement.schema,
    user:user.schema,
    affirmation:{
        type:String
    }
})

const Post = mongoose.model("Post", postSchema);

module.exports = Post;