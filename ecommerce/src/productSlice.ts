import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "./type";

interface ProductState {
  selectedProduct: Product | null;
}

const initialState: ProductState = {
  selectedProduct: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    showDetails: (state, action: PayloadAction<Product>) => {
      state.selectedProduct = action.payload;
    },
  },
});

export const { showDetails } = productSlice.actions;
export default productSlice.reducer;