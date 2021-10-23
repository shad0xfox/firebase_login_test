import mongoose from "mongoose";
import { schema } from "../schemas/user.js";

const UserModel = mongoose.model("users", schema);

export { UserModel };
