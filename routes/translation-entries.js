const express = require('express');

const router = express.Router();

//routes
router.get('/',(req, res) => {
    res.send('test');

});
router.get('/oneEntry',(req, res) => {
    res.send('test');

});

module.exports = router;
