import { Check, CheckCircle, Margin } from "@mui/icons-material";
import {
  Box,
  Typography,
  useMediaQuery,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Link,
  Divider,
} from "@mui/material";
import Center from "components/Center";
import ImageCarousel from "components/ImageCarousel";
import WidgetWrapper from "components/WidgetWrapper";
import WidgetWrapper2 from "components/WidgetWrapper2";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import Navbar from "scenes/navbarMarket";
import SearchAndCity from "scenes/navbarMarket/searchandcity";
import FiltersWidget from "scenes/widgets/FiltersWidget";
import VehicleAdWidgetGallery from "scenes/widgets/VehicleAdGalleryWidget";
import VehicleAdWidget from "scenes/widgets/VehicleAdWidget";

const LandingPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  //const { picturePath } = useSelector((state) => state.user);

  const sellVehicleItems = [
    "List your vehicle for sale",
    "Estimate the actual worth of your car",
    "Reach millions of users around the country",
  ];

  const communityItems = [
    "Interact with memebers of the community",
    "Share your thoughts on the page",
    "Discover car projects by different members of the community",
  ];

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      console.log(user?.firstName + " " + user?.lastName);
    }
  }, [user]);

  return (
    <Box>
      <Navbar
        onSearch={(value) => {
          alert(value);
        }}
      />
      <WidgetWrapper2 style={{ margin: 20 }}>
        <Box
          sx={{
            width: "100%",
            height: isNonMobileScreens ? "70vh" : "30vh",
            position: "relative",
          }}
        >
          <img
            style={{
              position: "absolute",
              alignSelf: "center",
              marginBottom: "1rem",
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
            src="http://localhost:3000/assets/drivenet_banner.png"
            alt="Drivenet Market"
          />

          <Box
            sx={{
              position: "absolute",
              background: "black",
              opacity: "0.5",
              width: "100%",
              height: "100%",
              borderRadius: "0.75rem",
            }}
          ></Box>

          <Box
            sx={{
              position: "absolute",
              top: "25%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            {(
              <Typography variant={isNonMobileScreens ? "h1" : "h4"} sx={{ color: "white", mb: 2 }}>
               {user
                ? `Welcome ${user.firstName} ${user.lastName} 👋`
                : 'Welcome Guest User 👋'}
              </Typography>
            )}
          </Box>


          <Box
            sx={{
              position: "absolute",
              top: "75%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <SearchAndCity />
          </Box>
        </Box>
      </WidgetWrapper2>

      <Typography
        variant="h3"
        sx={{ fontWeight: "bold", textAlign: "center", padding: 5 }}
      >
        Browse DriveNet and Discover new best Features
      </Typography>
      
      <Box pb={"2rem"} pl={"20rem"} pr={"20rem"} flexGrow={1}>
        <Divider sx={{ borderBottomWidth: 3, borderColor: '#b8b8b8' }} />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: isNonMobileScreens ? "row" : "column",
          justifyContent: "space-around",
          alignItems: "center",
          gap: isNonMobileScreens ? undefined : "5rem",
        }}
      >
        <WidgetWrapper
          height={"20rem"}
          width={isNonMobileScreens ? "40%" : "90%"}
        >
          <Box sx={{ padding: '1rem' }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "orange" }}
            >
              Sell your vehicle on DriveNet
            </Typography>
            <List>
              {sellVehicleItems.map((item, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <Check sx={{ color: "orange" }} />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>

            <Center>
              <Link
                to="/market/new/sell"
                style={{ textDecoration: "none", marginTop: "1.5rem" }}
              >
                <Button variant="contained" color="primary" size="large">
                  Sell Now
                </Button>
              </Link>
            </Center>
          </Box>
        </WidgetWrapper>

        <WidgetWrapper
          height={"20rem"}
          width={isNonMobileScreens ? "40%" : "90%"}
        >
          <Box sx={{ padding: '1rem' }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "orange" }}
            >
              Meet Car Enthusiasts on Community
            </Typography>
            <List>
              {communityItems.map((item, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <Check sx={{ color: "orange" }} />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>

            <Center>
              <Link
                to="/home"
                style={{ textDecoration: "none", marginTop: "1.5rem" }}
              >
                <Button variant="contained" color="primary" size="large">
                  Visit Community
                </Button>
              </Link>
            </Center>
          </Box>
        </WidgetWrapper>
      </Box>
      <ImageCarousel isNonMobileScreens={isNonMobileScreens} />
      <Box
        width="100%"
        padding="1rem 2%"
        display={"flex"}
        flexDirection={isNonMobileScreens ? "row" : "column"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={"20%"}>
          <FiltersWidget isNonMobileScreen={isNonMobileScreens} />
        </Box>

        <Box flexBasis={"80%"}>
          <VehicleAdWidgetGallery heading={"Listed Recently for sale!"} />
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;
