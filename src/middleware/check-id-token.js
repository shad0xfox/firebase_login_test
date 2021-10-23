import { verifyIdToken } from "../lib/jwt.js";
import { getIdTokenFromBlackList } from "../services/user.js";

export default async function checkIdToken(req, res, next) {
  try {
    const idToken = req.body.idToken || req.query.idToken;

    const isIdTokenInBlackList = await getIdTokenFromBlackList(idToken);

    if (isIdTokenInBlackList) {
      const error = new Error("Id token is blocked");
      error.status = 403;

      throw error;
    }

    const { email } = verifyIdToken(idToken);

    res.locals.email = email;

    next();
  } catch (error) {
    next(error);
  }
}
