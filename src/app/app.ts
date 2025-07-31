import express, { Application, Request, Response } from "express";
import { model, Schema } from "mongoose";

const app: Application = express();

app.use(express.json());

const noteSchema = new Schema(
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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Note = model("Note", noteSchema);

app.post("/note/create", async (req: Request, res: Response) => {
  // const { title, content, label };
  const body = req.body;
  // const myNote = new Note({
  //   title: "Learning Mongoose",
  // });

  // await myNote.save();

  const note = await Note.create(body);

  res.status(201).json({
    success: true,
    message: "Note Created",
    note: note,
  });
});

app.get("/notes/get", async (req: Request, res: Response) => {
  const notes = await Note.find();
  res.status(201).json({
    success: true,
    message: "Note Created",
    note: notes,
  });
});
app.get("/note/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const note = await Note.findById(noteId);
  res.status(201).json({
    success: true,
    message: "Note Created",
    note: note,
  });
});
app.patch("/note/update/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const updatedBody = req.body;
  const note = await Note.findByIdAndUpdate(noteId, updatedBody, { new: true });
  res.status(201).json({
    success: true,
    message: "Note Updated",
    note: note,
  });
});

app.delete("/note/delete/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const note = await Note.findByIdAndDelete(noteId, { new: true });
  res.status(201).json({
    success: true,
    message: "Note Deleted",
    note: note,
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome");
});

export default app;
