import express, { Application, Request, Response } from "express";
import { model, Schema } from "mongoose";

const app: Application = express();

const noteSchema = new Schema({
  title: String,
  content: String,
});

const Note = model("Note", noteSchema);

app.post("/create", async (req: Request, res: Response) => {
  const myNote = new Note({
    title: "Learning Mongoose",
    content: "Keep Learning",
  });

  await myNote.save();

  res.status(201).json({
    success: true,
    message: "Note Created",
    note: myNote,
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome");
});

export default app;
