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



// server listener

app.listen(3000);



//DBConnection
mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    () => console.log('connected to DB')
);
