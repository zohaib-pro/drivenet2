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
import MagnifiableImage from "./MagnifiableImage";

const ImageGallery = ({
  images
}) => {

  const [bigImage, setBigImage] = useState(0);
  const { palette } = useTheme();


  return (
    <WidgetWrapper m="1rem 0">
      {(
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${images[bigImage]}`}
        />
        // <MagnifiableImage imageUrl={`http://localhost:3001/assets/${images[bigImage]}`}/>
      )}

      {/* Display selected images */}
      <Box mt={2}>
        <Typography variant="h6">Other Images:</Typography>
        <Box display="flex" alignItems="center" width={'100%'}>
          {
            Array.from(images).map((image, index) => (
              index < 3 ? 
              <Box key={index} mr={1}>
                <img
                  src={`http://localhost:3001/assets/${images[index]}`}
                  alt={`Image ${index}`}
                  width={100}
                  onClick={()=>{setBigImage(index)}}
                  style={index == bigImage? {border: '2px solid blue', borderRadius: '0.25rem', padding: '0.1rem'}:{}}
                />
              </Box>:
              <Box></Box>
            ))}
        </Box>
      </Box>
    </WidgetWrapper>
  );
};

export default ImageGallery;
