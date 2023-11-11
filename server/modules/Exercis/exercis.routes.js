import express from "express";
import { addExercise, allUsers, completedExercises, deleteExercise, getAllExercise } from "./exercis.controller.js";
import auth from "../../middleware/authM.js";

const exercisRouter = express.Router();
exercisRouter.post("/addExer", addExercise);
exercisRouter.get("/getAll", getAllExercise);
exercisRouter.delete("/delete/:id", deleteExercise);
exercisRouter.get("/users/allUsers", allUsers);
exercisRouter.post("/markCorrect/:exerciseId", completedExercises)

export default exercisRouter;