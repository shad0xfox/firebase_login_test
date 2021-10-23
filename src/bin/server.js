import mongoose from "mongoose";
import "../config/index.js";
import { createClient } from "../lib/redis.js";

await mongoose.connect(process.env.MONGO_DB_URL);
await createClient();

const { server } = await import("../app.js");

server.listen(process.env.PORT || 3000, function () {
  console.log("Listening on port " + this.address().port);
});
