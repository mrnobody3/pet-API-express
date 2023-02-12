const {Schema, model} = require("mongoose");

const bookSchema = new Schema({
	title: {
		type: String,
		require: [true, "Title is require"]
	},
	author: {
		type: String,
		require: [true, "Author is require"]
	}
});

const Book = model("book", bookSchema);

module.exports = Book;