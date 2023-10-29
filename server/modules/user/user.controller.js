//? Retrieve all users
const getAllUsers = async (req, res) => {
  res.send("All users");
  //   let viewUsers = await userModel.find();
  //   res.json({ message: "Here's a list of all users", viewUsers });
};

//? Signup
const signUp = async (req, res) => {
  try {
    res.send("All users");
  } catch (error) {
    console.log("Signup Error: ", error);
  }
};

//? Edit User Details
const updateUser = async (req, res) => {
  try {
    res.status(200).json({
      message: "User Details were updatd successfully",
      updateUserDetais,
    });
  } catch (error) {
    res.status(400).json({ message: "Updating User Error: ", error });
  }
};

//? Deactivate User (Soft Delete)
const deactivateAccount = async (req, res) => {
  try {
    res.status(200).json({
      message: "User account is deactivated successfully ",
      softDeletedUser,
    });
  } catch (error) {
    res.status(400).json({ message: "Deactivating User Error: ", error });
  }
};

//? Delete User Account Permanently (Hard Delete)
const deleteAccount = async (req, res) => {
  try {
    res.status(200).json({
      message: "User account is permanently deleted",
      hardDeletedUser,
    });
  } catch (error) {
    res.status(400).json({ message: "Deleting User Error: ", error });
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
  getAllUsers,
  signUp,
  updateUser,
  deactivateAccount,
  deleteAccount,
  resetPassword,
  logout,
};
