const express = require('express');

const app = express();

const mongoose = require('mongoose');

require('dotenv/config');

const entryRoute = require('./routes/translation-entries.js');


//routes
app.get('/',(req, res) => {
    res.send('test');

});

// server listener

app.listen(3000);

//middlewares


app.use('/translation-entries', entryRoute);

//DBConnection
mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    () => console.log('connected to DB')
);
