import { useState, useEffect } from "react";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
  TextField,
  Button,
  Modal,
} from "@mui/material";

import DetailsGrid from "components/DetailsGrid";

import { Link } from 'react-router-dom';
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  LocationOnOutlined,
  FavoriteOutlined,
  ShareOutlined,
  Close,
  EditOutlined
} from "@mui/icons-material";
import WidgetWrapper from "components/WidgetWrapper";
import Friend from "components/Friend";
import { setPost } from "state";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationDialog from "components/ConfirmationDialog";
import { useDelData } from "hooks/apiHook";
import VehicleUpdateAdForm from "scenes/sellPage/FormUpdate";

const UserVehicleAdWidget = ({
  vehicle, redirectTo, onDeleteSuccess
}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const [isModalOpen, setModalOpen] = useState(false);

  const [isDialogOpen, setDialogOpen] = useState(false);

  const getTimeDiff = (vehicleAd) => {
    const timeDiff = new Date() - new Date(vehicleAd.createdAt);
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  }

  const handleClose = ()=>{
    setModalOpen(false)
  }

  const {delData} = useDelData()

  const delVehicleAd = (id) =>{
    const target = "market/"+id;
    delData(undefined, target , {onSuccess:()=>{
      onDeleteSuccess(id);
    }, onFail: (err)=>{alert(err)}})
  }

  return (
    <WidgetWrapper >
      <IconButton onClick={()=>{setDialogOpen(true)}}>
        <Close />
      </IconButton>
      {/* <IconButton onClick={()=>{setModalOpen(true)}}>
        <EditOutlined />
      </IconButton> */}
    
      <Link to={redirectTo} style={{ textDecoration: 'none', color: 'inherit' }}>
        {(
          <img
            width="100%"
            height="200rem"
            alt="post"
            style={{ borderRadius: "0.75rem", objectFit: "cover", marginTop: "0.75rem" }}
            src={`http://localhost:3001/assets/${vehicle.images[0]}`}
          />
        )}

        <Typography variant="h4" fontWeight={500}
          mt={1}
        >
          PKR {vehicle.price}
        </Typography>
        <Typography variant="h5" fontWeight={500}
          mb={1}
        >
          {vehicle.title}
        </Typography>

        <DetailsGrid data={{ year: vehicle.year, kms: vehicle.mileage, fuelAvg: 22, fuel: 'petrol' }} />

        <Box mt="0.5rem" mb="0.5rem" display="flex" flexDirection="row" gap={'0.5rem'} >
          <LocationOnOutlined />
          <Typography>{`${vehicle.location.area?vehicle.location.area+',':''}${vehicle.location.city}`}</Typography>
          {/* <Typography>{vehicle.location.city}</Typography> */}
          <Typography>|</Typography>
          <Typography>{getTimeDiff(vehicle)} days ago</Typography>
        </Box>
      </Link>
      <ConfirmationDialog data={{title:"Are you sure to delete?", content: "The selected vehicle ad will be deleted from market", open: isDialogOpen, onConfirm:()=>{setDialogOpen(false); delVehicleAd(vehicle._id)}, onClose: ()=>{setDialogOpen(false)}}} />

      <Modal open={isModalOpen} onClose={handleClose}>

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
              overflow: 'scroll'
            }}
          >
            <IconButton onClick={handleClose} style={{ position: 'absolute', top: 5, right: 5 }}>
              <Close />
            </IconButton>
            <VehicleUpdateAdForm vehicleAd={vehicle}/>
          </Box>
        </Modal>
    </WidgetWrapper>
  );
};

export default UserVehicleAdWidget;
