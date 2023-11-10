import request from 'request'
import ExerciseModel from '../../db/model/exercise.model.js'
import axios from 'axios'


export const createExercise = (req, res) => {
    const { name, type, muscle, difficulty, offset, video } = req.body;
    const newExercise = new ExerciseModel({ name, type, muscle, difficulty, equipment, offset, instructions, videoURL });

    newExercise.save()
        .then((exercise) => {
            res.status(201).json(exercise);
        })
        .catch((error) => {
            res.status(400).json({ error: 'Failed to create exercise' });
        });
};


// const fetchAndSaveData = async () => {
//     const muscle = 'triceps';

//     try {
//         const response = await axios.get(`https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`, {
//             headers: {
//                 'X-Api-Key': 'VQl8zriVrEFuIv2nCC9l4w==7TXUS4fXli0HN6zs'
//             },
//         });
//         const apiData = response.data;

//         for (const exerciseData of apiData) {
//             const newExercise = new ExerciseModel({
//                 name: exerciseData.name,
//                 type: exerciseData.type,
//                 muscle: exerciseData.muscle,
//                 difficulty: exerciseData.difficulty,
//                 offset: exerciseData.offset,
//                 instructions: exerciseData.instructions,
//                 videoURL: "",
//                 equipment: exerciseData.equipment,
//             });

//             newExercise.save()
//                 .then((exercise) => {
//                     console.log('Exercise saved:', exercise);
//                 })
//                 .catch((error) => {
//                     console.error('Failed to save exercise:', error);
//                 });
//         }
//     } catch (error) {
//         console.error('Error fetching data from API:', error);
//     }
// };

// fetchAndSaveData();

// const addVideo = async () => {
//     try {
//         const exercises = await ExerciseModel.find({});

//         for (const exercise of exercises) {
//             exercise.videoURL = "";
//             await exercise.save();
//             console.log(`Added video for exercise: ${exercise.name}`);
//         }

//         console.log('Data update completed successfully.');
//     } catch (error) {
//         console.error('Data update failed:', error);
//     }
// }
// addVideo()

export const getAllExercises = (req, res) => {
    ExerciseModel.find()
        .then((exercises) => {
            res.status(200).json(exercises);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed to retrieve exercises' });
        });
};

export const searchExercisesByMuscle = async (req, res) => {
    try {
        const { muscle } = req.query;
        if (!muscle) {
            return res.status(400).json({ error: 'Muscle parameter is required' });
        }

        const exercises = await ExerciseModel.find({ muscle });

        if (exercises.length === 0) {
            return res.status(404).json({ error: 'No exercises found for the specified muscle' });
        }

        res.status(200).json(exercises);
    } catch (error) {
        res.status(500).json({ error: 'Failed to search exercises by muscle' });
    }
};


export const updateExercise = (req, res) => {
    const exerciseName = req.params.name;
    const { name, type, muscle, difficulty, offset, equipment, instructions, videoURL } = req.body;

    ExerciseModel.findOne({ name: exerciseName })
        .then((exercise) => {
            if (!exercise) {
                return res.status(404).json({ error: 'Exercise not found' });
            }

            // Create an update object with fields that have values
            const updateFields = {};
            if (name) updateFields.name = name;
            if (type) updateFields.type = type;
            if (muscle) updateFields.muscle = muscle;
            if (difficulty) updateFields.difficulty = difficulty;
            if (equipment) updateFields.equipment = equipment;
            if (offset) updateFields.offset = offset;
            if (instructions) updateFields.instructions = instructions;
            if (videoURL) updateFields.videoURL = videoURL;
            exercise.set(updateFields);

            return exercise.save();
        })
        .then((updatedExercise) => {
            res.status(200).json(updatedExercise);
        })
        .catch((error) => {
            res.status(400).json({ error: 'Failed to update exercise' });
        });
};


export const deleteExercise = (req, res) => {
    const exerciseId = req.params.id;

    ExerciseModel.findByIdAndRemove(exerciseId)
        .then(() => {
            res.status(204).send();
        })
        .catch((error) => {
            res.status(400).json({ error: 'Failed to delete exercise' });
        });
};
