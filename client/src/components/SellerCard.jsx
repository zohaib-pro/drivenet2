import { useState, useEffect } from "react";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
  TextField,
  Button,
} from "@mui/material";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import WidgetWrapper from "components/WidgetWrapper";
import Friend from "components/Friend";
import { setPost } from "state";
import { useDispatch, useSelector } from "react-redux";

const SellerCard = ({
  seller
}) => {

  return (
    <WidgetWrapper m="1rem 0">

      <Typography variant="h5" color={'orange'}>
        DriveNet Seller Card
      </Typography>

      <Typography>
        Name   :  {seller.name}

      </Typography>

      <Typography>
        Phone  :  {seller.phone}
      </Typography>

      <img
        src={`http://localhost:3001/assets/${seller.image}`}
        alt={`Image `}
        width={100}
        style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}

      />

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
