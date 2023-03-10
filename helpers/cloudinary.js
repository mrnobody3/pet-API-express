const cloudinary = require("cloudinary").v2;

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
});

const uploadImage = async (imagePath) => {
	const options = {
		use_filename: false,
		unique_filename: true,
		overwrite: true,
		folder: "avatars",
		transformation: [
			{ width: 350, height: 350, crop: "fill", gravity: "face" },
		],
	};
	
	try {
		return await cloudinary.uploader.upload(imagePath, options);
	} catch (error) {
		console.error(error);
	}
};

module.exports = uploadImage;
