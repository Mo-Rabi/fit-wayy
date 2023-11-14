import React, { useState, useEffect } from "react";
import styles from './ChatOfUser.module.css';
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { jwtDecode } from "jwt-decode";


export default function ChatOfUser() {
  const [users, setUsers] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainer, setselectedTrainer] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUser, setCurrentUser] = useState('');


  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = token;
  const { id: UserID } = jwtDecode(token);

  //! Retrieve All Users
  const usersQuery = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      let { data } = await axios.get("http://localhost:4000/users");
      setUsers(data.viewUsers);
      console.log(data);
      return data.viewUsers;
    },
  });

  // Fetch messages when a user is selected
  useEffect(() => {
    if (selectedTrainer) {
      setMessages([]);
      console.log(selectedTrainer);
    }
  }, [selectedTrainer]);

  const trainersQuery = useQuery({
    queryKey: ["allTrainers"],
    queryFn: async () => {
      let { data } = await axios.get("http://localhost:4000/trainers");
      setTrainers(data.viewAllTrainers);
      console.log(data);
      return data.viewAllTrainers;
    },
  });

  useEffect(() => {
    try {
      if (users.length > 0) {
        const currentUse = users.find((user) => user._id === UserID);
        setCurrentUser(currentUse);
        console.log("User: ", currentUser);
      }
    } catch (error) {
      console.error("Error in finding id", error)
    }

  }, [users, UserID]);


  const formatTimestamp = (timeStamp) => {
    if (!timeStamp) {
      return "Timestamp not available";
    }

    const date = new Date(timeStamp);

    if (isNaN(date)) {
      return "Invalid Date";
    }

    return date.toLocaleTimeString();
  };

  const [reversedMessages, setReversedMessages] = useState([]);

  useEffect(() => {
    const fetchTrainerMessages = async () => {
      if (selectedTrainer && currentUser) {
        // Assuming messages are stored in the trainers's data
        const trainerMessages = selectedTrainer.messages || [];

        // Filter messages based on the current user
        const filteredMessages = trainerMessages.filter(
          (message) =>
            message.sender === currentUser.email ||
            message.recipient === selectedTrainer.email
        );

        // Reverse the order of messages (newest first)
        const reversedOrder = filteredMessages.slice().reverse();
        setReversedMessages(reversedOrder);
      }
    };

    fetchTrainerMessages();
  }, [selectedTrainer, currentUser]);

  const handleSendMessage = async (e) => {
    e.preventDefault(); // Add this line to prevent the default form submission behavior

    try {
      console.log("currentUser:", currentUser.email);
      console.log("selectedTrainer:", selectedTrainer.email);
      console.log("newMessage:", newMessage);

      if (!currentUser || !currentUser.email || !selectedTrainer || !selectedTrainer.email || !newMessage) {
        console.error('Sender ID, recipient ID, and text are required fields');
        return;
      }

      const response = await fetch('http://localhost:4000/sendMessages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: currentUser.email, // Assuming email is the unique identifier for trainers
          recipient: selectedTrainer.email,
          text: newMessage,
        }),
      });

      if (response.ok) {
        console.log('Message sent successfully');
        setReversedMessages([
          ...reversedMessages,
          { recipient: selectedTrainer.email, sender: currentUser.email, text: newMessage, timeStamp: new Date() },
        ]);
        console.log(reversedMessages);
        setNewMessage('');
      } else {
        const errorData = await response.json();
        console.error('Error sending message:', errorData);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (usersQuery.isLoading) return <h1>Loading...</h1>;
  if (usersQuery.isError)
    return <pre>{JSON.stringify(usersQuery.error)}</pre>;

  return (
    <div className={`container mb-3 ${`${styles.mainContainer}`}`}>
      <div className={`container mt-5 ${styles.chatContainer}`}>
        <div className="row">
          <div className="col-3">
            <h1 className="text-light">Trainers</h1>
            <ul>
              {trainers.map((trainer) => (
                <button
                  className={`${styles.TrainersNames} btn col-12`}
                  onClick={() => setselectedTrainer(trainer)}
                >
                  <i className="fa-regular fa-circle-user"></i> {trainer.firstName} {trainer.lastName}
                </button>
              ))}
            </ul>
          </div>
          <div className="col-9 text-light">
            {selectedTrainer ? (
              <>
                <div style={{ height: '400px', overflowY: 'scroll', border: '1px solid gray' }}>
                  <h5 className="text-center"><i className="fa-regular fa-circle-user"></i> {selectedTrainer.firstName} {selectedTrainer.lastName}</h5>
                  {reversedMessages.map((message) => (
                    <div
                      key={message._id}
                      className={`${styles.messagecontainer} ${message.sender === currentUser.email ? `${styles.usermessage}` : `${styles.trainermessage}`
                        }`}
                    >
                      <strong className="d-block">{message.text} </strong>
                      <p style={{ fontSize: '9px', display: 'block' }}>
                        {formatTimestamp(message.timeStamp)}
                      </p>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSendMessage} className="input-group" style={{ marginTop: '10px' }}>
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder={`Type your message to ${selectedTrainer.firstName}`}
                    className="col-10"
                  />
                  <button type="submit" className="col-2 btn btn-primary">
                    <i className="fa-regular fa-paper-plane"></i> Send
                  </button>
                </form>
              </>
            ) : (
              <h5>Select a user to start chatting</h5>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
