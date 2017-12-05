'use strict';

let mongoose = require('mongoose');
let SimpleNotes = mongoose.model('SimpleNotes');
let jwt = require('jsonwebtoken');
let config = require('../../config');

// ------------------------------ Lists
exports.listAllSimpleNotes = function (req, res) {
  SimpleNotes.find({}, function (err, doc) {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).json(doc);
  });
};

// ------------------------------ Create
exports.createSimpleNotes = function (req, res) {
  let simpleNotes = new SimpleNotes(req.body);
  simpleNotes.save(function (err, doc) {
    if (err) {
      res.status(400).send(err);
    }
    res.status(201).json(doc);
  });
};

// ------------------------------ Delete
exports.deleteSimpleNotes = function (req, res) {
  SimpleNotes.remove({
    _id: req.params.noteId
  }, function (err, note) {
    if (err) {
      res.status(400).send(err);
      console.log(err);
    }
    res.status(201).json({ message: 'Tarea exitosamente eliminada.' });
  });
};

exports.simpleNote = function (req, res) {
  SimpleNotes.findById(req.params.noteId, function (err, book) {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).json(book);
  });
};

// ------------------------------ Update
exports.simpleNoteUpdate = function (req, res) {
  SimpleNotes.findOneAndUpdate({ _id: req.params.noteId }, req.body, { new: true }, function (err, book) {
    if (err) {
      res.status(400).send(err);
    }
    res.status(201).json(book);
  });
};
