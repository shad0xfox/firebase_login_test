import admin from "firebase-admin";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const serviceAccount = require("../secret/service-account-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export async function verifyIdTokenAndGetUserData(idToken) {
  const decodedToken = await admin.auth().verifyIdToken(idToken);
  const user = await admin.auth().getUser(decodedToken.user_id);
  return user;
}
