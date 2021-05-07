const express = require("express");
const Statement = require("../models/statement");
const router = express.Router();

// Gets the list of statements.
router.get("/getStatements",(req,res)=>{
  Statement.find({}, function (err, statements) {
    res.send(statements);
 });
})

// Get the statement by the id.
router.get("/getStatementById/:statementId",(req,res)=>{
  Statement.findById(req.params.statementId,(req,statement)=>{
    res.send(statement);
  })
});

// Adds the statement.
router.post("/addStatement",(req,res)=>{ 
  var statement = new Statement();
  statement._id = req.body._id;
  statement.statementDesc = req.body.statementDesc;
  statement.save().then((result)=>{
    res.send("StatementId:" + statement.statementId + "Statement description:" + statement.statementDesc);
  })
  .catch(error=>{
    res.send("Failed to add statement" + error);
  });
})

// Deletes the statement.
router.delete("/deleteStatement/:statementId",(req,res)=>{
 Statement.findByIdAndDelete(req.params.statementId,(err, statement)=>{
   if(err)
    res.send(err);
   else
    res.send("User deleted" + statement);
 })
});

module.exports = router;
