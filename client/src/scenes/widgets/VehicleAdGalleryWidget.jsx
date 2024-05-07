import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVehicleAds, setVehicleAdsAll } from "state";

import { useMediaQuery,Typography, Box } from "@mui/material";
import Center from "components/Center";
import VehicleAdWidget from "./VehicleAdWidget";

const VehicleAdWidgetGallery = ({ heading, isProfile = false, isAdmin = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.vehicleAds);
  const token = useSelector((state) => state.token);
  const isFilterApplied = useSelector(state=>state.isFilterApplied);
  const search = useSelector(state=>state.search);

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const url = "http://localhost:3001/market"+(isAdmin?"/all": "");
  const getVehicleAds = async () => {
    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    console.log(data);
    dispatch(setVehicleAds({ vehicleAds: data }));
    dispatch(setVehicleAdsAll({ vehicleAdsAll: data }));
  };

  useEffect(() => {
    getVehicleAds();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Reverse the order of posts array
  const vehicleAds = posts;

  return (
    <>
      {!vehicleAds || vehicleAds.length === 0 ? (
        <Center>

          
          <Typography variant="h3" color="textSecondary">
            {
              isFilterApplied? 
                "No Vehicles based on current filters!":   
                search? `No results found for '${search}'` : "No Vehicles Listed for sale yet!"
            }
          </Typography>
        </Center>
      ) : (
        <Box
          width="100%"
          padding="1rem 2%">
          <Typography variant="h4" fontWeight={500}
           mb={1}
          >
            {heading}
          </Typography>
          <Box
            display="grid"
            style={{
              gridTemplateColumns: `repeat(auto-fill, minmax(${isNonMobileScreens? "30%": "100%"}, 1fr))`,
              gap: '0.5rem'
            }}
          >
            {vehicleAds.map((item) => (
              <VehicleAdWidget
                isAdmin={isAdmin}
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
