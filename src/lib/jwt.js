import jwt from "jsonwebtoken";
const { ID_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

function generateIdToken(payload) {
  return jwt.sign(payload, ID_TOKEN_SECRET, {
    expiresIn: 60 * 60 * 3,
  });
}

function generateRefreshToken(payload) {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: 60 * 60 * 24 * 30,
  });
}

function verifyIdToken(idToken, options = {}) {
  try {
    const decodeData = jwt.verify(idToken, ID_TOKEN_SECRET, options);

    return decodeData;
  } catch (error) {
    if (error.message === "jwt expired") {
      error.status = 401;
    }
    throw error;
  }
}

function verifyRefreshToken(refreshToken) {
  try {
    const decodeData = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

    return decodeData;
  } catch (error) {
    if (error.message === "jwt expired") {
      error.status = 401;
    }
    throw error;
  }
}

export {
  generateIdToken,
  generateRefreshToken,
  verifyIdToken,
  verifyRefreshToken,
};
