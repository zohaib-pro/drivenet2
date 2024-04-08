import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVehicleAds } from "state";

import { useMediaQuery,Typography, Box } from "@mui/material";
import Center from "components/Center";
import VehicleAdWidget from "./VehicleAdWidget";

const VehicleAdWidgetGallery = ({ heading, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.vehicleAds);
  const token = useSelector((state) => state.token);

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getVehicleAds = async () => {
    const response = await fetch("http://localhost:3001/market", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("something....");
    const data = await response.json();
    console.log(data);
    dispatch(setVehicleAds({ vehicleAds: data }));
  };

  useEffect(() => {
    getVehicleAds();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Reverse the order of posts array
  const reversedPosts = posts;

  return (
    <>
      {!reversedPosts || reversedPosts.length === 0 ? (
        <Center>

          <Typography variant="h3" color="textSecondary">
            No Posts
          </Typography>
        </Center>
      ) : (
        <Box
          width="100%"
          padding="2rem 6%">
          <Typography variant="h4" fontWeight={500}
            mt={1} mb={1}
          >
            {heading}
          </Typography>
          <Box
            display="grid"
            gridTemplateColumns={`repeat(auto-fit, minmax(calc(${isNonMobileScreens? '25%': '50%'} - 0.5rem), 1fr))`}
            gap="0.5rem"
          >
            {reversedPosts.map((item) => (
              <VehicleAdWidget
                key={item.title} // Add a unique key for each item in the map function
                vehicle={item}
                redirectTo={'/market/' + item._id}
              />
            ))}

          </Box>
        </Box>

      )}
    </>
  );
};

export default VehicleAdWidgetGallery;
