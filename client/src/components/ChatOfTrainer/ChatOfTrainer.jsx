import React, { useState, useEffect } from "react";
import styles from './ChatOfTrainer.module.css';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import bg from "../assets/images/gym/bg2.jpg";

export default function ChatOfTrainer() {
  const [users, setUsers] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentTrainerName, setCurrentTrainerName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [senderImage, setSenderImage] = useState('');
  const [receiverImage, setReceiverImage] = useState('');

  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = token;
  const { id: TrainerID } = jwtDecode(token);

  const usersQuery = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      let { data } = await axios.get("http://localhost:4000/users");
      setUsers(data.viewUsers);
      return data.viewUsers;
    },
  });

  useEffect(() => {
    if (selectedUser) {
      setMessages([]);
    }
  }, [selectedUser]);

  const trainersQuery = useQuery({
    queryKey: ["allTrainers"],
    queryFn: async () => {
      let { data } = await axios.get("http://localhost:4000/trainers");
      setTrainers(data.viewAllTrainers);
      return data.viewAllTrainers;
    },
  });

  useEffect(() => {
    try {
      if (trainers.length > 0) {
        const currentTrain = trainers.find((trainer) => trainer._id === TrainerID);
        setCurrentTrainerName(currentTrain);
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


  useEffect(() => {
    const fetchUserMessages = async () => {
      if (selectedUser && currentTrainerName) {
        const userMessages = selectedUser.messages || [];
        const filteredMessages = userMessages.filter(
          (message) =>
            message.sender === currentTrainerName.email ||
            message.recipient === currentTrainerName.email
        );

        setMessages(filteredMessages);

        setSenderImage(currentTrainerName?.picture || ''); // Adjust the property based on your data structure
        setReceiverImage(selectedUser?.picture || ''); // Adjust the property based on your data structure
      }
    };

    fetchUserMessages();
  }, [selectedUser, currentTrainerName, users, trainers]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    try {
      if (!currentTrainerName || !currentTrainerName.email || !selectedUser || !selectedUser.email || !newMessage) {
        console.error('Sender ID, recipient ID, and text are required fields');
        return;
      }
      setIsLoading(true);
      const response = await fetch('http://localhost:4000/sendMessages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: currentTrainerName.email,
          recipient: selectedUser.email,
          text: newMessage,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        setMessages([...messages, { sender: currentTrainerName.email, recipient: selectedUser.email, text: newMessage, timeStamp: new Date() }]);
        setNewMessage('');
        setIsLoading(false);
      } else {
        console.error('Error sending message:', responseData.error);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (trainersQuery.isLoading) return <h1>Loading...</h1>;
  if (trainersQuery.isError)
    return <pre>{JSON.stringify(trainersQuery.error)}</pre>;

  return (
    <>
      <div className={`${`${styles.mainContainer}`}`} style={{ background: `url(${bg})` }}>
        <div className={`container ${styles.chatContainer}`}>
          <div className="row">
            <div className="col-lg-3 col-sm-12">
              <ul>
                <h1 className="text-light">Users</h1>
                {users.map((user) => (
                  <button
                    className={`${styles.usersNames} btn`}
                    onClick={() => setSelectedUser(user)}
                  >
                    <img className="btn btn-icon btn-pills d-inline" src={user.picture} /> {user.firstName} {user.lastName}
                  </button>
                ))}
              </ul>
            </div>
            <div className="col-lg-9 col-md-12 text-light">
              {selectedUser ? (
                <>
                  <div style={{ height: '400px', overflowY: 'scroll', border: '1px solid gray' }}>
                    <div className={`${styles.fixedbar} d-flex justify-content-between border-bottom p-4`}>
                      <div className="d-flex">
                        <img src={selectedUser.picture} className="avatar avatar-md-sm rounded-circle border shadow" alt />
                        <div className="overflow-hidden ms-3">
                          <a href="#" className="text-light mb-0 h6 d-block text-truncate">{selectedUser.firstName.toUpperCase()} {selectedUser.lastName.toUpperCase()}</a>
                          <small className="text-muted"><i className="mdi mdi-checkbox-blank-circle text-success on-off align-text-bottom" /> Online</small>
                        </div>
                      </div>
                    </div>
                    {messages.map((message) => (
                      <>
                        <li key={message._id} className={`list-unstyled ${styles.messagecontainer} ${message.sender === currentTrainerName.email ? "" : "chat-right"}`}>
                          <div className="d-inline-block">
                            <div className="d-flex chat-type mb-3">
                              <div className="position-relative">
                                <img src={message.sender === currentTrainerName.email ? senderImage : receiverImage} className="avatar avatar-md-sm rounded-circle border shadow" alt />
                              </div>
                              <div className="chat-msg ms-1" style={{ maxWidth: 500 }}>
                                <p className="text-muted small msg px-3 py-2 bg-light rounded mb-1">{message.text}</p>
                                <small className="text-muted msg-time"><i className="uil uil-clock-nine me-1" />{formatTimestamp(message.timeStamp)}</small>
                              </div>
                            </div>
                          </div>
                        </li>
                      </>
                    ))}
                  </div>
                  <form onSubmit={handleSendMessage} className="input-group" style={{ marginTop: '10px' }}>
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder={`Type your message to ${selectedUser.firstName}`}
                      className="col-10"
                    />
                    <button type="submit" className="col-2 btn btn-primary" disabled={isLoading}>
                      {isLoading ? (
                        <i className="fa fa-spinner fa-spin"></i> 
                      ) : (
                        <>
                        <i className="fa-regular fa-paper-plane"></i> Send
                        </>
                        )} 
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
    </>
  );
}
