// ChatPage.jsx
import React from "react";
import { Box } from "@mui/material";
import Navbar from "scenes/navbar";
import "./Chat.css";


import ChatParent from "./ChatParent";

const ChatPage = () => {
  return (
    <Box>
      <Navbar />
      <ChatParent />
    </Box>
  );
};

export default ChatPage;
