'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    //_id: ObjectId,
    username: {type: String, required: [true, "Debes ingresar un nombre de usuario."]},
    password: {type: String, required: [true, "Debes ingresar una clave."]},
    date: { type: Date, default: Date.now },
    notesText: [{type: Schema.Types.ObjectId, ref: 'SimpleNotes'}],
    taskList: [{type: Schema.Types.ObjectId, ref: 'TaskList'}]
});

// Simple notes
var SimpleNotes = new Schema({
    id: Number,
    title: String,
    descripcion: String
});

// Task list
var TaskList = new Schema({
    id: Number,
    title: String,
    tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}]
});

var Task = new Schema({
    id: Number,
    name: String,
});

module.exports = mongoose.model('User', User);