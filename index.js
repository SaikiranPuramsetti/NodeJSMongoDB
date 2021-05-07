const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const statementRoutes = require("./Routes/statement");
const userRoutes =  require("./Routes/User");
const postRoutes = require("./Routes/Post");
const reactionRoutes = require("./Routes/Reaction");
const friendsRoutes = require("./Routes/friends");

// Constants for mongo db and aws.
var mongoURL = "mongodb+srv://stevejobs:stevejobs@cluster0.i79e2.mongodb.net/Statement?retryWrites=true&w=majority";

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time');
  res.setHeader('Access-Control-Max-Age', '1000'); 
  next();
});

// use port 3000 unless there exists a preconfigured port
var port = process.env.PORT || 3000;


// Connects to the mongo database.
mongoose.connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true},(err)=>{
  if(err)
    console.log("Error while connecting to mongo db");
  else
    app.listen(port);
    console.log("Connected to mongo database and listening at 3000");
});

// Middleware to add the user data to the request object.
app.use(express.json());


app.get('/', function (req, res) {
  res.send('Hello World!');
}); 

// Statement routes.
app.use(statementRoutes);

// User routes.
app.use(userRoutes);

// Post routes.
app.use(postRoutes);

// Reaction routes.
app.use(reactionRoutes);

// Friends routes.
app.use(friendsRoutes);

