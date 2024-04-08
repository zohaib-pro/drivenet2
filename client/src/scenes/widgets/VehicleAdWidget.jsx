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

import DetailsGrid from "components/DetailsGrid";

import { Link } from 'react-router-dom';
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  LocationOnOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import WidgetWrapper from "components/WidgetWrapper";
import Friend from "components/Friend";
import { setPost } from "state";
import { useDispatch, useSelector } from "react-redux";

const VehicleAdWidget = ({
  vehicle, redirectTo
}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  // const isLiked = Boolean(likes[loggedInUserId]);
  // const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  return (
    <WidgetWrapper >
      <Link to={redirectTo} style={{ textDecoration: 'none', color: 'inherit' }}>
        {(
          <img
            width="100%"
            height="200rem"
            alt="post"
            style={{ borderRadius: "0.75rem", objectFit: "cover", marginTop: "0.75rem" }}
            src={`http://localhost:3001/assets/${vehicle.images[0]}`}
          />
        )}

        <Typography variant="h4" fontWeight={500}
          mt={1}
        >
          PKR {vehicle.price}
        </Typography>
        <Typography variant="h5" fontWeight={500}
          mb={1}
        >
          {vehicle.title}
        </Typography>

        <DetailsGrid data={{ year: vehicle.year, kms: vehicle.mileage, fuelAvg: 22, fuel: 'petrol' }} />

        <Box mt="0.5rem" mb="0.5rem" display="flex" flexDirection="row" gap={'0.5rem'} >
          <LocationOnOutlined />
          <Typography>{vehicle.location}</Typography>
          <Typography>|</Typography>
          <Typography>2 days ago</Typography>
        </Box>
      </Link>
    </WidgetWrapper>
  );
};

export default VehicleAdWidget;
