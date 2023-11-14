import mongoose, { Schema } from "mongoose";
import { model } from "mongoose";
const exerciseSchema = new Schema({
    email: {
        type: String,
        required: true,
      },
    userName: {
        type: String
    },
    day: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    muscle: {
        type: String,
        required: true,
    },
    equipment: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    isCorrect: {
        type: Boolean,
        default: false
    }
    // recievedId: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "User"
    // }
}, {timestamps: true});
const exerciseModel = model("Exercis", exerciseSchema);
export default exerciseModel;