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
    console.log(req.body)
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
router.get('/entry/:entryId', (req, res) => {
    Entry.findById(req.params.entryId)
    .then(entry => {
        if(!entry) {
            return res.status(404).send({
                message: "entr not found id: " + req.params.entryId
            });
        }
        // res.send(task);
        res.render('show_entry', {entry: entry})
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "entry not found id: " + req.params.entryId
            });
        }
        return res.status(500).send({
            message: "error retrieving note with id " + req.params.taskId
        });
    });

});

//delete
router.post('/entries/delete/:entryId', (req, res) => {
    Entry.findByIdAndRemove(req.params.entryId)
   .then(entry => {
       if(!entry) {
           return res.status(404).send({
               message: "entry not found id: " + req.params.entryId
           });
       }
       res.redirect('/');
   }).catch(err => {
       if(err.kind === 'ObjectId' || err.name === 'NotFound') {
           return res.status(404).send({
               message: "entry not found id:  " + req.params.entryId
           });
       }
       return res.status(500).send({
           message: "can't delete entry id:  " + req.params.entryId
       });
   });

});

router.get('/entry/:entryId/edit', (req, res) => {
    Entry.findById(req.params.entryId)
    .then(entry => {
        if(!entry) {
            return res.status(404).send({
                message: "entry not found id: " + req.params.entryId
            });
        }
        // res.send(task);
        res.render('editEntry', { entry: entry})
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "entry not found id: " + req.params.entryId
            });
        }
        return res.status(500).send({
            message: "error retrieving note with id " + req.params.editId
        });
    });
});

//updateTitle

router.post('/entries/update/:entryId', (req, res) =>{
    if(!req.body.binaryCode) {
        return res.status(400).send({
            message: "entry can't be empty"
        });
    }

    // Find note and update it with the request body
    Entry.findByIdAndUpdate(req.params.entryId, {
        title: req.body.title || "Untitled Entry",
        binaryCode: req.body.binaryCode,
        nucleotideSequence: req.body.nucleotideSequence
    }, {new: true})
    .then(entry => {
        if(!entry) {
            return res.status(404).send({
                message: "entry not found id: " + req.params.entryId
            });
        }
        res.redirect('/entry/' + req.params.entryId);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "entry not found id: " + req.params.entryId
            });
        }
        return res.status(500).send({
            message: "error while saving changes " + req.params.entryId
        });
    });
});

module.exports = router;
