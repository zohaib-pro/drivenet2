import React from 'react';
import MessageIcon from "@mui/icons-material/Message";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { IconButton, Badge } from '@mui/material';

const MsgIcon = ({ views = 0 }) => {

  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const unreadMessages = useSelector((state) => state.unreadMessages);

  useEffect(() => {
    // Calculate total unread message count
    const totalUnreadCount = Object.values(unreadMessages).reduce(
      (acc, curr) => curr,
      0
    );
    setUnreadMessageCount(totalUnreadCount);
  }, [unreadMessages]);

  return (
    <IconButton component={Link} to="/chat">
      <Badge badgeContent={unreadMessageCount} color="error">
        <MessageIcon sx={{ fontSize: "25px" }} />
      </Badge>
    </IconButton>
  );
};

export default MsgIcon;
