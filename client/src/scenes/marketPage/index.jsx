import { Box, Typography, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbarMarket";
import VehicleAdWidgetGallery from "scenes/widgets/VehicleAdGalleryWidget";
import VehicleAdWidget from "scenes/widgets/VehicleAdWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar />
      <VehicleAdWidgetGallery heading={"Listed Recently for sale!"}/>
    </Box>
  );
};

export default HomePage;
