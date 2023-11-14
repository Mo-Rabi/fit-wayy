import express from "express";
import { addExercise, getAllExercise } from "./exercise.controller.js";

const exerciseRouter = express.Router();
exerciseRouter.post("/addExer/:id", addExercise);
exerciseRouter.get("/getAll", getAllExercise);

export default exerciseRouter ;