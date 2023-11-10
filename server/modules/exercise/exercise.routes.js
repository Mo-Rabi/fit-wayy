import express from "express";
import {
    createExercise,
    getAllExercises,
    updateExercise,
    deleteExercise,
    searchExercisesByMuscle
} from "./exercise.controller.js";

const exerciseRoutes = express.Router();

exerciseRoutes.post("/trainer/createExercise", createExercise);
exerciseRoutes.get("/trainer/getAll", getAllExercises);
exerciseRoutes.get("/user/getExercise", searchExercisesByMuscle);
exerciseRoutes.put("/trainers/updateExercise/:name", updateExercise);
exerciseRoutes.delete("/admin/deleteExercise", deleteExercise);

export default exerciseRoutes;
