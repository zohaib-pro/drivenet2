import { Alert, Box } from "@mui/material";
import { useState } from "react";

const useAlertBox = () => {
  const defAlert = <></>;
  const [AlertBox, SetAlertBox] = useState(defAlert);
  const ShowAlertBox = (msg, severity = 'success') => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling animation
    });
    SetAlertBox (
      <Alert severity={severity} variant="outlined" onClose={() => { SetAlertBox(defAlert) }}>{msg}</Alert>
    )
  }
  
  
  return {AlertBox, ShowAlertBox};
};

export default useAlertBox;
