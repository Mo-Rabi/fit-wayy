import React, { useState, useEffect } from "react";
import styles from './ChatOfTrainer.module.css';
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { jwtDecode } from "jwt-decode";


export default function ChatOfTrainer() {
  const [users, setUsers] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentTrainerName, setCurrentTrainerName] = useState('');


  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = token;
  const { id: TrainerID } = jwtDecode(token);

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
    if (selectedUser) {
      setMessages([]);
      console.log(selectedUser);
    }
  }, [selectedUser]);

  const trainersQuery = useQuery({
    queryKey: ["allTrainers"],
    queryFn: async () => {
      let { data } = await axios.get("http://localhost:4000/trainers");
      setTrainers(data.viewAllTrainers);
      console.log(data);
      return data.viewAllTrainers;
    },
  });
  // async function getAllTrainers() {
  //   try {
  //     const response = await axios.get('http://localhost:4000/trainers');
  //     console.log(response);

  //     if (response.data && response.data.viewAllTrainers) {
  //       const users = response.data.viewAllTrainers;

  //       // Ensure userID is defined before trying to find the user
  //       if (userID) {
  //         const user = users.find(user => user._id === userID);

  //         if (user) {
  //           console.log("Found user:", user.email);
  //         } else {
  //           console.log("User not found for ID:", userID);
  //         }
  //       } else {
  //         console.log("userID is undefined");
  //       }
  //     } else {
  //       console.error("Invalid response format:", response.data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching trainers:", error);
  //   }
  // }

  useEffect(() => {
    // Find and set the current trainer when the list of trainers is available
    try {
      if (trainers.length > 0) {
        const currentTrain = trainers.find((trainer) => trainer._id === TrainerID);
        setCurrentTrainerName(currentTrain);
        console.log("Trainer: ", currentTrainerName);
      }
    } catch (error) {
      console.error("Error in finding id", error)
    }

  }, [trainers, TrainerID]);


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

  // Fetch messages when the component mounts or when a new user is selected
  useEffect(() => {
    const fetchUserMessages = async () => {
      if (selectedUser && currentTrainerName) {
        // Assuming messages are stored in the user's data
        const userMessages = selectedUser.messages || [];

        // Filter messages based on the current trainer
        const filteredMessages = userMessages.filter(
          (message) =>
            message.sender === currentTrainerName.email ||
            message.recipient === currentTrainerName.email
        );

        // Reverse the order of messages (newest first)
        const reversedOrder = filteredMessages.slice().reverse();
        setReversedMessages(reversedOrder);
      }
    };

    fetchUserMessages();
  }, [selectedUser, currentTrainerName]);

  const handleSendMessage = async (e) => {
    e.preventDefault(); // Add this line to prevent the default form submission behavior

    try {
      console.log("currentTrainer:", currentTrainerName.email);
      console.log("selectedUser:", selectedUser.email);
      console.log("newMessage:", newMessage);

      if (!currentTrainerName || !currentTrainerName.email || !selectedUser || !selectedUser.email || !newMessage) {
        console.error('Sender ID, recipient ID, and text are required fields');
        return;
      }

      const response = await fetch('http://localhost:4000/sendMessages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: currentTrainerName.email, // Assuming email is the unique identifier for trainers
          recipient: selectedUser.email,
          text: newMessage,
        }),
      });

      if (response.ok) {
        console.log('Message sent successfully');
        setReversedMessages([...reversedMessages, { text: newMessage, timeStamp: new Date() }]);
        setNewMessage('');
      } else {
        const errorData = await response.json();
        console.error('Error sending message:', errorData);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (trainersQuery.isLoading) return <h1>Loading...</h1>;
  if (trainersQuery.isError)
    return <pre>{JSON.stringify(trainersQuery.error)}</pre>;

  return (
    <div className={`${`container ${styles.mainContainer}`}`}>
      <div className={`container mt-5 ${styles.chatContainer}`}>
        <div className="row">
          <div className="col-3">
            <h1 className="text-light">Users</h1>
            <ul>
              {users.map((user) => (
                <button
                  className={`${styles.usersNames} btn col-12`}
                  onClick={() => setSelectedUser(user)}
                >
                  <i className="fa-regular fa-circle-user"></i> {user.firstName} {user.lastName}
                </button>
              ))}
            </ul>
          </div>
          <div className="col-9 text-light">
            {selectedUser ? (
              <>
                <div style={{ height: '400px', overflowY: 'scroll', border: '1px solid gray' }}>
                  <h5 className="text-center"><i className="fa-regular fa-circle-user"></i> {selectedUser.firstName} {selectedUser.lastName}</h5>
                  {reversedMessages.map((message) => (
                    <div key={message._id} className={`${styles.messagecontainer} ${message.sender === currentTrainerName.email ? `${styles.trainermessage}` : `${styles.usermessage}`}`}>
                      <strong className="d-block">{message.text}</strong>
                      <p style={{ fontSize: '9px', display: 'block' }}>{formatTimestamp(message.timeStamp)}</p>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSendMessage} className="input-group" style={{ marginTop: '10px' }}>
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder={`Type your message to ${selectedUser.firstName}`}
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
