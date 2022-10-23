const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const path = require('path');

var app = module.exports = express();

// register JSON parser middleware
app.use(bodyParser.json());

app.set('view engine','ejs'); 
app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'html');

const server = http.createServer(app);

const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);

app.get('/', function(req, res){
    res.render('index')
});

app.get("/about", function (req, res) {
    res.render('about', {
        title: "About",
        header: "About"
    });
});

server.listen(3000, function(){
    console.log("Server is listening on port: 3000");
});
