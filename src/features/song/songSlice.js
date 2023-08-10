import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  songs: [],
  song: {},
  songsById: {},
  currentPageSongs: [],
};

const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getSongSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.songs = action.payload.data.songs;

      const { count, songs } = action.payload.data;

      songs.forEach((song) => {
        state.songsById[song._id] = song;
        if (!state.currentPageSongs.includes(song._id))
          state.currentPageSongs.push(song._id);
      });

      state.totalSongs = count;
    },
    getSongDetailSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.song = action.payload.data;
    },
    sendSongReactionSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { songId, reactions } = action.payload;

      state.songsById[songId].reactions = reactions.data;
    },
    resetSongs(state, action) {
      state.songsById = {};
      state.currentPageSongs = [];
    },
  },
});

const {
  startLoading,
  hasError,
  getSongSuccess,
  getSongDetailSuccess,
  sendSongReactionSuccess,
  resetSongs,
} = songSlice.actions;

export const getSongs =
  ({ filterName, page = 1, limit = 12 }) =>
  async (dispatch) => {
    dispatch(startLoading());
    try {
      const params = { page, limit };
      if (filterName) params.title = filterName;
      const res = await apiService.get(`/songs`, {
        params,
      });
      if (page === 1) dispatch(resetSongs());
      dispatch(getSongSuccess(res.data));
    } catch (error) {
      dispatch(hasError(error.message));
    }
  };

export const getSongDetail =
  ({ songId }) =>
  async (dispatch) => {
    dispatch(startLoading());
    try {
      const res = await apiService.get(`/songs/${songId}`);
      dispatch(getSongDetailSuccess(res.data));
    } catch (error) {
      dispatch(hasError(error.message));
    }
  };
export const sendSongReaction =
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
        sendSongReactionSuccess({
          songId,
          reactions: res.data,
        })
      );
    } catch (error) {
      dispatch(hasError(error.message));
    }
  };

export default songSlice.reducer;
