const Book = require("../../models/book")

const getAll = async (req, res) => {
	const {_id: owner} = req.user
	const { limit = 10, page = 1 } = req.query;
	const skip = (page - 1) * limit
	const books = await Book.find({owner}, "-updatedAt", {skip, limit}).populate("owner", "name email");
	res.json(books);
}

module.exports = getAll;
