import { Button, Typography, useTheme, IconButton, Box } from "@mui/material";
import Center from "components/Center";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";

const AdvertWidget = ({
  image,
  title,
  date,
  description,
  onDelete,
  eventId,
}) => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);

  const [interested, setInterested] = useState(false); // State to track if user is interested

  const handleInterestClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/events/${eventId}/interest`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Error updating interest status: ${response.statusText}`
        );
      }

      const data = await response.json();

      // Update the interested state based on the response data
      setInterested(data.interested);
    } catch (error) {
      console.error("Error updating interest status:", error);
    }
  };

  return (
    <WidgetWrapper>
      <Box width={'100%'}>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Upcoming Auto Event
        </Typography>
        {onDelete && (
          <IconButton onClick={onDelete}>
            <CloseIcon />
          </IconButton>
        )}
      </FlexBetween>
      <img
        width="300px"
        height="auto"
        alt="advert"
        src={`http://localhost:3001/assets/${image}`}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main} fontWeight="500">
          {title}
        </Typography>
        <Typography color={medium}>{date}</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        {description}
      </Typography>
      <Center>
        <Button
          onClick={handleInterestClick}
          sx={{
            color: palette.background.alt,
            backgroundColor: interested
              ? palette.success.main
              : palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          {interested ? "Interested" : "Interest"}
        </Button>
      </Center>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
