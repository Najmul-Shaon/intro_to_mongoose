import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";
import { Note } from "./notes.model";

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: [true, "Duplicate Email"],
      validate: {
        validator: function (v) {
          // return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
          return /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
        },
        message: (props) => `${props.value} is not valid email.`,
      },
    },
    firstName: {
      type: String,
      // required: true,
      required: [true, "First Name Required"],
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
    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
        message: "Role is not valid, got {VALUE}",
      },
      default: "user",
    },
    address: {
      city: { type: String },
      street: { type: String },
      zip: { type: Number },
    },
  },

  {
    versionKey: false,
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    console.log(doc);
    await Note.deleteMany({ user: doc._id });
  }
});

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

export const User = model("User", userSchema);
