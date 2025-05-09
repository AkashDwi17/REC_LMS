import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toggleAddBookPopup } from "./popUpSlice";
import { toast } from "react-toastify";

const bookSlice = createSlice({
  name: "book",
  initialState: {
    loading: false,
    error: null,
    message: null,
    books: [],
  },
  reducers: {
    fetchBooksReqest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    fetchBooksSuccess(state, action) {
      state.loading = false;
      state.books = action.payload;
    },
    fetchBooksFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    addBookRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addBookSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    addBookFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    resetBookSlice(state) {
      state.error = null;
      state.message = null;
      state.loading = false;
    },
  },
});

export const fetchAllBooks = () => async (dispatch) => {
  dispatch(bookSlice.actions.fetchBooksReqest());
  await axios
    .get("http://localhost:4000/api/v1/book/all", {
      withCredentials: true,
    })
    .then((res) => {
      dispatch(bookSlice.actions.fetchBooksSuccess(res.data.books));
    })
    .catch((err) => {
      dispatch(bookSlice.actions.fetchBooksFailed(err.response.data.message));
    });
};

// export const addBook = (data) => async (dispatch) => {
//   dispatch(bookSlice.actions.addBookRequest());
//   await axios
//     .post("http://localhost:4000/api/v1/book/admin/add", {
//       withCredentials: true,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//     .then((res) => {
//       bookSlice.actions.addBookSuccess(res.data.message);
//       toast.success(res.data.message);
//       dispatch(toggleAddBookPopup());
//       dispatch(fetchAllBooks());
//     })
//     .catch((err) => {
//       dispatch(bookSlice.actions.addBookFailed(err.response.data.message));
//     });
// };

export const addBook = (data) => async (dispatch) => {
  dispatch(bookSlice.actions.addBookRequest());

  await axios
    .post(
      "http://localhost:4000/api/v1/book/admin/add",
      data, // ✅ This is the actual request body
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json", // ✅ or omit if using FormData
        },
      }
    )
    .then((res) => {
      dispatch(bookSlice.actions.addBookSuccess(res.data.message)); // ✅ fixed missing dispatch
      toast.success(res.data.message);
      dispatch(toggleAddBookPopup());
      dispatch(fetchAllBooks());
    })
    .catch((err) => {
      dispatch(
        bookSlice.actions.addBookFailed(
          err.response?.data?.message || "Something went wrong"
        )
      );
    });
};

export const resetBookSlice = () => (dispatch) => {
  dispatch(bookSlice.actions.resetBookSlice());
};

export default bookSlice.reducer;
