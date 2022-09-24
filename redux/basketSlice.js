import { createSlice } from "@reduxjs/toolkit";
//
//add and remove items to/from basket
export const basketSlice = createSlice({
  name: "basket",
  initialState: { items: [] },
  reducers: {
    addToBasket: (state, action) => {
      return { ...state, items: [...state.items, action.payload] };
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.name === action.payload.name
      );
      let newBasket = [...state.items];
      if (index > -1) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `can't remove product: ${action.payload.name} as it's not in the basket`
        );
      }
      return { ...state, items: newBasket };
    },
    removeAllItems: (state) => {
      return { ...state, items: [] };
    },
  },
});
//
export const { addToBasket, removeFromBasket, removeAllItems } =
  basketSlice.actions;
export default basketSlice.reducer;
