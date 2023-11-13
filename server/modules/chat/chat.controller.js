import userModel from '../../db/model/user.model.js';
import trainerModel from '../../db/model/trainer.model.js';

export const sendMessage = async (req, res) => {
  try {
    const { sender, recipient, text } = req.body;

    // Find sender trainer and recipient users
    console.log('Finding sender:', sender);
    const senderTrainer = await trainerModel.findOne({ email: sender });
    console.log('Sender Trainer:', senderTrainer);

    console.log('Finding recipient:', recipient);
    const recipientUser = await userModel.findOne({ email: recipient });
    console.log('Recipient User:', recipientUser);

    // Check if senderTrainer or recipientUser is undefined
    if (!senderTrainer || !recipientUser) {
      console.error('Sender trainer or recipient not found.');
      return res.status(400).json({ error: 'Sender trainer or recipient not found.' });
    }

    // Create a message object
    const message = { recipient, sender, text, timeStamp: new Date() };

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

    // Respond with the saved message
    res.status(201).json(message);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
