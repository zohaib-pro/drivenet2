import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import Navbar from "scenes/navbar";
import "./Chat.css";
import { userChats } from "../../api/ChatRequests";

import { useSelector } from "react-redux";

import WidgetWrapper from "components/WidgetWrapper";
import Conversation from "components/Conversation";
import ChatBox from "components/ChatBox";
import { io } from "socket.io-client";

const ChatPage = () => {
  const socket = useRef;
  const user = useSelector((state) => state.user);
  //console.log(user);

  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);

  // Get the chat in chat section
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
      console.log(onlineUsers);
    });
  }, [user]);

  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data);
      setReceivedMessage(data);
    });
  }, []);

  
  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };


  return (
    <Box>
      <Navbar />

      <div className="Chat">
        {/* Left Side */}
        <div className="Left-side-chat">
          {/* Left side content */}
          <div className="Chat-container">
            <WidgetWrapper>
              <h2>Chats</h2>
              <div className="Chat-list">
                {/* Render your chat list here */}
                {chats.map((chat) => (
                  <div
                    onClick={() => {
                      setCurrentChat(chat);
                    }}
                  >
                    <Conversation data={chat} currentUser={user._id} online={checkOnlineStatus(chat)} />
                  </div>
                ))}
              </div>
            </WidgetWrapper>
          </div>
        </div>

        {/* Right Side */}
        <div className="Right-side-chat">
            <ChatBox
              chat={currentChat}
              currentUser={user._id}
              setSendMessage={setSendMessage}
              receivedMessage={receivedMessage}
            />
        </div>
      </div>
    </Box>
  );
};

export default ChatPage;
