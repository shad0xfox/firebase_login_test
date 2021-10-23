import { UserModel } from "../models/user.js";

export function getUserByEmail(email) {
  return UserModel.findOne({ email }).exec();
}

export function updateUserByEmail(email, updateObject) {
  return UserModel.findOneAndUpdate({ email }, updateObject);
}

export function createUser(user) {
  return UserModel.create(user);
}
