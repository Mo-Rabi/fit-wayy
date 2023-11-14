import React, { useState, useEffect } from "react";
import styles from './ChatOfUser.module.css';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import bg from "../assets/images/gym/bg2.jpg";

export default function ChatOfUser() {
  const [users, setUsers] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainer, setselectedTrainer] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [senderImage, setSenderImage] = useState('');
  const [receiverImage, setReceiverImage] = useState('');

  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = token;
  const { id: UserID } = jwtDecode(token);

  const usersQuery = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      let { data } = await axios.get("http://localhost:4000/users");
      setUsers(data.viewUsers);
      return data.viewUsers;
    },
  });

  useEffect(() => {
    if (selectedTrainer) {
      setMessages([]);
      setSenderImage(''); // Clear sender image when a new trainer is selected
    }
  }, [selectedTrainer]);

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
      if (users.length > 0) {
        const currentUse = users.find((user) => user._id === UserID);
        setCurrentUser(currentUse);
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


  useEffect(() => {
    const fetchTrainerMessages = async () => {
      if (selectedTrainer && currentUser) {
        const trainerMessages = selectedTrainer.messages || [];
        const filteredMessages = trainerMessages.filter(
          (message) =>
            (message.sender === currentUser.email && message.recipient === selectedTrainer.email) ||
            (message.sender === selectedTrainer.email && message.recipient === currentUser.email)
        );
        console.log(filteredMessages);
        setMessages(filteredMessages);
  
        setSenderImage(currentUser?.picture || '');
        setReceiverImage(selectedTrainer?.picture || '');
      }
    };
  
    fetchTrainerMessages();
  }, [selectedTrainer, currentUser, users, trainers]);
  
  const handleSendMessage = async (e) => {
    e.preventDefault();
  
    try {
      if (!currentUser || !currentUser.email || !selectedTrainer || !selectedTrainer.email || !newMessage) {
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
          sender: currentUser.email,
          recipient: selectedTrainer.email,
          text: newMessage,
        }),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        setMessages([...messages, { sender: currentUser.email, recipient: selectedTrainer.email, text: newMessage, timeStamp: new Date() }]);
        setNewMessage('');
        setIsLoading(false);
      } else {
        const responseData = await response.json();
        console.error('Error sending message:', responseData.error);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
    }
  };
  

  if (usersQuery.isLoading) return <h1>Loading...</h1>;
  if (usersQuery.isError)
    return <pre>{JSON.stringify(usersQuery.error)}</pre>;

  return (
    <div className={`${styles.mainContainer}`} style={{ background: `url(${bg})` }}>
      <div className={`container mt-5 ${styles.chatContainer}`}>
        <div className="row">
        <div className="col-lg-3 col-sm-12">
          <ul>
                <h1 className="text-light">Trainers</h1>
                {trainers.map((trainer) => (
                  <button
                    className={`${styles.usersNames} btn`}
                    onClick={() => setselectedTrainer(trainer)}
                  >
                    <img className="btn btn-icon btn-pills d-inline" src={trainer.picture} /> {trainer.firstName} {trainer.lastName}
                  </button>
                ))}
              </ul>
          </div>
          <div className="col-9 text-light">
            {selectedTrainer ? (
              <>
                <div style={{ height: '400px', overflowY: 'scroll', border: '1px solid gray' }}>
                    <div className={`${styles.fixedbar} d-flex justify-content-between border-bottom p-4`}>
                      <div className="d-flex ">
                        <img src={selectedTrainer.picture} className="avatar avatar-md-sm rounded-circle border shadow" alt />
                        <div className="overflow-hidden ms-3">
                          <a href="#" className="text-light mb-0 h6 d-block text-truncate">{selectedTrainer.firstName.toUpperCase()} {selectedTrainer.lastName.toUpperCase()}</a>
                          <small className="text-muted"><i className="mdi mdi-checkbox-blank-circle text-success on-off align-text-bottom" /> Online</small>
                        </div>
                      </div>
                    </div>
                  {messages.map((message) => (
                    <>
                    <li key={message._id} className={`list-unstyled ${styles.messagecontainer} ${message.sender === currentUser.email ? "" : "chat-right"}`}>
                      <div className="d-inline-block">
                        <div className="d-flex chat-type mb-3">
                          <div className="position-relative">
                            <img src={message.sender === currentUser.email ? senderImage : receiverImage} className="avatar avatar-md-sm rounded-circle border shadow" alt />
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
                    placeholder={`Type your message to ${selectedTrainer.firstName}`}
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
              <h5>Select a trainer to start chatting</h5>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
