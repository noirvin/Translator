const express = require('express');

const router = express.Router();

const Entry = require('../models/entrySchema.js')

//routes
router.get('/',async (req, res) => {
    Entry.find()
    .then(entries => {
        res.render("index", {entries: entries});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error occured while getting tasks from database."
        });
    });

});
//create
router.post('/',async (req, res) => {
    if(!req.body.content) {
        return res.status(400).send({
            message: "Entry can't be empty"
        });
    }

    //add an Entry
    const entry = new Entry({
        title: req.body.title || "Untitled Entry",
        binaryCode: req.binaryCode,
        nucleotideSequence: req.body.nucleotideSequence
    });

    // store task in the database
    entry.save()
    .then(data => {
        res.redirect("/");
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error occured while storing the entry."
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
