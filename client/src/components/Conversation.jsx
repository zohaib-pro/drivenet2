import { getUser } from "api/UserRequests";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import WidgetWrapper from "components/WidgetWrapper";
import { Divider } from "@mui/material";


const Conversation = ({ data, currentUser, online }) => {

  const [userData, setUserData] = useState(null)
  
  const dispatch = useDispatch()

  useEffect(()=> {

    const userId = data.members.find((id)=>id!==currentUser)

    const getUserData = async ()=> {
      try
      {
          const {data} = await getUser(userId)
         setUserData(data)
      }
      catch(error)
      {
        console.log(error)
      }    
    }
    getUserData();
  }, [])


  return (
    <>
      <div className="follower conversation">
        <div>
          {online && <div className="online-dot"></div>}
          <img
            src={userData?.picturePath ? userData.picturePath : "/assets/kunwar-b.jpg"}
            alt="Profile"
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="name" style={{fontSize: '0.8rem'}}>
            <span>{userData?.firstname ? `${userData.firstname} ${userData.lastname}` : "Kunwar Ahmad"}</span>
          </div>
          <span style={{color: online?"#51e200":""}}>{online? "Online" : "Offline"}</span>
        </div>
      </div>
      <Divider />
      
    </>
  );
  };

export default Conversation;
