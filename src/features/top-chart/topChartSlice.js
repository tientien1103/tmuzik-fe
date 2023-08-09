import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  songs: [],
  songsById: {},
  currentPageSongs: [],
};

const topChartSlice = createSlice({
  name: "topChart",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getTopChartSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.songs = action.payload.data.songs;

      const { songs, count } = action.payload.data;
      songs.forEach((song) => {
        state.songsById[song._id] = song;
        if (!state.currentPageSongs.includes(song._id))
          state.currentPageSongs.push(song._id);
      });

      state.totalSongs = count;
    },
  },
});

const { startLoading, hasError, getTopChartSuccess } = topChartSlice.actions;

export const getTopChart =
  ({ page, limit = 10 }) =>
  async (dispatch) => {
    dispatch(startLoading());
    try {
      const params = { page, limit };
      const res = await apiService.get(`/charts`, {
        params,
      });
      dispatch(getTopChartSuccess(res.data));
    } catch (error) {
      dispatch(hasError(error.message));
    }
  };

export default topChartSlice.reducer;
