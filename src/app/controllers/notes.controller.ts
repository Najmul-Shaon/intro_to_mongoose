import { Request, Response } from "express";
import { Note } from "../models/notes.model";
import express from "express";

export const notesRoutes = express.Router();

notesRoutes.post("/create", async (req: Request, res: Response) => {
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

notesRoutes.get("/get", async (req: Request, res: Response) => {
  const notes = await Note.find().populate("user");
  res.status(201).json({
    success: true,
    message: "Note Created",
    note: notes,
  });
});
notesRoutes.get("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const note = await Note.findById(noteId);
  res.status(201).json({
    success: true,
    message: "Note Created",
    note: note,
  });
});
notesRoutes.patch("/update/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const updatedBody = req.body;
  const note = await Note.findByIdAndUpdate(noteId, updatedBody, { new: true });
  res.status(201).json({
    success: true,
    message: "Note Updated",
    note: note,
  });
});

notesRoutes.delete("/delete/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const note = await Note.findByIdAndDelete(noteId, { new: true });
  res.status(201).json({
    success: true,
    message: "Note Deleted",
    note: note,
  });
});
