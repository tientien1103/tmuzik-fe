import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService.jsx";

const initialState = {
  isLoading: false,
  error: null,
  userHistory: null,
};

const userHistorySlice = createSlice({
  name: "userHistory",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    recordSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.userHistory = action.payload;
    },
  },
});

const { startLoading, hasError, recordSuccess } = userHistorySlice.actions;

export const record =
  ({ playlistId, userId, songId, data, action }) =>
  async (dispatch) => {
    dispatch(startLoading());
    try {
      const res = await apiService.post(`/histories`, {
        userId: userId,
        songId: songId,
        playlistId: playlistId,
        data: data,
        action: action,
      });
      dispatch(recordSuccess(res.data));
    } catch (error) {
      dispatch(hasError(error.message));
    }
  };

export default userHistorySlice.reducer;
