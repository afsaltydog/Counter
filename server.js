var express = require("express");
var session = require('express-session');
var app = express();

app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))

app.use(express.static(__dirname + "/static"));

app.get('/', function(request, response) {

   if ("count" in request.session == false) {
    request.session.count = 0
   } else {
    request.session.count++;
   }
   

        response.render('index', {count:request.session.count});

})

app.get('/plustwo', function(request, response) {
    console.log("/2 route!");

    if ("count" in request.session == false) {
        request.session.count = 0
    } 
    else {
        request.session.count+=2;
    }
   
    response.render('index', {count:request.session.count});
})

app.get('/clear', function(request, response) {
    console.log("/clear route!");

    request.session.count = 0
    
    response.render('index', {count:request.session.count});

})

app.listen(8000, function() {
    console.log("listening on port 8000");
})