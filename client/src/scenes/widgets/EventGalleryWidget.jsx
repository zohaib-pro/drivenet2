import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEvents } from "state";

import { Typography, Box } from "@mui/material";
import Center from "components/Center";
import AdvertWidget from "./AdvertWidget";

const EventWidgetGallery = ({ events, horizontal=false, editable=false, onDelClick }) => {
  const posts = events;

  // Reverse the order of posts array
  const reversedPosts = posts;

  return (
    <>
      {!reversedPosts || reversedPosts.length === 0 ? (
        <Center>
          <Typography variant="h3" color="textSecondary" style={{paddingBottom: '2rem'}}>
            No Events!
          </Typography>
        </Center>
      ) : (
        <Box
          display="flex" flexWrap="wrap"
        >

          {reversedPosts.map((item) => (
            horizontal? 
            <Box
              flexBasis="50%" // 20% width to accommodate 5 items per row
              flexGrow={1} // Allow items to grow to fill the available space
              minWidth={0} // Ensure items can shrink if necessary
              textAlign="center" // Optional: center align content
              marginBottom={2} // Optional: add margin between items
              padding={2} // Optional: add padding to each item
            >
              <AdvertWidget 
                title={item.title} 
                description={item.description} 
                date={item.datetime} 
                image={item.picture} 
                eventId={item._id} // Pass the eventId prop
                onDelete={editable? ()=>{
                  onDelClick(item._id);
                }:null}
              />
              <Box m="2rem 0" />
            </Box>
            :
            <Box
            >
              <AdvertWidget title={item.title} description={item.description} date={item.datetime.replace('T', ' ')} image={item.picture} eventId={item._id} />
              <Box m="2rem 0" />
            </Box>
          ))}
        </Box>
      )}
    </>
  );
};

export default EventWidgetGallery;
