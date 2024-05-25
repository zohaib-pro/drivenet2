// src/ImageCarousel.js
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Box, Typography, useMediaQuery } from '@mui/material';

const items = [
    {
        name: "Random Image #1",
        description: "Description for Random Image #1",
        imageUrl: "http://localhost:3000/assets/drivenet.png"
    },
    {
        name: "Random Image #2",
        description: "Description for Random Image #2",
        imageUrl: "http://localhost:3000/assets/drivenet.png"
    },
    {
        name: "Random Image #3",
        description: "Description for Random Image #3",
        imageUrl: "http://localhost:3000/assets/drivenet.png"
    }
];


function ImageCarousel() {
    return (
        
        <Carousel
            navButtonsAlwaysVisible
            indicators={true}
            indicatorIconButtonProps={{
                style: {
                    padding: '10px',    // Adjust the padding as needed
                    color: 'white'      // Change to desired color
                }
            }}
            activeIndicatorIconButtonProps={{
                style: {
                    backgroundColor: '#fff' // Change to desired color
                }
            }}
            indicatorContainerProps={{
                style: {
                    position: 'relative',
                    zIndex: 3,
                    marginTop: '-50px',  // Adjust the margin to position it correctly
                    textAlign: 'center'  // Center the indicators
                }
            }}
        >
         
            {items.map((item, index) => (
                <Item key={index} item={item} />
            ))}
        </Carousel>
    );
}

function Item(props) {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    return (
        <Box display={'flex'} justifyContent={'center'} mt={5}>
            <Paper sx={{ width: '90%', position: 'relative' }}>
                <Box sx={{ height: isNonMobileScreens? '70vh' : '30vh', position: 'relative' }}>
                    <img
                        src={props.item.imageUrl}
                        alt={props.item.name}
                        style={{ 
                            width: '100%', 
                            height: '100%', 
                            position: 'absolute', 
                            objectFit: 'cover' 
                        }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            background: 'black',
                            opacity: 0.5,
                            width: '100%',
                            height: '100%',
                            zIndex: 1,
                            borderRadius: '0.75rem'
                        }}
                    ></Box>
                    <Box
                        sx={{
                            position: 'absolute',
                            zIndex: 2,
                            color: 'white',
                            padding: '1rem',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            textAlign: 'center',
                        }}
                    >
                        <Typography variant={isNonMobileScreens? "h2" :  "h6"}>{props.item.name}</Typography>
                        <Typography variant="body1">{props.item.description}</Typography>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}

export default ImageCarousel;
