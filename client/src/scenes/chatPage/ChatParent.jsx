// ChatParent.jsx
import React, { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@mui/material";
import "./Chat.css";
import { userChats } from "../../api/ChatRequests";

import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import Conversation from "components/Conversation";
import ChatBox from "components/ChatBox";
import WidgetWrapper from "components/WidgetWrapper";
import { json } from "react-router-dom";


const ChatParent = ({isModal, chatWith, vehicleData}) => {
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
        if (chatWith){
          const targetChat = data.find(item=>item.members[0] == chatWith || item.members[1] == chatWith);
          if (targetChat){
            setCurrentChat(targetChat);
            setIsChatClicked(true);
          }
        }
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

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <div className="Chat">
      {/* Left Side */}
      <div className={`Left-side-chat ${isChatClicked && !isMobileScreens ? 'hide' : ''}`}>
        <div className={isModal? "Chat-container-modal" : "Chat-container"}>
          <WidgetWrapper>
            <h2>Chats</h2>
            <div className="Chat-list">
              {chats.map((chat) => (
                <div
                  key={chat._id}
                  onClick={() => {
                    setCurrentChat(chat);
                    setIsChatClicked(true);
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
      <div className={`Right-side-chat ${!isMobileScreens && !isChatClicked ? 'hide' : 'show'}`}>
        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
          isModal={isModal}
          vehicleData={vehicleData} // Pass vehicleData here
        />
      </div>
    </div>
  );
};

export default ChatParent;
