import express, { Request, Response } from "express";
import { User } from "../models/user.model";
import z from "zod";

export const userRouters = express.Router();

const CreateUserZodSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
  email: z.string(),
  password: z.string(),
  role: z.string().optional(),
});

userRouters.post("/create", async (req: Request, res: Response) => {
  const body = req.body;
  const user = await User.create(body);

  res.status(201).json({
    success: true,
    message: "User created successfully",
    user,
  });
});
userRouters.post("/create-user-zod", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    // const body = await CreateUserZodSchema.parseAsync(req.body);
    console.log(body);

    const user = await User.create(body);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "User created failed",
      error,
    });
  }
});
userRouters.get("/get-all", async (req: Request, res: Response) => {
  const users = await User.find();

  res.status(201).json({
    success: true,
    message: "User find successfully",
    users,
  });
});
userRouters.get("/get/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);

  res.status(201).json({
    success: true,
    message: "Specific user find successfully",
    user,
  });
});
userRouters.patch("/update/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const body = req.body;
  const user = await User.findByIdAndUpdate(userId, body, { new: true });

  res.status(201).json({
    success: true,
    message: "Specific user updated successfully",
    user,
  });
});
userRouters.delete("/delete/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await User.findOneAndDelete({ _id: userId });

  res.status(201).json({
    success: true,
    message: "Specific user updated successfully",
    user,
  });
});
