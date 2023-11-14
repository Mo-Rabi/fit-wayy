import userModel from '../../db/model/user.model.js';
import trainerModel from '../../db/model/trainer.model.js';

export const sendMessage = async (req, res) => {
  try {
    const { sender, recipient, text } = req.body;

    // Create a message object
    const message = { recipient, sender, text, timeStamp: new Date() };

    // Find sender trainer and recipient user
    let senderTrainer = await trainerModel.findOne({ email: sender });
    let recipientUser = await userModel.findOne({ email: recipient });

    // Check if sender is not a trainer, try to find it as a user
    if (!senderTrainer) {
      const senderUser = await userModel.findOne({ email: sender });
      const recipientTrainer = await trainerModel.findOne({ email: recipient });

      // Handle the case where senderUser or recipientTrainer is undefined, if needed

      senderUser.messages.push(message);
      recipientTrainer.messages.push(message);
      await senderUser.save();
      await recipientTrainer.save();
    } else {
      // Ensure that the sender trainer has a 'messages' array
      if (!senderTrainer.messages) {
        senderTrainer.messages = [];
      }

      // Add the message to the sender trainer's array
      senderTrainer.messages.push(message);
      recipientUser.messages.push(message);

      // Save the sender trainer
      await senderTrainer.save();
      await recipientUser.save();
    }

    // Respond with the saved message
    res.status(201).json(message);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
