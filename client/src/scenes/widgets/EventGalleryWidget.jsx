import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEvents } from "state";

import { Typography, Box } from "@mui/material";
import Center from "components/Center";
import AdvertWidget from "./AdvertWidget";

const EventWidgetGallery = ({ horizontal=false, editable=false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.events);
  const token = useSelector((state) => state.token);

  const delEvent = async (id) => {
   
    const response = await fetch("http://localhost:3001/events/"+id, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      alert("Failed to delete !")
    }else{
      dispatch(setEvents({ events: posts.filter(item=>item._id!=id) }));
    }
    //dispatch(setEvents({ events: data }));
  };

  const getEvents = async () => {
    const response = await fetch("http://localhost:3001/events", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    console.log(data);
    dispatch(setEvents({ events: data }));
  };

  useEffect(() => {
    getEvents();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Reverse the order of posts array
  const reversedPosts = posts;

  return (
    <>
      {!reversedPosts || reversedPosts.length === 0 ? (
        <Center>

          <Typography variant="h3" color="textSecondary">
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
                onDelete={editable? ()=>{
                  delEvent(item._id)
                }:null}
              />
              <Box m="2rem 0" />
            </Box>
            :
            <Box
            >
              <AdvertWidget title={item.title} description={item.description} date={item.datetime} image={item.picture} />
              <Box m="2rem 0" />
            </Box>
          ))}
        </Box>
      )}
    </>
  );
};

export default EventWidgetGallery;
