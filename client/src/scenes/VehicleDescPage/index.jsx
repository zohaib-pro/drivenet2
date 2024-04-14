import { Alert, Box, Divider, Typography, useMediaQuery, Grid, Modal } from "@mui/material";
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
import { useGetData } from "hooks/apiHook";
import ChatPage from "scenes/chatPage/Chat";
import ChatParent from "scenes/chatPage/ChatParent";

const VehicleDescPage = () => {

  const [open, setOpen] = useState(false);
    

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [vehicle, setVehicle] = useState(null);
  const [prediction, setPrediction] = useState({
    upper_limit: 0,
    lower_limit: 0,
    predicted_price: 0
  });
  const { vehicleAdId } = useParams();
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const {data:sellerData, getData:getSellerData} = useGetData(undefined, token, undefined);


  async function fetchImageAsBlob(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const contentType = response.headers.get('Content-Type');
    const extension = contentType.split('/')[1];
    
    const blob = await response.blob();
    return { blob, extension };
  }

  function formDataToJson(formData) {
    const json = {};
    
    formData.forEach((value, key) => {
      // Check if key already exists
      if (json[key]) {
        if (!Array.isArray(json[key])) {
          // Convert existing value to an array
          json[key] = [json[key]];
        }
        // Append the new value to the array
        json[key].push(value);
      } else {
        // Just set the value
        json[key] = value;
      }
    });
    
    return json;
  }
  

  const getPrediction = async () => {

    const url = `http://localhost:3001/vehicles/${vehicle.make}/${vehicle.model}${vehicle.variant? "?"+vehicle.variant: ""}`;
    //get the extra details about the vehicle first
    const res = await fetch(url, {
      method: "GET",
    });
    const vehDetails = await res.json()

    if (!vehDetails) {
      alert("No Vehicle Details Found!");
      return;
    }

    //send the request to next page
    const formData = new FormData();
    formData.append('car_brand', vehicle.make);
    formData.append('car_name', vehicle.model);
    formData.append('milage', vehicle.mileage);
    formData.append('model_year',vehicle.year);
    formData.append('city_registered', vehicle.cityReg);
    formData.append('color', vehicle.color);
    formData.append('engineC', vehDetails.engineC);
    formData.append('fuel_type', vehDetails.fuelType);
    formData.append('trans', vehDetails.transType);
    formData.append('cate', vehDetails.category);

    const imageURLs = vehicle.images.map(item=>'http://localhost:3001/assets/'+item);
    const results = await Promise.all(imageURLs.map(url => fetchImageAsBlob(url)));

    results.forEach(({ blob, extension }, index) => {
      formData.append(`image${index + 1}`, blob, `image${index + 1}.${extension}`);
    });

    const response = await fetch(`http://localhost:5000/predict`, {
      method: "POST",
      body: formData
    });
    const data = await response.json();
    setPrediction(data);
  }

  const getVehicleDetails = async () => {
    const response = await fetch(`http://localhost:3001/market/${vehicleAdId}`, {
      method: "GET",
    });
    const data = await response.json();
    getSellerData('/users/'+data.seller);
    setVehicle(data);
  };

  useEffect(() => {
    getVehicleDetails();
  }, [])

  const [alertObj, setAlertObj] = useState();
  const showAlert = (msg, severity = 'success') => {
    setAlertObj({
      msg,
      severity
    })
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling animation
    });
  }

  return (
    vehicle ?
      <Box>
        <Navbar />

        {
          alertObj &&
          <Alert severity={alertObj.severity} variant="outlined" onClose={() => { setAlertObj(null) }}>{alertObj.msg}</Alert>
        }

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
                    <Typography>{vehicle.location.area + " , "+vehicle.location.city}</Typography>
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
                        {`${prediction.lower_limit}   -   ${prediction.upper_limit}`}
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
                      onPress={getPrediction}
                    />
                  </Box>

                  <SellerCard seller={sellerData} onPressChat={handleOpen} />

                  <IssueCreationComponent vehicleAdId={vehicleAdId} user={user} onIssueReported={(msg)=>{showAlert(msg)}}/>
                </Box>
              </WidgetWrapper>
            }
          </Box>
        </Box>

        <Modal open={open} onClose={handleClose}>
                <Box
                    width={'80%'}
                    height={'80%'}
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        minWidth: 300,
                    }}
                >
                    <ChatParent isModal={true} chatWith={sellerData?._id}/>
                </Box>
            </Modal>


      </Box>
      : <Box></Box>
  );
};

export default VehicleDescPage;