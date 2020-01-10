const mongoose = require('mongoose');

const entrySchema = mongoose.Schema({
    title: String,
    binaryCode: String,
    nucleotideSequence: String,

});

module.exports = mongoose.model('Entry', entrySchema);
