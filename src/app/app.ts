import express, { Application, Request, Response } from "express";
import { notesRoutes } from "./controllers/notes.controller";
import { userRouters } from "./controllers/user.constroller";

const app: Application = express();

app.use(express.json());

app.use("/notes", notesRoutes);
app.use("/users", userRouters);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome");
});

export default app;
