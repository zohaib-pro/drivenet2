import React, { useEffect, useState } from "react";
import { useTheme, Divider } from "@mui/material";
import { useSelector } from "react-redux";

import { useRef } from "react";
import { addMessage, getMessages } from "../../src/api/MessageRequests";
import "./ChatBox.css";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";

const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage, isModal }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { palette } = useTheme();

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  const token = useSelector((state) => state.token);
  // fetching data for header
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
        console.log(data.firstName + " " + data.lastName);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    };

    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  // fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        console.log(data);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat]);

  // Send Message
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
    // send message to socket server
    setSendMessage({ ...message, receiverId });
    // send message to database
    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch {
      console.log("error");
    }
  };

  // Receive Message from parent component
  useEffect(() => {
    console.log("Message Arrived: ", receivedMessage);
    if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);

  // Always scroll to last Message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const scroll = useRef();
  const imageRef = useRef();
  return (
    <>
      <div
        className={isModal? "ChatBox-container-modal" : "ChatBox-container"}
        style={{
          backgroundColor: palette.background.alt,
          borderRadius: "0.75rem",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Add drop shadow
        }}
      >
        {chat ? (
          <>
            {/* chat-header */}
            <div className="chat-header">
              <div className="follower">
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <img
                    src={
                      userData?.picturePath
                        ? "http://localhost:3001/assets/" + userData.picturePath
                        : "/assets/kunwar-b.jpg"
                    }
                    alt="Profile"
                    className="followerImage"
                    style={{ width: "50px", height: "50px" }}
                  />
                  {userData && (
                    <div className="name" style={{ fontSize: "0.9rem", padding: '1rem' }}>
                      <span>
                        {userData.firstName} {userData.lastName}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <Divider />
            </div>

            {/* chat-body */}
            <div className={isModal? "chat-body-modal": "chat-body"}>
              {messages.map((message) => (
                <>
                  <div
                    ref={scroll}
                    className={
                      message.senderId === currentUser
                        ? "message own"
                        : "message"
                    }
                  >
                    <span>{message.text}</span>{" "}
                    <span>{format(message.createdAt)}</span>
                  </div>
                </>
              ))}
            </div>

            {/* chat-sender */}
            <div className="chat-sender">
              <div>+</div>
              <InputEmoji value={newMessage} onChange={handleChange} />
              <button
                style={{
                  padding: "0.65rem",
                  backgroundColor: palette.primary.main,
                  color: palette.background.default,
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
                onClick={handleSend}
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
        )}
      </div>
    </>
  );
};

export default ChatBox;
