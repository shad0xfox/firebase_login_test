import express from "express";
import checkIdToken from "../middleware/check-id-token.js";
import { verifyIdTokenAndGetUserData } from "../lib/firebase.js";
import {
  updateOrCreateUser,
  updateUserByEmail,
  getUserByEmail,
  setIdTokenBlackList,
} from "../services/user.js";
import {
  generateIdToken,
  generateRefreshToken,
  verifyIdToken,
} from "../lib/jwt.js";

const router = express.Router();

router.post("/login", async function (req, res, next) {
  try {
    const { firebaseIdToken } = req.body;

    const { user: firebaseUser, decodedToken } =
      await verifyIdTokenAndGetUserData(firebaseIdToken);

    const { email, name } = await updateOrCreateUser(
      firebaseUser,
      decodedToken
    );

    const idToken = generateIdToken({ email, name });
    const refreshToken = generateRefreshToken({ email, name });

    await updateUserByEmail(email, { refreshToken });

    res.json({ idToken, refreshToken });
  } catch (error) {
    next(error);
  }
});

router.post("/refreshToken", async function (req, res, next) {
  try {
    const { email, name } = verifyIdToken(req.body.idToken, {
      ignoreExpiration: true,
    });
    const { refreshToken: sendedRefreshToken } = req.body;

    const { refreshToken } = await getUserByEmail(email);

    if (sendedRefreshToken !== refreshToken) {
      throw new Error("Wrong refreshToken");
    }

    const newIdToken = generateIdToken({ email, name });
    const newRefreshToken = generateRefreshToken({ email, name });

    res.json({ idToken: newIdToken, refreshToken: newRefreshToken });
  } catch (error) {
    next(error);
  }
});

router.delete("/revoke-id-token", async function (req, res, next) {
  try {
    const { idToken } = req.body;
    await setIdTokenBlackList(idToken);
    res.status(201).send();
  } catch (error) {
    next(error);
  }
});

router.use(checkIdToken);

router.get("/user", async function (req, res, next) {
  try {
    const { email } = res.locals;

    const user = await getUserByEmail(email);

    res.json({ user });
  } catch (error) {
    next(error);
  }
});

export default router;
