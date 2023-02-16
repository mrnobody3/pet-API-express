const { Schema, model } = require("mongoose");
const Joi = require("joi");
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
	token: {
		type: String,
		default: ""
	}
}, {
	versionKey: false,
	timestamps: {
		createdAt: 'created_at',
		updatedAt: false
	}
});

const registerSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().pattern(emailRegexp).required(),
	password: Joi.string().min(6).required()
})

const loginSchema = Joi.object({
	email: Joi.string().pattern(emailRegexp).required(),
	password: Joi.string().min(6).required()
})

const schemas = {
	registerSchema,
	loginSchema,
}

const User = model("user", userSchema);

module.exports = {
	User,
	schemas,
}