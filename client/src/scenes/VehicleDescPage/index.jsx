import { Box, Divider, Typography, useMediaQuery, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbarMarket";
import ImageGallery from "components/ImageGallery"

import { useEffect, useState } from "react";
import WidgetWrapper from "components/WidgetWrapper";
import SellerCard from "components/SellerCard";

import { LocationOnOutlined } from "@mui/icons-material";
import IconBtn from "components/IconBtn";
import DetailsGrid from "components/DetailsGrid";
import IssueCreationComponent from "./IssueCreator";

const VehicleDescPage = () => {

  const [vehicle, setVehicle] = useState(null);
  const { vehicleAdId } = useParams();
  const token = useSelector((state) => state.token);
  const { _id } = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getVehicleDetails = async () => {
    const response = await fetch(`http://localhost:3001/market/${vehicleAdId}`, {
      method: "GET",
    });
    const data = await response.json();
    setVehicle(data);
  };

  useEffect(() => {
    getVehicleDetails();
  }, [])


  return (
    vehicle?
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "60%" : undefined}>
          {(vehicle && vehicle.images && <ImageGallery images={vehicle.images} />)}
          <Box>
            <Typography variant="h4" fontWeight={500}>
              Details about Ad
            </Typography>
            <DetailsGrid data={{ year: vehicle.year, kms: vehicle.mileage, fuelAvg: 22, fuel: 'petrol' }} />
            
          </Box>
        </Box>

        <Box
          flexBasis={isNonMobileScreens ? "40%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {vehicle &&
            <WidgetWrapper m="1rem 0">
              <Box>
                <Typography variant="h4" fontWeight={500}>
                  {vehicle.title}
                </Typography>

                <Typography variant="h3" color={'blue'} fontWeight={500}
                  mb={2} mt={2}
                >
                  PKR {vehicle.price}
                </Typography>

                <Box mt="0.5rem" mb="0.5rem" display="flex" flexDirection="row" gap={'0.5rem'}>
                  <LocationOnOutlined />
                  <Typography>{vehicle.location}</Typography>
                  <Typography>|</Typography>
                  <Typography>2 days ago</Typography>
                </Box>

                <Divider />

                <Typography variant="p" fontWeight={500}>
                  Estimate the worth of this vehicle using our AI model
                </Typography>
                <Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '60%',
                      float: 'left',
                      borderRadius: '20px', // Adjust the border radius as needed
                      border: '1px solid #BDBDBD', // Optionally, add a border for outline
                      padding: '8px 12px', // Adjust padding as needed
                      backgroundColor: '#F5F5F5', // Optionally, set background color
                    }}
                  >
                    <Typography  >
                      00000 - 00000
                    </Typography>
                    <Typography >
                      PKR
                    </Typography>
                  </Box>
                  <img
                    width="50px"
                    height="50px"
                    alt="post"
                    style={{ objectFit: "cover", marginTop: "1rem", marginLeft: "-1.4rem" }}
                    src={`http://localhost:3000/icons/price_tag.png`}
                  />
                  <IconBtn text="Estimate" style={{ float: 'right', color: 'white' }}
                    icon="http://localhost:3000/icons/ai.png"
                    onPress={() => { alert("comming soon!") }}
                  />
                </Box>

                <SellerCard seller={{ name: "Zohaib Test", phone: '+92 307 5299036', image: 'zohaib wallpaper 2.jpeg' }} />

                <IssueCreationComponent vehicleAdId={vehicleAdId} userId={_id} />
              </Box>
            </WidgetWrapper>
          }
        </Box>
      </Box>
      
    </Box>
    : <Box></Box>
  );
};

export default VehicleDescPage;