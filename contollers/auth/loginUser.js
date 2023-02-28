const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/auth");
const { HttpError } = require("../../helpers");

const { SECRET_KEY } = process.env;

const loginUser = async (req, res) => {
	const { password, email } = req.body;
	let user = await User.findOne({ email });
	if (!user) {
		throw HttpError(401, "Email or password invalid");
	}
	
	const passwordCompare = await bcrypt.compare(password, user.password);
	
	if (!passwordCompare) {
		throw HttpError(401, "Email or password invalid");
	}
	
	const payload = {
		id: user._id
	}
	const accessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h"});
	await User.findByIdAndUpdate(user._id, { accessToken });
	user = await User.findById(user._id, {
		accessToken,
		email: 1,
		phone: 1,
		_id: 1,
		name: 1,
		avatarUrl: 1
	});
	
	res.json({
		user,
	});
}

module.exports = loginUser;