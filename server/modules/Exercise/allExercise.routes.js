import exerciseModel from "../../db/model/exercise.model.js";
import express from "express";
const allExercise = express.Router();
allExercise.post('/',async (req,res)=>{
    let getAllExer = await exerciseModel.find({ isCorrect: true });
    res.status(201).json({message: "Requested Successfully", getAllExer})
});
export default allExercise; 