const {Schema, model} = require("mongoose");
const emailRegexp = /^[a-zA-Z0-9]+[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9]+$/;

const userSchema = new Schema({
	password: {
		type: String,
		required: [true, "Password is required"],
		minlength: 7,
	},
	email: {
		type: String,
		required: [true, "Email is required"],
		unique: true,
		match: emailRegexp,
	},
	name: {
		type: String,
		required: true,
	},
});

const User = model("user", userSchema);

module.exports = User;