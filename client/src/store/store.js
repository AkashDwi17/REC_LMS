import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import popupReducer from "./slices/popUpSlice";
import useReducer from "./slices/userSlice";
import bookReducer from "./slices/bookSlice";
import borrowReducer from "./slices/borrowSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    popup: popupReducer,
    user: useReducer,
    book: bookReducer,
    borrow: borrowReducer,
  },
});
