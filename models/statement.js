const mongoose = require("mongoose");
const { Schema } = mongoose;

const statementSchema = new Schema({
    _id:{
        type:String
    },
    statementDesc:{
        type:String
    }
})

const Statement = mongoose.model("Statement",statementSchema);

module.exports = Statement;