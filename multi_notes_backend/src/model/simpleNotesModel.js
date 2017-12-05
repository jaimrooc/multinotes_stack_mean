'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Simple notes
var SimpleNotes = new Schema({
    title: String,
    descripcion: String
});

module.exports = mongoose.model('SimpleNotes', SimpleNotes);