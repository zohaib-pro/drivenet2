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
            Name   :  {seller?.firstName  + " " +seller?.lastName + (seller?._id==user._id?" (You) ":"")}
          </Typography>

          <Typography>
            Phone  :  {seller?.phone}
          </Typography>

          <Box display={'flex'} gap={1}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Call sx={{fontSize: 4}}/>}
            onClick={() => {
              // Handle contact action
              console.log('Contact button clicked');
            }}
            sx={{fontSize: 10}}
          >
            Contact
          </Button>
          <Button
            disabled={seller?._id == user?._id}
            variant="contained"
            color="primary"
            startIcon={<Chat />}
            onClick={onPressChat}
            sx={{fontSize: 10}}
          >
            Chat
          </Button>
          </Box>

          <Box mt={2} />

          <Link href={"http://localhost:3000/profile/"+seller?._id} target="_blank">View Profile</Link>
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


      {/* Display selected images */}
      {/* <Box mt={2}>
        <Typography variant="h6">Other Images:</Typography>
        <Box display="flex" alignItems="center">
          {
            Array.from(images).map((image, index) => (
              <Box key={index} mr={1}>
                <img
                  src={`http://localhost:3001/assets/${images[index]}`}
                  alt={`Image ${index}`}
                  width={100}
                  onClick={()=>{setBigImage(index)}}
                />
              </Box>
            ))}
        </Box>
      </Box> */}


      {/* <Box mt="0.5rem" display="flex" flexDirection="row" alignItems="center">
        <Box display="flex" flexDirection="row" alignItems="center">
          <IconButton onClick={patchLike}>
            {isLiked ? (
              <FavoriteOutlined sx={{ color: primary }} />
            ) : (
              <FavoriteBorderOutlined />
            )}
          </IconButton>
          <Typography>{likeCount}</Typography>
        </Box>
        <Box display="flex" flexDirection="row" alignItems="center">
          <IconButton onClick={() => setIsComments(!isComments)}>
            <ChatBubbleOutlineOutlined />
          </IconButton>
          <Typography>{comments.length}</Typography>
        </Box>
        <Box display="flex" flexDirection="row" alignItems="center">
          <IconButton>
            <ShareOutlined />
          </IconButton>
        </Box>
      </Box>
      {isComments && (
        <Box mt="1rem">
          <Divider />
          {commentData.map((comment, i) => (
            <Box key={`${name}-${i}`} display="flex" alignItems="center">
              <img
                width="20px"
                height="20px"
                alt="post"
                style={{ borderRadius: "50%" }}
                src={`http://localhost:3001/assets/${comment.image}`}
              />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                <strong>{comment.firstName}:</strong>
              </Typography>
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment.comment}
              </Typography>
              <Box pl={"1rem"} flexGrow={1}>
                <Divider />
              </Box>
            </Box>
          ))}

          <Divider />
          <Box mt="1rem">
            <TextField
              label="Add a comment"
              variant="outlined"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              disabled={!comment}
              onClick={handleCommentSubmit}
              sx={{ mt: "0.5rem" }}
            >
              Comment
            </Button>
          </Box>
        </Box> 
      )} */}
    </WidgetWrapper>
  );
};

export default SellerCard;
