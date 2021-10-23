import mongoose from "mongoose";
import initialCollections from "./src/fixtures/index.js";
import "./src/config/index.js";

await mongoose.connect(process.env.MONGO_DB_URL);

await initialCollections();

console.log("fixtures done");

process.exit(0);
