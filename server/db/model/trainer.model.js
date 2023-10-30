import mongoose from "mongoose";

const trainerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minLength: [2, "Min number of characters is 2"],
      maxLength: [50, "Max number of characters is 50"],
    },
    lastName: {
      type: String,
      minLength: [2, "Min number of characters is 2"],
      maxLength: [50, "Max number of characters is 10"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String, required: true },
    weight: { type: String, required: true },
    height: { type: String, required: true },
    rating: { type: String, default: "" },
    trainees: { type: Array, default: [] },
    plans: { type: Array, default: [] },
    password: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      default: "",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const trainerModel = mongoose.model("Trainer", trainerSchema);

export default trainerModel;
