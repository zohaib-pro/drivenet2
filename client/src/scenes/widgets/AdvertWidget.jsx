import { Button, Typography, useTheme, IconButton, Box } from "@mui/material";
import Center from "components/Center";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

const AdvertWidget = ({ image, title, date, description, onDelete }) => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const [showAlert, setShowAlert] = useState(false);

  const handleInterestClick = () => {
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 3000); // Hide the alert after 3 seconds
  };

  return (
    <WidgetWrapper>
      <Box width={'100%'}>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Upcoming Auto Event
        </Typography>
        {
          onDelete &&
          <IconButton onClick={onDelete}>
            <CloseIcon />
          </IconButton>
        }
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src={`http://localhost:3001/assets/${image}`}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main} fontWeight="500">{title}</Typography>
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
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          Interested
        </Button>
      </Center>
      {showAlert && (
        <Center>
          <Typography p={"1.25rem"} color="success.main">Event Interest Saved ! You'll be Notified when the Event will be Live.</Typography>
        </Center>
      )}
      </Box>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
