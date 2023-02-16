const Book = require("../../models/book")

// WithOut Control Wrapper
const add = async (req, res, next) => {
	try {
		const {_id: owner} = req.user;
		const result = Book.create({...req.body, owner})
		res.status(201).json(result)
	} catch (error) {
		next(error);
	}
}

module.exports = add;