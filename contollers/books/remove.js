const Book = require("../../models/book");

const remove = async (req, res) => {
	const { id } = req.params;
	const result = await Book.findByIdAndRemove(id)
	if (!result) {
		res.status(404).json({ message: "Not found" });
	}
	
	res.status(200).json({ message: "User pet deleted" });
}

module.exports = remove;