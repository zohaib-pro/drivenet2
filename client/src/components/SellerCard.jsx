import { useState } from "react";
import {
  Box,
  Typography,
  Link,
  Button,
} from "@mui/material";
import {
  Call,
  Chat,
} from "@mui/icons-material";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";

const SellerCard = ({
  seller,
  user,
  onPressChat
}) => {
  const token = useSelector((state) => state.token);

  const createChat = async () => {
    try {
      const chatResponse = await fetch("http://localhost:3001/chat", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ senderId: user?._id, receiverId: seller?._id }),
      });

      if (!chatResponse.ok) {
        throw new Error("Failed to create chat");
      }
      // Chat created successfully, now open the modal
      onPressChat();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <WidgetWrapper m="1rem 0">
      <Box display={'flex'} justifyContent={'space-between'}>
        <Box>
          <Typography variant="h5" color={'orange'}>
            DriveNet Seller Card
          </Typography>
          <Typography>
            Name : {seller?.firstName + " " + seller?.lastName + (seller?._id == user?._id ? " (You) " : "")}
          </Typography>
          <Typography>
            Phone : {seller?.phone}
          </Typography>
          <Box display={'flex'} gap={1}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Call sx={{ fontSize: 4 }} />}
              onClick={() => {
                // Handle contact action
                console.log('Contact button clicked');
              }}
              sx={{ fontSize: 10 }}
            >
              Contact
            </Button>
            <Button
              disabled={seller?._id == user?._id}
              variant="contained"
              color="primary"
              startIcon={<Chat />}
              onClick={createChat}
              sx={{ fontSize: 10 }}
            >
              Chat
            </Button>
          </Box>
          <Box mt={2} />
          <Link href={"http://localhost:3000/profile/" + seller?._id} target="_blank">View Profile</Link>
        </Box>
        <Box>
          <img
            src={`http://localhost:3001/assets/${seller?.picturePath}`}
            alt={`Image `}
            width={80}
            height={100}
            style={{ borderRadius: "0.75rem", objectFit: 'cover' }}
          />
        </Box>
      </Box>
    </WidgetWrapper>
  );
};

export default SellerCard;
