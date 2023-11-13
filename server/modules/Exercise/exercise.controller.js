import exerciseModel from "../../db/model/exercise.model.js";

const addExercise = async (req, res) => {
    try {
        let {id} = req.params;
        let {name, type, muscle, equipment, difficulty, instructions} = req.body;
        let addedExercise = await exerciseModel.insertMany({name, type, muscle, equipment, difficulty, instructions, recievedId: id});
        res.status(201).json({message: "Submitted successfully", addedExercise}) 
    }catch(error) {
        res.status(404).json({message: "Error", error})
    }
    
}

const getAllExercise = async (req, res) => {
    try{
        let getAllExer = await exerciseModel.find().populate("recievedId");
        res.status(201).json({message: "Requested Successfully", getAllExer})

    }catch(error) {
        res.status(404).json({message: "Error"})
    }
    
}
export {
    addExercise,
    getAllExercise
}