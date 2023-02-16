const {Schema, model} = require("mongoose");

const bookSchema = new Schema({
	title: {
		type: String,
		require: [true, "Title is require"]
	},
	author: {
		type: String,
		require: [true, "Author is require"]
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: "user",
		require: true
	}
}, {versionKey: false, timestamps: true});

const Book = model("book", bookSchema);

module.exports = Book;