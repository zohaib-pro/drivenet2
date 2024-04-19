import { Box, Typography, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbarMarket";
import FiltersWidget from "scenes/widgets/FiltersWidget";
import VehicleAdWidgetGallery from "scenes/widgets/VehicleAdGalleryWidget";
import VehicleAdWidget from "scenes/widgets/VehicleAdWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar onSearch={(value) => { alert(value) }} />
      <Box
        width="100%"
        padding="1rem 2%"
        display={"flex"}
        flexDirection={isNonMobileScreens ? 'row' : 'column'}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={"20%"}>
          <FiltersWidget isNonMobileScreen={isNonMobileScreens}/>
        </Box>

        <Box flexBasis={"80%"}>
          <VehicleAdWidgetGallery heading={"Listed Recently for sale!"} />
        </Box>
      </Box>

    </Box>
  );
};

export default HomePage;
