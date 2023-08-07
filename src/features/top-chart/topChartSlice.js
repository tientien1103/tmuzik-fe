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
    sendChartReactionSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { songId, reactions } = action.payload;
      state.songsById[songId].reactions = reactions.data;
    },
  },
});

const { startLoading, hasError, getTopChartSuccess, sendChartReactionSuccess } =
  topChartSlice.actions;

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

export const sendChartReaction =
  ({ songId, emoji }) =>
  async (dispatch) => {
    dispatch(startLoading());
    try {
      const res = await apiService.post("/reactions", {
        targetType: "song",
        targetId: songId,
        emoji,
      });
      dispatch(
        sendChartReactionSuccess({
          songId,
          reactions: res.data,
        })
      );
    } catch (error) {
      dispatch(hasError(error.message));
    }
  };

export default topChartSlice.reducer;
