const express = require('express');

const router = express.Router();

const Entry = require('../models/entrySchema.js')

//routes
router.get('/', (req, res) => {
    Entry.find()
    .then(entries => {
        res.render("index", {entries: entries});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error occured while getting Entries from database."
        });
    });

});
router.get('/entries/newEntry', (req, res) => {
    res.render("newEntry");

});
//create
router.post('/entries', (req, res) => {

    //add an Entry
    if(!req.body.binaryCode) {
        return res.status(400).send({
            message: "entry can't be empty"
        });
    }

    //add a task
    const entry = new Entry({
        title: req.body.title || "Untitled task",
        binaryCode: req.body.binaryCode,
        nucleotideSequence: req.body.nucleotideSequence

    });

    // store task in the database
    entry.save()
    .then(data => {
        res.redirect("/");
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error occured while storing the task."
        });
    });

});
//one entry
router.get('/:entryId', async (req, res) => {
    try{
        const entry =  await Entry.findById(req.params.entryId);
        res.json(entry);
    }catch(err){
        res.json({message: 'err'});
    }

});

//delete
router.delete('/:entryId', async (req, res) => {
    try{
        const removedEntry = Entry.remove({_id : req.params.entryId});
        res.json(removedEntry);
    }catch(err){
        res.json({message: 'err'});
    }

});

//updateTitle

router.patch('/:entryId', async (req, res) =>{
    try{
        const updatedEntry = Entry.updateOne({_id: req.params.entryId}, {$set: {title:req.body.title}});
    }catch(err){
        res.json({message: err});
    }

});

module.exports = router;
