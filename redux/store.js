import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./basketSlice";
import resturantReducer from "./resturantSlice";
//
export default store = configureStore({
  reducer: { basketReducer, resturantReducer },
});
