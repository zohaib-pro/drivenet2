// ChatPage.jsx
import React, { useEffect, useRef, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import Navbar from "scenes/navbar";
import "./Chat.css";
import { userChats } from "../../api/ChatRequests";

import { useSelector } from "react-redux";
import { io } from "socket.io-client";

import ChatParent from "./ChatParent";

const ChatPage = () => {
  const socket = useRef();
  const user = useSelector((state) => state.user);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [isChatClicked, setIsChatClicked] = useState(false);
  const isMobileScreens = useMediaQuery("(min-width:768px)");

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

  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      setReceivedMessage(data);
    });
  }, []);

  return (
    <Box>
      <Navbar />
      <ChatParent
        chats={chats}
        user={user}
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
        setIsChatClicked={setIsChatClicked}
        isMobileScreens={isMobileScreens}
        onlineUsers={onlineUsers}
        setSendMessage={setSendMessage}
        receivedMessage={receivedMessage}
      />
    </Box>
  );
};

export default ChatPage;
