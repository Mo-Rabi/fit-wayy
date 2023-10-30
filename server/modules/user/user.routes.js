import express from "express";
import {
  getAllUsers,
  signUp,
  updateUser,
  deactivateAccount,
  deleteAccount,
  resetPassword,
  logout,
} from "./user.controller.js";

const userRoutes = express.Router();

//?Get All Users
userRoutes.get("/users", getAllUsers);

//? Add User
userRoutes.post(
  "/users/register",
  //validation(signUpValidationSchema),
  signUp
);

//?Edit User Details
userRoutes.patch("/users/edit", updateUser);

//? Password Reset
userRoutes.put("/users/resetPassword", resetPassword);

//? Deactivate User (Soft Delete)
userRoutes.delete("/users/deactivateAccount", deactivateAccount);

//? Delete User Account Permanently (Hard Delete)
userRoutes.delete("/users/deleteAccount", deleteAccount);

//? Logout
userRoutes.get("/users/logout", logout);

export default userRoutes;
