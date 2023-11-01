import express from "express";
import {
  getAllUsers,
  signUp,
  updateUser,
  deactivateAccount,
  deleteAccount,
  resetPassword,
  logout,
  signIn,
  userSignUpVerification,
} from "./user.controller.js";
import { signInSchem, signUpValidationSchema } from "./user.validation.js";
import { validation } from "../../middleware/validation.js";

const userRoutes = express.Router();

//?Get All Users
userRoutes.get("/users", getAllUsers);

//? User Signup
userRoutes.post("/users/register", validation(signUpValidationSchema), signUp);

//? User Verification after Signup
userRoutes.get("/user/verify/:token", userSignUpVerification);

//? Login User
userRoutes.post(
  "/users/login",
  validation(signInSchem),
  signIn
  // authenticateTokenCookie
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
