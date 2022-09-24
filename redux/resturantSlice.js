import { createSlice } from "@reduxjs/toolkit";
//
//add and remove items to/from basket
export const resturantSlice = createSlice({
  name: "resturant",
  initialState: {
    resturant: {
      id: null,
      imgUrl: null,
      title: null,
      reating: null,
      genre: null,
      address: null,
      short_description: null,
      dishes: null,
      lat: null,
      long: null,
    },
  },
  reducers: {
    setResturant: (state, action) => {
      return { ...state, resturant: action.payload };
    },
  },
});
//
export const { setResturant } = resturantSlice.actions;
export default resturantSlice.reducer;
