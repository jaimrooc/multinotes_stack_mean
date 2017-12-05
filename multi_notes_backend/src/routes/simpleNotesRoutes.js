'use strict';

module.exports = function(app) {
	var simpleNotesController = require('../controllers/simpleNotesController');
		
	app.route('/simpleNotes')
		.get(simpleNotesController.listAllSimpleNotes)
		.post(simpleNotesController.createSimpleNotes);
		
	app.route('/simpleNotes/:noteId')
		.delete(simpleNotesController.deleteSimpleNotes)
		.get(simpleNotesController.simpleNote)
		.put(simpleNotesController.simpleNoteUpdate);
};