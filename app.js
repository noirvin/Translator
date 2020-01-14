const express = require('express');

const app = express();

const mongoose = require('mongoose');

require('dotenv/config');

const entryRoute = require('./routes/translation-entries.js');

const bodyParser = require('body-parser');

//middlewares


app.use('/', entryRoute);
app.use(bodyParser.urlencoded({ useUnifiedTopology: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

//Enable CORS for all HTTP methods
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });




// server listener

app.listen(3000);



//DBConnection
mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    () => console.log('connected to DB')
);
