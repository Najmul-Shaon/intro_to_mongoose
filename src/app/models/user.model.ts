import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 10,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 10,
    },
    age: {
      type: Number,
      required: true,
      min: 20,
      max: 60,
    },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const User = model("User", userSchema);
