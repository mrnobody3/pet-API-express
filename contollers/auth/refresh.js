const jwt = require("jsonwebtoken");
const { HttpError, createTokens } = require("../../helpers");
const { REFRESH_SECRET_KEY } = process.env;
const { User } = require("../../models/auth");
const refresh = async (req, res) => {
  const { refreshToken } = req.body;

  try {
    const { id } = jwt.verify(refreshToken, REFRESH_SECRET_KEY);
    let user = await User.findById(id);

    if (!user) {
      throw HttpError(403, "Forbidden");
    }
    const tokens = createTokens(id);

    await User.findByIdAndUpdate(id, { ...tokens });

    res.json(tokens);
  } catch (error) {
    throw HttpError(403, error.message);
  }
};

module.exports = refresh;
