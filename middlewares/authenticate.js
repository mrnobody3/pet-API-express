const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers");
const { User } = require("../models/auth")

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
	try {
		const { authorization } = req.headers;
		const [ bearer, token ] = authorization.split(" ");
		if (bearer !== "Bearer") {
			next(HttpError(401))
		}
		const { id } = jwt.verify(token, SECRET_KEY);
		const user = await User.findById(id);
		
		if (!user) {
			next(HttpError(401, "User not found"))
		}
		if (!user.token) {
			next(HttpError(401))
		}
		req.user = user;
		next()
	} catch (e) {
		next(HttpError(401))
	}
}

module.exports = authenticate;
