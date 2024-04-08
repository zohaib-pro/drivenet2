import React from 'react';
import Button from '@mui/material/Button';


const IconBtn = ({text='button', 
  icon='http://localhost:3000/icons/missing.png', 
  size=24, 
  style,
  onPress
}) => {
  return (
    <Button
      onClick={onPress}
      style={style}
      variant="contained"
      startIcon={
        <img 
        width={`${size}px`}
        height={`${size}px`}
        src={icon} />
      } 
    >
      {text}
    </Button>
  );
};

export default IconBtn;
