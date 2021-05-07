const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    _id:{
        type:String
    },
    name:{
        type:String
    },
    dob:{
        type:String
    },
    image:{
        type:String
    }
})

const User = mongoose.model("User",userSchema);

module.exports = User;