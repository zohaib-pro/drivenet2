import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  vehicleAds: [],
  vehicleAdsAll: [],
  cities: [],
  isFilterApplied: false
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },

    setVehicleAds: (state, action) => {
      state.vehicleAds = action.payload.vehicleAds;
    },

    setVehicleAdsAll: (state, action) =>{
      state.vehicleAdsAll = action.payload.vehicleAdsAll
    },

    setEvents: (state, action) =>{
      state.events = action.payload.events;
    },

    setCities: (state, action) =>{
      state.cities = action.payload.cities
    },

    setFilterApplied: (state, action) =>{
      state.isFilterApplied = action.payload.isFilterApplied
    },

    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        // If the post's userId matches the updated user's _id
        if (post.userId === action.payload.post.userId) {
          // Update the user details in the post
          return {
            ...post,
            firstName: action.payload.post.firstName,
            lastName: action.payload.post.lastName,
            location: action.payload.post.location,
            userPicturePath: action.payload.post.userPicturePath,
          };
        }
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setFilterApplied, setCities, setMode, setLogin, setLogout, setFriends, setEvents, setPosts, setPost, setVehicleAds, setVehicleAdsAll } =
  authSlice.actions;
export default authSlice.reducer;
