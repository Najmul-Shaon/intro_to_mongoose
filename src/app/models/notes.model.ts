import { model, Schema } from "mongoose";
import { INotes } from "../interfaces/notes.interface";

const noteSchema = new Schema<INotes>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, default: "", trim: true },
    category: {
      type: String,
      enum: ["Personal", "Office"],
      default: "Personal",
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    tags: {
      label: { type: String, required: true },
      color: { type: String, default: "gray" },
    },
    user:{
      type: Schema.Types.ObjectId, ref: "User", required: true
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Note = model<INotes>("Note", noteSchema);
