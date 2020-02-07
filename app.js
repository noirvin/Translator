const express = require('express');

const app = express();

const mongoose = require('mongoose');

require('dotenv/config');

const entryRoute = require('./routes/translation-entries.js');

const bodyParser = require('body-parser');

const fileUpload = require('express-fileupload');

var morgan = require('morgan')


//middlewares
morgan("combined")



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());


app.set('view engine', 'ejs');
app.use(express.static("static"));
mongoose.set('useFindAndModify', false);


//Enable CORS for all HTTP methods
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });





 //routes

app.use('/', entryRoute);

//DBConnection
mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    () => console.log('connected to DB')
);


// server listener

app.listen(process.env.PORT || 5000);
