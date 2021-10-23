import {
  getUserByEmail,
  updateUserByEmail,
  createUser,
} from "../store/user.js";
import {
  getIdTokenFromBlackList,
  setIdTokenBlackList,
} from "../cache-stores/blacklist-id-token.js";

async function updateOrCreateUser(firebaseUser, decodedToken) {
  const {
    email,
    displayName: name,
    providerData,
    metadata: { lastSignInTime },
  } = firebaseUser;
  const signInProvider = decodedToken.firebase.sign_in_provider;

  const user = await getUserByEmail(email);

  if (user) {
    // update
    await updateUserByEmail(email, {
      providerInfo: providerData,
      lastLogInProvider: signInProvider,
      lastLogInAt: lastSignInTime,
    });
  } else {
    // register
    await createUser({
      email,
      name,
      providerInfo: providerData,
      lastLogInProvider: signInProvider,
      lastLogInAt: lastSignInTime,
      registeredAt: Date.now(),
    });
  }

  return { email, name };
}

export {
  updateOrCreateUser,
  updateUserByEmail,
  getUserByEmail,
  getIdTokenFromBlackList,
  setIdTokenBlackList,
};
