import React, { useEffect, useState } from "react";
import { useTheme, Divider } from "@mui/material";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { addMessage, getMessages } from "../../src/api/MessageRequests";
import "./ChatBox.css";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import VehicleAdWidget from "scenes/widgets/VehicleAdWidget";

const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage, isModal, vehicleData }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { palette } = useTheme();

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  const token = useSelector((state) => state.token);

  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);

    const getUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    };

    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) {
      return;
    }
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };
    const receiverId = chat.members.find((id) => id !== currentUser);
    setSendMessage({ ...message, receiverId });
    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage("");

      // If this is the first message in the chat, and vehicleData is available, send it with the message
      if (messages.length === 0 && vehicleData) {
        setSendMessage({
          senderId: currentUser,
          text: vehicleData.title, // Message text is the title of the vehicle
          chatId: chat._id,
          vehicleData: vehicleData // Pass vehicle data here
        });
      }
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const scroll = useRef();

  return (
    <div className={isModal ? "ChatBox-container-modal" : "ChatBox-container"}
      style={{
        backgroundColor: palette.background.alt,
        borderRadius: "0.75rem",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
      }}>
      {chat ? (
        <>
          <div className="chat-header">
            <div className="follower">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={userData?.picturePath ? `http://localhost:3001/assets/${userData.picturePath}` : "/assets/kunwar-b.jpg"}
                  alt="Profile" className="followerImage" style={{ width: "50px", height: "50px" }} />
                {userData && (
                  <div className="name" style={{ fontSize: "0.9rem", padding: '1rem' }}>
                    <span>{userData.firstName} {userData.lastName}</span>
                  </div>
                )}
              </div>
            </div>
            <Divider />
          </div>

          <div className={isModal ? "chat-body-modal" : "chat-body"}>
            {messages.map((message, index) => (
              <div key={index} ref={scroll} className={message.senderId === currentUser ? "message own" : "message"}>
                {index === 0 && vehicleData && (
                  <VehicleAdWidget vehicle={vehicleData} />
                )}
                <span>{message.text}</span> <span>{format(message.createdAt)}</span>
              </div>
            ))}
          </div>

          <div className="chat-sender">
            <div>+</div>
            <InputEmoji value={newMessage} onChange={handleChange} />
            <button style={{
              padding: "0.65rem",
              backgroundColor: palette.primary.main,
              color: palette.background.default,
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
              onClick={handleSend}>Send</button>
          </div>
        </>
      ) : (
        <span className="chatbox-empty-message">Tap on a chat to start conversation...</span>
      )}
    </div>
  );
};

export default ChatBox;
