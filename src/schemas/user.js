import Mongoose from "mongoose";
const { Schema } = Mongoose;

const schema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
    providerInfo: {
      type: Schema.Types.Mixed,
    },
    lastLogInProvider: {
      type: String,
    },
    lastLogInAt: {
      type: Date,
    },
    registeredAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

schema.index(
  { email: 1 },
  {
    unique: true,
  }
);
schema.index({ email: 1, refreshToken: 1 });

export { schema };
