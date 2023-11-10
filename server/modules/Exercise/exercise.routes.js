import express from "express";
import { addExercise, allUsers, completedExercises, deleteExercise, getAllExercise } from "./exercise.controller.js";
import auth from "../../middleware/authM.js";

const exerciseRouter = express.Router();
exerciseRouter.post("/addExer", addExercise);
exerciseRouter.get("/getAll", getAllExercise);
exerciseRouter.delete("/delete/:id", deleteExercise);
exerciseRouter.get("/users/allUsers", allUsers);
exerciseRouter.post("/markCorrect/:exerciseId", completedExercises)

export default exerciseRouter;