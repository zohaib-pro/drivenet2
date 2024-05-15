import { useState, useEffect } from "react";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
  TextField,
  Link,
  Button,
} from "@mui/material";
import {
  Call,
  CallIcon,
  Chat,
  ChatBubble
} from "@mui/icons-material";
import WidgetWrapper from "components/WidgetWrapper";
import Friend from "components/Friend";
import { setPost } from "state";
import { useDispatch, useSelector } from "react-redux";

const SellerCard = ({
  seller,
  user,
  onPressChat
}) => {

  return (
    <WidgetWrapper m="1rem 0">

      <Box display={'flex'} justifyContent={'space-between'}>
        <Box >
          <Typography variant="h5" color={'orange'}>
            DriveNet Seller Card
          </Typography>
          <Typography>
            Name   :  {seller?.firstName + " " + seller?.lastName + (seller?._id == user?._id ? " (You) " : "")}
          </Typography>

          <Typography>
            Phone  :  {seller?.phone}
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
              onClick={onPressChat}
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
