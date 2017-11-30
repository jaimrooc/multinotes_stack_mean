'use strict';

module.exports = function(app) {
	var userController = require('../controllers/userController');
	
	app.route('/user')
		.get(userController.listAllValuesOfEachUser)
		.post(userController.createUser);

	app.route('/user/authentication')
		.post(userController.authenticateUser);
};

/*
'use strict';

module.exports = function(app) {
	var bookController = require('../controllers/booksController');

	// book Routes
	app.route('/books')
		.get(bookController.list_all_books)
		.post(bookController.create_a_book)
		.delete(bookController.masive_delete);

	app.route('/books/:bookId')
		.get(bookController.read_a_book)
		.put(bookController.update_a_book)
		.delete(bookController.delete_a_book);
};
*/