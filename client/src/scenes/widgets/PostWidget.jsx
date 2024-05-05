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

const PostWidget = ({
  postId,
  postUserId,
  name,
  title,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
  createdAt,
  firstName,
  lastName,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [comment, setComment] = useState("");
  const [commentData, setCommentData] = useState([]);
  const [likeCount, setLikeCount] = useState(Object.keys(likes).length);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const [isLiked, setIsLiked] = useState(Boolean(likes[loggedInUserId]));

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  useEffect(() => {
    const fetchCommentData = async () => {
      try {
        const commentDataPromises = comments.map(async (comment) => {
          const response = await fetch(
            `http://localhost:3001/users/${comment.userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
          const userData = await response.json();
          return {
            image: userData.picturePath,
            firstName: userData.firstName,
            lastName: userData.lastName,
            comment: comment.comment,
          };
        });
        const resolvedCommentData = await Promise.all(commentDataPromises);
        setCommentData(resolvedCommentData);
      } catch (error) {
        console.error("Error fetching comment data:", error);
      }
    };
    fetchCommentData();
  }, [comments, token]);

  const patchLike = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/posts/${postId}/like`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: loggedInUserId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to like the post");
      }

      const updatedPost = await response.json();
      setLikeCount(Object.keys(updatedPost.likes).length);
      setIsLiked(Boolean(updatedPost.likes[loggedInUserId]));
      dispatch(setPost({ post: updatedPost }));
    } catch (error) {
      console.error("Error patching like:", error);
    }
  };

  const handleCommentSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/posts/${postId}/comment`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: loggedInUserId, comment }),
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to add comment");
      }
  
      const updatedPost = await response.json();
/*   
      // Update like count
      setLikeCount(Object.keys(updatedPost.likes).length);
      // Update isLiked state
      setIsLiked(Boolean(updatedPost.likes[loggedInUserId])); */
      // Update post data in Redux store
      dispatch(setPost({ post: updatedPost }));
  
/*       // Update comment data with the newly added comment
      const newCommentData = [
        ...commentData,
        {
          image: userPicturePath, // Use current user's picture
          firstName: firstName, // Use current user's first name
          lastName: lastName, // Use current user's last name
          comment: comment, // New comment text
        },
      ]; */
      //setCommentData(newCommentData);
  
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  

  // Format the createdAt date
  const formattedDate = new Date(createdAt).toLocaleString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <WidgetWrapper m="1rem 0">
      <Friend
        friendId={postUserId}
        name={`${firstName} ${lastName}`}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Box display="flex" flexDirection="column">
        <Typography
          pt={"1rem"}
          variant="h5"
          color={main}
          sx={{ fontWeight: "bold" }}
        >
          {title || "Placeholder Title"}
        </Typography>
        <Typography color={main} sx={{ mt: "1rem" }}>
          {description}
        </Typography>
        {picturePath && (
          <img
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={`http://localhost:3001/assets/${picturePath}`}
          />
        )}
        <Box
          mt="0.5rem"
          display="flex"
          flexDirection="row"
          justifyContent="space-between" // Align date to the right side
          alignItems="center"
        >
          <Box display="flex" flexDirection="row" alignItems="center">
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
              <Typography>{commentData.length}</Typography>
            </Box>
            <Box display="flex" flexDirection="row" alignItems="center">
              <IconButton>
                <ShareOutlined />
              </IconButton>
            </Box>
          </Box>
          <Typography variant="caption" color={main}>
            {formattedDate} {/* Display the formatted date */}
          </Typography>
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
        )}
      </Box>
    </WidgetWrapper>
  );
};

export default PostWidget;
