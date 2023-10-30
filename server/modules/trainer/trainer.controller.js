import trainerModel from "../../db/model/trainer.model.js";

//? Retrieve all trainers
const getAllTrainers = async (req, res) => {
  res.send("All trainers");
  //   let viewTrainers = await trainerModel.find();
  //   res.json({ message: "Here's a list of all trainers", viewTrainers });
};

//? Signup
const signUp = async (req, res) => {
  try {
    let addedTrainer = await trainerModel.insertMany(req.body);
    res.json({
      message:
        "Sign up successful, please check your email to verify your account",
      addedTrainer,
    });
  } catch (error) {
    console.log("Signup Error: ", error);
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
};
