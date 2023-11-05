import trainerModel from "../../db/model/trainer.model.js";
import bcrypt from "bcrypt";
import { signInSchem, signUpValidationSchema } from "./trainer.validation.js";
import jwt from "jsonwebtoken";
import { sendToEmail } from "../../utils/sendEmail.js";

//? Retrieve all trainers
const getAllTrainers = async (req, res) => {
  try {
    let viewAllTrainers = await trainerModel.find();
    res.json({ message: "Here's a list of all trainers", viewAllTrainers });
  } catch (error) {
    res.json({ message: "Retrieving all trainers Error: ", viewAllTrainers });
  }
};

//? Trainer Signup
const signUp = async (req, res) => {
  try {
    let { error } = signUpValidationSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      res.status(400).json({ message: "Trainer Validation error", error });
    } else {
      let { email } = req.body;
      let foundTrainer = await trainerModel.findOne({ email: email });
      foundTrainer &&
        res.status(409).json({ message: "User Email already exists" });
      console.log(foundTrainer);
      if (!foundTrainer) {
        let hashedPassword = bcrypt.hashSync(req.body.password, 10);
        let addedTrainer = await trainerModel.create({
          ...req.body,
          password: hashedPassword,
        });

        const token = jwt.sign({ id: addedTrainer._id }, "secret_key", {
          expiresIn: "30d",
        });
        const userType = "trainer";
        sendToEmail(req.body.email, token, userType);
        res.status(201).json({
          message: "Trainer SignUp successful, please check your email",
          addedTrainer,
          token,
        });
      }
    }
  } catch (error) {
    console.log("Trainer Signup Error: ", error);
  }
};

//? Trainer Signup Verification
const trainerSignUpVerification = async (req, res) => {
  try {
    const payload = jwt.verify(req.params.token, "secret_key");
    // Set isVerified to true in DB
    const trainer = await trainerModel.findByIdAndUpdate(
      payload.id,
      {
        isVerified: true,
      },
      { new: true }
    );
    console.log("Trainer Verified: ", trainer);

    // Redirect trainer to login page or send a response
    res.json({
      message: "Trainer Email verification successful. You can now log in.",
    });
  } catch (error) {
    console.log("Trainer Signup Verification Error: ", error);
  }
};

//? Trainer Signin
const signIn = async (req, res) => {
  try {
    console.log(req.body.email);
    let { error } = signInSchem.validate(req.body);
    if (error) {
      res
        .status(400)
        .json({ message: "SignIn Schema Validation Error: ", error });
    } else {
      let foundTrainer = await trainerModel.findOne({ email: req.body.email });
      if (!foundTrainer) {
        res.status(404).json({
          message: "Trainer not found, You need to create an account",
        });
      } else if (foundTrainer.isVerified === false) {
        res
          .status(404)
          .json({ message: "Please check your email to verify your account" });
      } else if (foundTrainer.isVerified === true) {
        console.log("Found Trainer? ", foundTrainer);
        let matched = bcrypt.compareSync(
          req.body.password,
          foundTrainer.password
        );
        console.log("Passwords match?", matched);

        if (matched) {
          let token = jwt.sign(
            { id: foundTrainer.id },
            "SecretKeyCanBeAnything",
            {
              expiresIn: "30d", // when expired you cannot access /profile
            }
          );
          console.log(token);
          //! Sitting the token in the response cookiesafter successful login
          res.cookie(
            "token",
            token, //?res.cookie(name, value [, options])
            { httpOnly: true }
          );
          res
            .status(200)
            .json({ message: "Trainer logged in successfully", token });
        } else {
          res.status(404).json({ message: "Please check your password" });
        }
      }
    }
  } catch (error) {
    console.log("Trainer Signin Error: ", error);
  }
};

//? Edit Trainer Details
const updateTrainer = async (req, res) => {
  try {
    res.status(200).json({
      message: "Trainer Details were updatd successfully",
      updateTrainerDetais,
    });
  } catch (error) {
    res.status(400).json({ message: "Updating Trainer Error: ", error });
  }
};

//? Deactivate Trainer (Soft Delete)
const deactivateAccount = async (req, res) => {
  try {
    res.status(200).json({
      message: "Trainer account is deactivated successfully ",
      softDeletedTrainer,
    });
  } catch (error) {
    res.status(400).json({ message: "Deactivating Trainer Error: ", error });
  }
};

//? Delete Trainer Account Permanently (Hard Delete)
const deleteAccount = async (req, res) => {
  try {
    res.status(200).json({
      message: "Trainer account is permanently deleted",
      hardDeletedTrainer,
    });
  } catch (error) {
    res.status(400).json({ message: "Deleting Trainer Error: ", error });
  }
};

//? Password Reset
const resetPassword = async (req, res) => {
  try {
    res.status(200).json({
      message: "Please check your email to Reset your Password",
      saveNewPassword,
    });
  } catch (error) {
    res.status(400).json({ message: "Password Reset Error: ", error });
  }
};

//? Logout
const logout = (req, res) => {
  try {
    res.status(200).json({ message: "You are now Logged out" });
  } catch (error) {
    res.status(400).json({ message: "Logout Error: ", error });
  }
};

export {
  getAllTrainers,
  signUp,
  updateTrainer,
  deactivateAccount,
  deleteAccount,
  resetPassword,
  logout,
  signIn,
  trainerSignUpVerification,
};
