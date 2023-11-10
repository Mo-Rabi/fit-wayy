import exerciseModel from "../../db/model/exercise.model.js";
import userModel from "../../db/model/user.model.js";
import sendNotificationEmail from "../../utils/SendingEmailM.js";


// const addExercise = async (req, res) => {
//     try {
//       const { email, userName, day, name, type, muscle, equipment, difficulty, instructions } = req.body;
//       const receiverUser = await userModel.findOne({ email: email });
  
//       if (!receiverUser) {
//         return res.status(404).json({ message: "The trainee did not register" });
//       }else {

//       const addedExercise = await exerciseModel.create({
//         email: email,
//         userName,
//         day,
//         name,
//         type,
//         muscle,
//         equipment,
//         difficulty,
//         instructions
//       });
//       const subject = `New Exercise Is Added To You:`;
//       const message = `<h3>An exercise has been added to your account go to your profile to do it.</h3><p>Best Regards, Mousa</p>`;
//       sendNotificationEmail(email, subject, message)
//       res.status(201).json({ message: "Exercise has been submitted successfully", addedExercise });
//     }
//     } catch (error) {
//       console.error('Error:', error);
//       res.status(400).json({ message: "All Fields must be provided", error });
//     }
//   };
  
const addExercise = async (req, res) => {
    try {
        const { email, userName, day, name, type, muscle, equipment, difficulty, instructions } = req.body;

        // Find the receiver user by email
        const receiverUser = await userModel.findOne({ email: email });

        if (!receiverUser) {
            return res.status(404).json({ message: "The trainee did not register" });
        }

        // Create the exercise
        const addedExercise = await exerciseModel.create({
            email: email,
            userName,
            day,
            name,
            type,
            muscle,
            equipment,
            difficulty,
            instructions
        });

        // Add the exercise to the user's collection of exercises
        receiverUser.exercises.push(addedExercise);
        await receiverUser.save();

        const subject = `New Exercise Is Added To You:`;
        const message = `<h3>An exercise has been added to your account. Go to your profile to do it.</h3><p>Best Regards, Mousa</p>`;
        sendNotificationEmail(email, subject, message);

        res.status(201).json({ message: "Exercise has been submitted successfully", addedExercise });
    } catch (error) {
        console.error('Error:', error);
        res.status(400).json({ message: "All Fields must be provided", error });
    }
};

// const getAllExercise = async (req, res) => {
//     try{
//         let getAllExer = await exerciseModel.find();
//         res.status(201).json({message: "Requested Successfully", getAllExer})

//     }catch(error) {
//         res.status(404).json({message: "Error"})
//     }
    
// }

const getAllExercise = async (req, res) => {
    try {
        // Find users who have added exercises and populate the 'exercises' field
        const usersWithExercises = await userModel.find({ exercises: { $exists: true, $not: { $size: 0 } } })
            .populate('exercises');

        const allExercises = usersWithExercises.map(user => user.exercises).flat();

        res.status(200).json({ message: "Exercises requested successfully", exercises: allExercises });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: "Error", error });
    }
}


const deleteExercise = async (req, res) => {
    try {
        const exerId = req.params.id;
        const deletedExercise = await exerciseModel.deleteOne({_id: exerId});
        if(!deletedExercise) {
            res.status(400).json({message: "Not Deleted"})
        }else {
            res.status(200).json({message: "Deleted Successfully"})
        }
    }catch(error) {
        res.status(500).json({message: "Error", error})
    }
}

const allUsers = async (req, res) => {
    try {
        let getAllUsers = await userModel.find();
        res.status(200).json({message: "Hello", getAllUsers})
    } catch (error) {
        res.status(500).json({message: "Error", error})
    }
}

const completedExercises = async (req, res) => {
    try {
        const exerciseId = req.params.exerciseId;
        const updatedExercise = await exerciseModel.findByIdAndUpdate(
            exerciseId,
            {isCorrect: true},
            {new: true}
        );
        res.status(200).json({message: 'WELL DONE: Exercise completed successfully', updatedExercise})
    } catch (error) {
        res.status(500).json({message: "Faild to complete exercise"})
    }
}

export {
    addExercise,
    getAllExercise,
    deleteExercise,
    allUsers,
    completedExercises
}
