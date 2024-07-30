let express = require('express');
let app = express();
// Must have this to read .env file
require('dotenv').config()

console.log("Hello World");

// Simple middlware fxn that logs the method path for every request
// Must run at top of file so that it runs on all routes
app.use(function(req, res, next){
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
})

// First step
/*app.get('/', function(req, res){
    res.send('Hello Express')
})*/

// Display specific file with path to that file
app.get('/', function(req, res){
    res.sendFile(__dirname + "/views/index.html")
})

// Uses middleware fxn (express.static) to serve the contents in the public folder to the app
app.use('/public', express.static(__dirname + '/public') )

// Build a simple REST API endpoint
app.get('/json', function(req, res){
    if(process.env.MESSAGE_STYLE == "uppercase"){
        res.json({"message": "HELLO JSON"});
    } else {
        res.json({"message": "Hello json"});
    }
})

// Use a middleware fxn to chain commands
// First, the middleware gets the time and sets it to req.time
// Then the server responds with a JSON object
app.get("/now", (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.json({"time": req.time});
});



































 module.exports = app;
