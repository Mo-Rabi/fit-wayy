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
  "/register",
  //validation(signUpValidationSchema),
  signUp
);

//?Edit User Details
userRoutes.patch("/editUser", updateUser);

//? Password Reset
userRoutes.put("/resetPassword", resetPassword);

//? Deactivate User (Soft Delete)
userRoutes.delete("/deactivateAccount", deactivateAccount);

//? Delete User Account Permanently (Hard Delete)
userRoutes.delete("deleteAccount", deleteAccount);

//? Logout
userRoutes.get("/logout", logout);

export default userRoutes;
