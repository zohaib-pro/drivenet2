import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Center from "components/Center";
import Navbar from "scenes/navbar";
import EditProfileForm from "./EditProfileForm";

const ProfilePage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  // Get token and user ID from Redux state
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);

  return (
    <Box>
      <Navbar />

      <Box
        width={isNonMobileScreens ? "45%" : "93%"}
        p="3rem"
        m="2rem auto"
        borderRadius="2rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Center>
          <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to DriveNet. Here you can Edit your Profile Details!
          </Typography>
        </Center>
        
        <EditProfileForm
          userId={loggedInUserId}
          token={token}
        />
      </Box>
    </Box>
  );
};

export default ProfilePage;
