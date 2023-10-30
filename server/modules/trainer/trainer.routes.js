import express from "express";
import {
  getAllTrainers,
  signUp,
  updateTrainer,
  deactivateAccount,
  deleteAccount,
  resetPassword,
  logout,
} from "./trainer.controller.js";
const trainerRoutes = express.Router();
//?Get All Trainers
trainerRoutes.get("/trainers", getAllTrainers);

//? Add Trainer
trainerRoutes.post(
  "/trainers/register",
  //validation(signUpValidationSchema),
  signUp
);

//?Edit Trainer Details
trainerRoutes.patch("/trainers/edit", updateTrainer);

//? Password Reset
trainerRoutes.put("/trainers/resetPassword", resetPassword);

//? Deactivate Trainer (Soft Delete)
trainerRoutes.delete("/trainers/deactivateAccount", deactivateAccount);

//? Delete Trainer Account Permanently (Hard Delete)
trainerRoutes.delete("/trainers/deleteAccount", deleteAccount);

//? Logout
trainerRoutes.get("/trainers/logout", logout);

export default trainerRoutes;
