import express from "express";
import { verifyIdTokenAndGetUserData } from "../lib/firebase.js";

const router = express.Router();

router.post("/login", async function (req, res, next) {
  try {
    const { idToken } = req.body;

    const user = await verifyIdTokenAndGetUserData(idToken);

    res.json(user);
  } catch (error) {
    next(error);
  }
});

export default router;
