import React, { useState } from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Register from "./Register";
import Login from "./Login";
import Center from "components/Center";

const LoginPage = () => {
  const [login, setLogin] = useState(true);
  const [register, setRegister] = useState(false);
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          DriveNet Market
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "45%" : "93%"}
        p="3rem"
        m="2rem auto"
        borderRadius="2rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Center><Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to DriveNet Market and Community, for Car Enthusiasts!
        </Typography></Center>
        
        {login && (
          <Login
            handleRegister={() => {
              setRegister(true);
              setLogin(false);
            }}
          />
        )}
        {register && (
          <Register
            handleLogin={() => {
              setLogin(true);
              setRegister(false);
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default LoginPage;
