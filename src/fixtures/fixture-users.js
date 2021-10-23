import { UserModel } from "../models/user.js";
import { users } from "./data/user.js";

async function drop() {
  try {
    await UserModel.collection.drop();
  } catch (error) {
    if (error.codeName === "NamespaceNotFound") {
      return;
    }

    throw error;
  }
}

async function insertMany() {
  return UserModel.insertMany(users);
}

function syncIndexes() {
  return UserModel.syncIndexes();
}

export { drop, insertMany, syncIndexes };
