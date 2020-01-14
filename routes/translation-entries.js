const express = require('express');

const router = express.Router();

const Entry = require('../models/entrySchema.js')

//routes
router.get('/',async (req, res) => {
    try{
        const entries = await Entry.find();
        res.json(posts);
    }catch(err){
        res.json({message:'err'});
    }

});
//create
router.post('/',async (req, res) => {
    const entry = new Entry({
        title: req.body.title,
        binaryCode: req.body.binaryCode,
        nucleotideSequence: req.body.nucleotideSequence

    });
    try{
    const savedEntry = await entry.save();
    res.json(savedEntry);
    }catch(err){
        res.json({message: 'err'});
    }
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
